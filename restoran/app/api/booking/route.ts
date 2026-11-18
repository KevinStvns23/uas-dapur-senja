import db from "../../../lib/database";

export async function POST(request: Request) {
  const body = await request.json();
  const { nama, noTelp, email, tanggal, jumlahOrang, acara } = body;

  if (!nama || !noTelp || !email || !tanggal || !(jumlahOrang >= 1)) {
    return Response.json({ error: "Data belum lengkap" }, { status: 400 });
  }

  const result = db
    .prepare(
      `INSERT INTO booking (nama, no_telp, email, tanggal, jumlah_orang, acara)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(nama, noTelp, email, tanggal, jumlahOrang, acara || null);

  return Response.json({ id: result.lastInsertRowid }, { status: 201 });
}

export async function GET() {
  const rows = db.prepare("SELECT * FROM booking ORDER BY id DESC").all();
  return Response.json(rows);
}