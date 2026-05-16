import { readFile, stat } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOAD_DIR = "/mnt/nvme1tb/arista-production/uploads";

function getContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".mp4") return "video/mp4";
  if (ext === ".mov") return "video/quicktime";
  if (ext === ".webm") return "video/webm";
  if (ext === ".txt") return "text/plain";

  return "application/octet-stream";
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const fileParts = params.path || [];

    const safePath = fileParts.join("/");
    const filePath = path.join(UPLOAD_DIR, safePath);

    const normalizedUploadDir = path.resolve(UPLOAD_DIR);
    const normalizedFilePath = path.resolve(filePath);

    if (!normalizedFilePath.startsWith(normalizedUploadDir)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await stat(normalizedFilePath);

    const fileBuffer = await readFile(normalizedFilePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": getContentType(normalizedFilePath),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
