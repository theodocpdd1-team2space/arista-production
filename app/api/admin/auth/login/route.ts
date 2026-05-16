import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createAdminSession, setAdminSessionCookie } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    const user = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "Username atau password salah." },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Username atau password salah." },
        { status: 401 }
      );
    }

    const token = await createAdminSession({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    });

    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("POST /api/admin/auth/login error:", error);

    return NextResponse.json(
      { error: "Gagal login." },
      { status: 500 }
    );
  }
}
