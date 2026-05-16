import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function ensureDefaultAdmin() {
  const existing = await prisma.adminUser.findFirst({
    where: {
      isDefault: true,
    },
  });

  if (existing) return existing;

  const passwordHash = await bcrypt.hash("adminaristagresik123", 10);

  return prisma.adminUser.create({
    data: {
      name: "Default Admin",
      username: "admin",
      passwordHash,
      role: "SUPER_ADMIN",
      isDefault: true,
      isActive: true,
    },
  });
}

export async function GET() {
  try {
    await ensureDefaultAdmin();

    const users = await prisma.adminUser.findMany({
      orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        isDefault: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/admin/users error:", error);

    return NextResponse.json(
      { error: "Gagal ambil admin users." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.username || !body.password) {
      return NextResponse.json(
        { error: "Name, username, dan password wajib diisi." },
        { status: 400 }
      );
    }

    if (String(body.password).length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    const user = await prisma.adminUser.create({
      data: {
        name: body.name,
        username: body.username,
        passwordHash,
        role: body.role || "ADMIN",
        isDefault: false,
        isActive: body.isActive ?? true,
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        isDefault: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("POST /api/admin/users error:", error);

    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "Username sudah dipakai." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Gagal tambah admin user." },
      { status: 500 }
    );
  }
}
