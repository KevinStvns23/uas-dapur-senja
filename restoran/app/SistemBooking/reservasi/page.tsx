"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./reservasi.module.css";
import NavbarComponent from "@/app/components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <NavbarComponent />
    <div className={styles.page}>
      <Image src="/img/resto.jpg" alt="" fill style={{ objectFit: "cover", zIndex: -1 }} priority />
      <div className={styles.card}>
        <h1 className={styles.title}>Reservasi</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input className={styles.inputReservasi} type="text" value={tujuan} onChange={(e) => setTujuan(e.target.value)} placeholder="Tujuan reservasi" required />
          <input className={styles.inputReservasi} type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
          <input className={styles.inputReservasi} type="time" value={jam} onChange={(e) => setJam(e.target.value)} required />
          <input className={styles.inputReservasi} type="number" min={1} value={jumlahOrang} onChange={(e) => setJumlahOrang(Number(e.target.value))} />
         <div className={styles.buttonGroup}>
         <button className={styles.submit} type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Reservasi"}
          </button>

            <button type="button" className={styles.cancel} onClick={() => router.push("/home")} disabled={loading}> Cancel</button>
          </div>
        </form>
        {pesan && <p>{pesan}</p>}
      </div>
    </div>
    </>
  );
}