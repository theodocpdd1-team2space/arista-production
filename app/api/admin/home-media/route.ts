import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const media = await prisma.homeMedia.findMany({
    where: {
      type: "slideshow",
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return NextResponse.json(media);
}

export async function POST(req: Request) {
  const body = await req.json();

  const media = await prisma.homeMedia.create({
    data: {
      type: "slideshow",
      title: body.title || null,
      url: body.url,
      sortOrder: Number(body.sortOrder || 0),
      isActive: body.isActive ?? true,
    },
  });

  return NextResponse.json(media);
}
