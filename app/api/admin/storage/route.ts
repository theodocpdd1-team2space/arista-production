import { NextResponse } from "next/server";
import { stat, readdir } from "fs/promises";
import path from "path";

const STORAGE_LIMIT_BYTES = 10 * 1024 * 1024 * 1024;

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

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
}

export async function GET() {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const usedBytes = await getFolderSize(uploadDir);
  const remainingBytes = Math.max(STORAGE_LIMIT_BYTES - usedBytes, 0);

  return NextResponse.json({
    usedBytes,
    limitBytes: STORAGE_LIMIT_BYTES,
    remainingBytes,
    usedFormatted: formatBytes(usedBytes),
    limitFormatted: formatBytes(STORAGE_LIMIT_BYTES),
    remainingFormatted: formatBytes(remainingBytes),
    percentUsed: Number(((usedBytes / STORAGE_LIMIT_BYTES) * 100).toFixed(2)),
  });
}
