import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const menu = await prisma.menu.findUnique({
      where: { id: Number(resolvedParams.id) },
    });

    if (!menu) {
      return NextResponse.json({ error: "Menu tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(menu);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data menu" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await prisma.menu.delete({
      where: { id: Number(resolvedParams.id) },
    });
    
    return NextResponse.json({ message: "Menu berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus data menu" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();

    const updatedMenu = await prisma.menu.update({
      where: { id: Number(resolvedParams.id) },
      data: {
        name: body.name,
        category: body.category,
        price: Number(body.price),
        desc: body.desc,
        image: body.image,
      },
    });

    return NextResponse.json(updatedMenu, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal memperbarui data menu" }, { status: 500 });
  }
}