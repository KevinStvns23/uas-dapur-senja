import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const menu = await prisma.menu.findUnique({
      where: { id: Number(params.id) },
    });
    
    if (!menu) {
      return NextResponse.json({ error: "Menu tidak ditemukan" }, { status: 404 });
    }
    
    return NextResponse.json(menu);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data menu" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.menu.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Menu berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus data menu" }, { status: 500 });
  }
}