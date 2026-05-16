import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const home = await prisma.siteContent.findUnique({
      where: {
        key: "home",
      },
    });

    return NextResponse.json(home?.content || null);
  } catch (error) {
    console.error("GET /api/site/home error:", error);

    return NextResponse.json(
      { error: "Gagal ambil home content." },
      { status: 500 }
    );
  }
}