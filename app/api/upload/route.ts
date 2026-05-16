import { NextResponse } from "next/server";
import { writeFile, mkdir, stat, readdir } from "fs/promises";
import path from "path";

const STORAGE_LIMIT_BYTES = 10 * 1024 * 1024 * 1024; // 10GB
const MAX_FILE_SIZE_BYTES = 250 * 1024 * 1024; // 250MB per file

async function getFolderSize(dir: string): Promise<number> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    const sizes = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          return getFolderSize(fullPath);
        }

        const fileStat = await stat(fullPath);
        return fileStat.size;
      })
    );

    return sizes.reduce((total, size) => total + size, 0);
  } catch {
    return 0;
  }
}

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "")
    .slice(0, 80);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "File tidak ditemukan." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 250MB." },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const usedStorage = await getFolderSize(uploadDir);

    if (usedStorage + file.size > STORAGE_LIMIT_BYTES) {
      return NextResponse.json(
        {
          error: "Storage penuh. Limit upload 10GB sudah tercapai.",
          usedBytes: usedStorage,
          limitBytes: STORAGE_LIMIT_BYTES,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop() || "file";
    const originalName = sanitizeFileName(file.name.replace(`.${ext}`, ""));
    const filename = `${Date.now()}-${originalName}.${ext}`;

    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({
      url: `/uploads/${filename}`,
      filename,
      sizeBytes: file.size,
      usedBytes: usedStorage + file.size,
      limitBytes: STORAGE_LIMIT_BYTES,
    });
  } catch (error) {
    console.error("POST /api/upload error:", error);

    return NextResponse.json(
      { error: "Gagal upload file." },
      { status: 500 }
    );
  }
}