import db from "@/lib/database";

export async function POST(request: Request) {
  const { tujuan, tanggal, jam, jumlahOrang } = await request.json();

  if (!tujuan || !tanggal || !jam || !(jumlahOrang >= 1)) {
    return Response.json({ error: "Data belum lengkap" }, { status: 400 });
  }

  const result = db
    .prepare(
      `INSERT INTO reservasi (tujuan, tanggal, jam, jumlah_orang)
       VALUES (?, ?, ?, ?)`
    )
    .run(tujuan, tanggal, jam, jumlahOrang);

  return Response.json({ id: result.lastInsertRowid }, { status: 201 });
}

export async function GET() {
  const rows = db.prepare("SELECT * FROM reservasi ORDER BY id DESC").all();
  return Response.json(rows);
}