import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const menus = await prisma.menu.findMany();
    return NextResponse.json(menus);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data menu" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newMenu = await prisma.menu.create({
      data: {
        name: body.name,
        category: body.category,
        price: Number(body.price),
        desc: body.desc,
        image: body.image,
        rating: 0, 
        ingredients: body.desc,
      },
    });

    return NextResponse.json(newMenu, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menyimpan data menu" }, { status: 500 });
  }
}