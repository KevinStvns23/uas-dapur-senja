"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./booking.module.css";
import MainNavbar from "@/app/components/MainNavbar";

type Table = {
  id: string;
  area: "Indoor" | "Teras";
  seats: 2 | 4 | 6 | 8;
  shape: "round" | "rect";
  x: number;
  y: number;
};

const TABLES: Table[] = [
  { id: "T-01", area: "Indoor", seats: 2, shape: "round", x: 11, y: 20 },
  { id: "T-02", area: "Indoor", seats: 2, shape: "round", x: 11, y: 40 },
  { id: "T-03", area: "Indoor", seats: 2, shape: "round", x: 11, y: 60 },
  { id: "T-04", area: "Indoor", seats: 4, shape: "round", x: 30, y: 20 },
  { id: "T-05", area: "Indoor", seats: 4, shape: "round", x: 30, y: 42 },
  { id: "T-06", area: "Indoor", seats: 6, shape: "rect", x: 51, y: 22 },
  { id: "T-07", area: "Indoor", seats: 6, shape: "rect", x: 51, y: 46 },
  { id: "T-08", area: "Indoor", seats: 8, shape: "rect", x: 38, y: 70 },
  { id: "T-09", area: "Teras", seats: 4, shape: "round", x: 76, y: 20 },
  { id: "T-10", area: "Teras", seats: 4, shape: "round", x: 90, y: 20 },
  { id: "T-11", area: "Teras", seats: 4, shape: "round", x: 76, y: 44 },
  { id: "T-12", area: "Teras", seats: 4, shape: "round", x: 90, y: 44 },
  { id: "T-13", area: "Teras", seats: 6, shape: "rect", x: 83, y: 68 },
];

export default function Booking() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    nama: "",
    noTelp: "",
    email: "",
    tanggal: "",
    jumlahOrang: "1",
    jam: "",
    acara: "",
    areaMeja: "",
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const bookedTables = useMemo(() => ["T-03", "T-07", "T-11"], []);
  const selectedTable = TABLES.find((t) => t.id === selectedId) ?? null;
  const guests = Number(form.jumlahOrang) || 1;
  const tooSmall = selectedTable ? selectedTable.seats < guests : false;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (table: Table) => {
    setSelectedId(table.id);
    setError("");
    setForm((prev) => ({
      ...prev,
      areaMeja: `${table.area} - Meja ${table.id} (${table.seats} kursi)`,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTable) {
      setError("Silakan pilih meja pada denah terlebih dahulu.");
      return;
    }
    if (tooSmall) {
      setError(
        `Meja ${selectedTable.id} hanya muat ${selectedTable.seats} orang. Pilih meja lain.`
      );
      return;
    }
    const params = new URLSearchParams(form);
    router.push(`/SistemBooking/BookingConfirmation?${params}`);
  };

  return (
    <>
      <MainNavbar />
      <main className={styles.booking}>
        <div className={styles.card}>
          <div className={styles.formSide}>
            <h1 className={styles.title}>Booking restoran</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row2}>
                <div className={styles.formInput}>
                  <label htmlFor="nama">Nama Lengkap</label>
                  <input id="nama" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama Lengkap" required />
                </div>
                <div className={styles.formInput}>
                  <label htmlFor="noTelp">No Telepon</label>
                  <input id="noTelp" name="noTelp" type="tel" value={form.noTelp} onChange={handleChange} placeholder="No Telepon" required />
                </div>
              </div>

              <div className={styles.formInput}>
                <label htmlFor="email">Email Konfirmasi</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="nama@email.com" required />
              </div>

              <div className={styles.row3}>
                <div className={styles.formInput}>
                  <label htmlFor="tanggal">Tanggal</label>
                  <input id="tanggal" name="tanggal" type="date" min={today} value={form.tanggal} onChange={handleChange} required />
                </div>
                <div className={styles.formInput}>
                  <label htmlFor="jumlahOrang">Tamu</label>
                  <input id="jumlahOrang" name="jumlahOrang" type="number" min={1} max={50} value={form.jumlahOrang} onChange={handleChange} required />
                </div>
                <div className={styles.formInput}>
                  <label htmlFor="jam">Jam Kedatangan</label>
                  <input id="jam" name="jam" type="time" value={form.jam} onChange={handleChange} required />
                </div>
              </div>
              <div className={styles.formInput}>
                <label htmlFor="acara">Acara</label>
                <input id="acara" name="acara" value={form.acara} onChange={handleChange} placeholder="Acara (opsional)" />
              </div>
              <div className={styles.formInput}>
                <label>Meja terpilih</label>
                <div className={`${styles.selectedTable} ${selectedTable ? styles.selectedFilled : ""}`}>
                  {selectedTable
                    ? `${selectedTable.area} · Meja ${selectedTable.id} · ${selectedTable.seats} kursi`
                    : "Belum ada meja dipilih — klik pada denah"}
                </div>
                {error && <span className={styles.error}>{error}</span>}
                {!error && tooSmall && (
                  <span className={styles.error}>
                    Kapasitas meja kurang untuk {guests} tamu.
                  </span>
                )}
              </div>

              <div className={styles.buttons}>
                <button type="submit" className={styles.submit}>Konfirmasi Booking</button>
                <button type="button" className={styles.cancel} onClick={() => router.back()}>Batal</button>
              </div>
            </form>
          </div>

          <div className={styles.planSide}>
            <h2 className={styles.planTitle}>Pilih Meja</h2>
            <p className={styles.planHint}>Klik meja yang tersedia</p>

            <div className={styles.plan}>
              <div className={`${styles.zona} ${styles.zoneIndoor}`}>
                <span className={styles.zonaLabel}>INDOOR</span>
              </div>
              <div className={`${styles.zona} ${styles.zoneTeras}`}>
                <span className={styles.zonaLabel}>TERAS</span>
              </div>

              <div className={`${styles.fasilitas} ${styles.kasir}`}>Kasir</div>
              <div className={`${styles.fasilitas} ${styles.dapur}`}>Dapur</div>
              <div className={`${styles.fasilitas} ${styles.pintu}`}>Pintu Masuk</div>

              {TABLES.map((t) => {
                const booked = bookedTables.includes(t.id);
                const active = selectedId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={booked}
                    onClick={() => handleSelect(t)}
                    aria-pressed={active}
                    aria-label={`Meja ${t.id}, ${t.seats} kursi, ${booked ? "sudah dipesan" : "tersedia"}`}
                    title={`${t.id} · ${t.seats} kursi${booked ? " · Terisi" : ""}`}
                    className={[styles.table, styles[`seat${t.seats}`],
                      t.shape === "round" ? styles.round : styles.rect,
                      booked ? styles.booked : "",
                      active ? styles.active : "",
                    ].join(" ")}
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                  >
                    <span className={styles.tableId}>{t.id}</span>
                    <span className={styles.tableSeats}>{t.seats} 👤</span>
                  </button>
                );
              })}
            </div>
            <div className={styles.legend}>
              <span><i className={`${styles.dot} ${styles.dotFree}`} /> Tersedia</span>
              <span><i className={`${styles.dot} ${styles.dotActive}`} /> Dipilih</span>
              <span><i className={`${styles.dot} ${styles.dotBooked}`} /> Terisi</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}