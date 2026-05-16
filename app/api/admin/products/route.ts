import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function makeUniqueSlug(name: string) {
  const base = slugify(name);
  let slug = base;
  let counter = 1;

  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/admin/products error:", error);

    return NextResponse.json(
      {
        error: "Gagal ambil produk.",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Nama produk wajib diisi." },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: await makeUniqueSlug(body.name),
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
    console.error("POST /api/admin/products error:", error);

    return NextResponse.json(
      {
        error: "Gagal simpan produk.",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
