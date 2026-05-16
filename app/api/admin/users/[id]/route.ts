import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const currentUser = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User tidak ditemukan." },
        { status: 404 }
      );
    }

    const updateData: any = {
      name: body.name,
      username: body.username,
      role: body.role || "ADMIN",
      isActive: body.isActive ?? true,
    };

    if (body.password && String(body.password).trim()) {
      if (currentUser.isDefault) {
        return NextResponse.json(
          { error: "Password default admin tidak bisa diganti dari panel." },
          { status: 400 }
        );
      }

      if (String(body.password).length < 6) {
        return NextResponse.json(
          { error: "Password minimal 6 karakter." },
          { status: 400 }
        );
      }

      updateData.passwordHash = await bcrypt.hash(body.password, 10);
    }

    const user = await prisma.adminUser.update({
      where: { id },
      data: updateData,
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
    console.error("PATCH /api/admin/users/[id] error:", error);

    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "Username sudah dipakai." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Gagal update admin user." },
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

    const currentUser = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User tidak ditemukan." },
        { status: 404 }
      );
    }

    if (currentUser.isDefault) {
      return NextResponse.json(
        { error: "Default admin tidak bisa dihapus." },
        { status: 400 }
      );
    }

    await prisma.adminUser.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/users/[id] error:", error);

    return NextResponse.json(
      { error: "Gagal hapus admin user." },
      { status: 500 }
    );
  }
}
