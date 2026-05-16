import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readdir, stat, unlink } from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "uploads");

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
}

function collectUrlsFromValue(value: any, urls = new Set<string>()) {
  if (!value) return urls;

  if (typeof value === "string") {
    if (value.startsWith("/uploads/")) {
      urls.add(value);
    }
    return urls;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectUrlsFromValue(item, urls));
    return urls;
  }

  if (typeof value === "object") {
    Object.values(value).forEach((item) => collectUrlsFromValue(item, urls));
  }

  return urls;
}

async function getUsedMediaUrls() {
  const used = new Set<string>();

  const contents = await prisma.siteContent.findMany();
  contents.forEach((item) => {
    collectUrlsFromValue(item.content, used);
  });

  const products = await prisma.product.findMany();
  products.forEach((product) => {
    collectUrlsFromValue(product.imageUrl, used);
    collectUrlsFromValue(product.gallery, used);
  });

  return used;
}

export async function GET() {
  try {
    const usedUrls = await getUsedMediaUrls();

    let files: string[] = [];

    try {
      files = await readdir(uploadDir);
    } catch {
      files = [];
    }

    const media = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(uploadDir, filename);
        const fileStat = await stat(filePath);
        const url = `/uploads/${filename}`;

        return {
          filename,
          url,
          sizeBytes: fileStat.size,
          sizeFormatted: formatBytes(fileStat.size),
          updatedAt: fileStat.mtime,
          isUsed: usedUrls.has(url),
        };
      })
    );

    media.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error("GET /api/admin/media error:", error);

    return NextResponse.json(
      { error: "Gagal ambil media library." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const url = body.url as string;

    if (!url || !url.startsWith("/uploads/")) {
      return NextResponse.json(
        { error: "URL file tidak valid." },
        { status: 400 }
      );
    }

    const usedUrls = await getUsedMediaUrls();

    if (usedUrls.has(url)) {
      return NextResponse.json(
        { error: "File masih dipakai di konten. Lepas dulu dari Home/Product sebelum delete." },
        { status: 400 }
      );
    }

    const filename = path.basename(url);
    const filePath = path.join(uploadDir, filename);

    await unlink(filePath);

    return NextResponse.json({
      success: true,
      deleted: url,
    });
  } catch (error) {
    console.error("DELETE /api/admin/media error:", error);

    return NextResponse.json(
      { error: "Gagal hapus file." },
      { status: 500 }
    );
  }
}
