"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./reservasi.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import MainNavbar from "@/app/components/MainNavbar";

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
    <MainNavbar />
    <div className={styles.page}>
      <Image src="/img/resto.jpg" alt="" fill style={{ objectFit: "cover", zIndex: -1 }} priority />
      <div className={styles.card}>
        <div className={styles.titleLogo}>
          <Image src="/img/tudung-saji.png" alt="Logo Tudung Saji" width={90} height={90} className={styles.logo} />
        <h1 className={styles.title}>Reservasi</h1>
         </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input className={`${styles.inputReservasi} ${styles.inputWithIcon}`} type="text" value={tujuan} onChange={(e) => setTujuan(e.target.value)} placeholder="Tujuan reservasi" required />
          <input className={`${styles.inputReservasi} ${styles.inputWithCalendar}`} type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
          <input className={`${styles.inputReservasi} ${styles.inputWithTime}`} type="time" value={jam} onChange={(e) => setJam(e.target.value)} required />
          <input className={`${styles.inputReservasi} ${styles.inputWithPeople}`} type="number" min={1} value={jumlahOrang} onChange={(e) => setJumlahOrang(Number(e.target.value))} />
         <div className={styles.buttonGroup}>
         <button className={`${styles.submit} ${styles.inputWithCalCheck}`} type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Reservasi"}
          </button>

            <button type="button" className={`${styles.cancel} ${styles.circleX}`} onClick={() => router.push("/home")} disabled={loading}> Cancel</button>
          </div>
        </form>
        {pesan && <p>{pesan}</p>}
      </div>
    </div>
    </>
  );
}
