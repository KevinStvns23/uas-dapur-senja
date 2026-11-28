import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(process.cwd(), "restoran.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS booking (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    nama         TEXT NOT NULL,
    no_telp      TEXT NOT NULL,
    email        TEXT NOT NULL,
    tanggal      TEXT NOT NULL,
    jumlah_orang INTEGER NOT NULL,
    acara        TEXT,
    created_at   TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS reservasi (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    tujuan       TEXT NOT NULL,
    tanggal      TEXT NOT NULL,
    jam          TEXT NOT NULL,
    jumlah_orang INTEGER NOT NULL,
    created_at   TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;