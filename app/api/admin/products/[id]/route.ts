import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        slug: slugify(body.name),
        category: body.category || "Product",
        description: body.description || "",
        price: body.price || null,
        imageUrl: body.imageUrl || null,
        gallery: Array.isArray(body.gallery) ? body.gallery : [],
        specs: Array.isArray(body.specs) ? body.specs : [],
        whatsappUrl: body.whatsappUrl || null,
        shopeeUrl: body.shopeeUrl || null,
        tokopediaUrl: body.tokopediaUrl || null,
        isFeatured: body.isFeatured ?? false,
        isActive: body.isActive ?? true,
        sortOrder: Number(body.sortOrder || 0),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("PATCH /api/admin/products/[id] error:", error);

    return NextResponse.json(
      {
        error: "Gagal update produk.",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/products/[id] error:", error);

    return NextResponse.json(
      {
        error: "Gagal hapus produk.",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
