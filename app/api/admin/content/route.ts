import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const contents = await prisma.siteContent.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(contents);
  } catch (error) {
    console.error("GET /api/admin/content error:", error);

    return NextResponse.json(
      {
        error: "Gagal ambil content.",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.key) {
      return NextResponse.json(
        { error: "Key wajib diisi." },
        { status: 400 }
      );
    }

    const content = await prisma.siteContent.upsert({
      where: {
        key: body.key,
      },
      create: {
        key: body.key,
        content: body.content || {},
      },
      update: {
        content: body.content || {},
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("POST /api/admin/content error:", error);

    return NextResponse.json(
      {
        error: "Gagal simpan content.",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}