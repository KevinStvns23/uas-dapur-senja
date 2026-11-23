"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Reservasi() {
  const router = useRouter();
  const [tujuan, setTujuan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState(1);
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPesan("");

    try {
      const res = await fetch("/api/reservasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tujuan, tanggal, jam, jumlahOrang }),
      });

      if (!res.ok) {
        const data = await res.json();
        setPesan(data.error ?? "Gagal menyimpan");
        return;
      }

      router.push("/SistemBooking/booking");
    } catch {
      setPesan("Tidak bisa terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <h1>Reservasi</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="tujuan">Tujuan Reservasi</label>
            <input id="tujuan" type="text" value={tujuan} onChange={(e) => setTujuan(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="tanggal">Tanggal</label>
            <input id="tanggal" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="jam">Jam</label>
            <input id="jam" type="time" value={jam} onChange={(e) => setJam(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="jumlahOrang">Jumlah Orang</label>
            <input id="jumlahOrang" type="number" min={1} value={jumlahOrang} onChange={(e) => setJumlahOrang(Number(e.target.value))} />
          </div>
          <button type="submit" disabled={loading}>{loading ? "Menyimpan..." : "Reservasi"}</button>
          <button type="button" onClick={() => router.push("/home")} disabled={loading}>Cancel</button>
        </form>

        {pesan && <p>{pesan}</p>}
      </main>
    </>
  );
}