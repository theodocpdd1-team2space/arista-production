import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function hashIp(ip: string) {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const type = String(body.type || "").trim();
    const path = String(body.path || "").trim();
    const label = body.label ? String(body.label).trim() : null;
    const sessionId = body.sessionId ? String(body.sessionId).trim() : null;

    if (!type || !path) {
      return NextResponse.json(
        { error: "type dan path wajib diisi." },
        { status: 400 }
      );
    }

    if (!["page_view", "click"].includes(type)) {
      return NextResponse.json(
        { error: "type analytics tidak valid." },
        { status: 400 }
      );
    }

    const headersList = req.headers;

    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

    const userAgent = headersList.get("user-agent");
    const referrer = headersList.get("referer");

    await prisma.analyticsEvent.create({
      data: {
        type,
        path,
        label,
        referrer,
        userAgent,
        ipHash: hashIp(ip),
        sessionId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/analytics/track error:", error);

    return NextResponse.json(
      { error: "Gagal simpan analytics." },
      { status: 500 }
    );
  }
}
