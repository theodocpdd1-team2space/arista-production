import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizePath(path: string) {
  if (!path) return "/";
  return path.split("?")[0] || "/";
}

export async function GET() {
  try {
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const events = await prisma.analyticsEvent.findMany({
      where: {
        createdAt: {
          gte: since,
        },
      },
      select: {
        type: true,
        path: true,
        sessionId: true,
        userAgent: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10000,
    });

    const uniqueSessions = new Set(
      events
        .filter((event) => event.sessionId)
        .map((event) => event.sessionId as string)
    );

    const desktopSessions = new Set<string>();
    const mobileSessions = new Set<string>();

    events.forEach((event) => {
      if (!event.sessionId) return;

      const ua = event.userAgent || "";
      const isMobile = /mobile|android|iphone|ipad|ipod/i.test(ua);

      if (isMobile) {
        mobileSessions.add(event.sessionId);
      } else {
        desktopSessions.add(event.sessionId);
      }
    });

    const pathMap = new Map<
      string,
      {
        path: string;
        views: number;
        clicks: number;
        sessions: Set<string>;
      }
    >();

    events.forEach((event) => {
      const path = normalizePath(event.path);

      if (!pathMap.has(path)) {
        pathMap.set(path, {
          path,
          views: 0,
          clicks: 0,
          sessions: new Set(),
        });
      }

      const item = pathMap.get(path)!;

      if (event.type === "page_view") item.views += 1;
      if (event.type === "click") item.clicks += 1;
      if (event.sessionId) item.sessions.add(event.sessionId);
    });

    const topLinksRaw = Array.from(pathMap.values())
      .map((item) => ({
        path: item.path,
        views: item.views,
        clicks: item.clicks,
        uniqueVisitors: item.sessions.size,
      }))
      .sort((a, b) => b.views + b.clicks - (a.views + a.clicks))
      .slice(0, 5);

    const maxViews = Math.max(...topLinksRaw.map((item) => item.views), 1);

    const topLinks = topLinksRaw.map((item) => ({
      ...item,
      volume: Math.round((item.views / maxViews) * 100),
    }));

    const totalSessions = uniqueSessions.size || 0;
    const desktopCount = desktopSessions.size;
    const mobileCount = mobileSessions.size;
    const deviceTotal = desktopCount + mobileCount || 1;

    return NextResponse.json({
      totalUniqueVisitors: totalSessions,
      totalViews: events.filter((event) => event.type === "page_view").length,
      totalClicks: events.filter((event) => event.type === "click").length,
      desktopPercent: Math.round((desktopCount / deviceTotal) * 100),
      mobilePercent: Math.round((mobileCount / deviceTotal) * 100),
      topLinks,
    });
  } catch (error) {
    console.error("GET /api/admin/analytics error:", error);

    return NextResponse.json(
      { error: "Gagal ambil analytics." },
      { status: 500 }
    );
  }
}
