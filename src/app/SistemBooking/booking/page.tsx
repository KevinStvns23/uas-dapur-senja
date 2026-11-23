"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./booking.module.css";

export default function Booking() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    nama: "",
    noTelp: "",
    email: "",
    tanggal: "",
    jumlahOrang: "2",
    jam: "",
    acara: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(form);
    router.push(`/SistemBooking/BookingConfirmation?${params}`);
  };

  return (
    <>
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
                  <input id="jumlahOrang" name="jumlahOrang" type="number" min={1} max={20} value={form.jumlahOrang} onChange={handleChange} required />
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
                <button type="submit" className={styles.submit}>Konfirmasi Booking</button>
                <button type="button" className={styles.cancel} onClick={() => router.back()}>Batal</button>
              </div>
            </form>
          </div>

        </div>
      </main>
    </>
  );
}