"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Booking() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    nama: "",
    noTelp: "",
    email: "",
    tanggal: "",
    jumlahOrang: "2",
    jam: "18:30",
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
    <main>
    <h1>Booking Restoran</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nama">Nama Lengkap</label>
          <input id="nama" name="nama" value={form.nama} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="noTelp">No Telepon</label>
          <input id="noTelp" name="noTelp" type="tel" value={form.noTelp} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email Konfirmasi</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="tanggal">Tanggal</label>
          <input id="tanggal" name="tanggal" type="date" min={today} value={form.tanggal} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="jumlahOrang">Tamu</label>
          <input id="jumlahOrang" name="jumlahOrang" type="number" min={1} max={20} value={form.jumlahOrang} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="jam">Jam Kedatangan</label>
          <input id="jam" name="jam" type="time" value={form.jam} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="acara">Acara (opsional)</label>
          <input id="acara" name="acara" value={form.acara} onChange={handleChange} />
        </div>

        <button type="submit">Booking</button>
        <button type="button" onClick={() => router.back()}>Batal</button>
      </form>
    </main>
  );
}