import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/site/products error:", error);

    return NextResponse.json(
      { error: "Gagal ambil products." },
      { status: 500 }
    );
  }
}
