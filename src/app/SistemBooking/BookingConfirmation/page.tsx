"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./bookingConfirmation.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BookingConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nama = searchParams.get("nama") || "";
  const noTelp = searchParams.get("noTelp") || "";
  const email = searchParams.get("email") || "";
  const tanggal = searchParams.get("tanggal") || "";
  const jumlahOrang = searchParams.get("jumlahOrang") || "1";
  const jam = searchParams.get("jam") || "";
  const acara = searchParams.get("acara") || "-";
  const areaMeja = searchParams.get("areaMeja") || "-";

  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = async () => {
    if (saved || loading) return;

    setLoading(true);
    setPesan("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          noTelp,
          email,
          tanggal,
          jumlahOrang: Number(jumlahOrang),
          jam,
          acara,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPesan(data.error || "Gagal menyimpan booking");
        return;
      }
      router.push(`/reviews`);
      setSaved(true);
      setPesan("Booking berhasil!");

    } catch {
      setPesan("Tidak bisa terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MainNavbar />
      <main className={styles.booking}>
        <div className={styles.page}>
          <div className={styles.logoCentang}>
            <span>✓</span>
          </div>
          <h1 className={styles.title}>Booking Confirmation</h1>

          {pesan && (
            <p className={saved ? styles.success : styles.error}>
              {saved ? "✓" : "!"} {pesan}
            </p>
          )}

          <div className={styles.detail}>
            <div className={styles.dataBooking}>
              <span className={styles.icon}>♙</span>
              <div>
                <span className={styles.label}>Nama Lengkap</span>
                <p>{nama || "-"}</p>
              </div>
            </div>

            <div className={styles.dataBooking}>
              <span className={styles.icon}>▦</span>
              <div>
                <span className={styles.label}>Tanggal</span>
                <p>{tanggal || "-"}</p>
              </div>
            </div>

            <div className={styles.dataBooking}>
              <span className={styles.icon}>☎</span>
              <div>
                <span className={styles.label}>No Telepon</span>
                <p>{noTelp || "-"}</p>
              </div>
            </div>
            <div className={styles.dataBooking}>
              <span className={styles.icon}>♧</span>
              <div>
                <span className={styles.label}>Jumlah Tamu</span>
                <p>{jumlahOrang} Orang</p>
              </div>
            </div>
            <div className={styles.dataBooking}>
              <span className={styles.icon}>✉</span>
              <div>
                <span className={styles.label}>Email Konfirmasi</span>
                <p>{email || "-"}</p>
              </div>
            </div>
            <div className={styles.dataBooking}>
              <span className={styles.icon}>◷</span>
              <div>
                <span className={styles.label}>Jam Kedatangan</span>
                <p>{jam || "-"}</p>
              </div>
            </div>
            <div className={styles.dataBooking}>
              <span className={styles.icon}>✧</span>
              <div>
                <span className={styles.label}>Acara</span>
                <p>{acara || "-"}</p>
              </div>
            </div>
            <div className={styles.dataBooking}>
              <span className={styles.icon}>♧</span>
              <div>
                <span className={styles.label}>Area & Meja</span>
                <p>{areaMeja}</p>
              </div>
            </div>

          </div>

          <div className={styles.buttons}>
            <button className={styles.submit} onClick={handleSubmit} disabled={loading || saved || !nama || !tanggal || !jam}>
              {loading ? "Menyimpan...": saved? "Booking berhasil!" : "Confirm"}
            </button>

            <button className={styles.cancel} onClick={() => router.push("/SistemBooking/booking?${searchParams.toString()}")} disabled={loading}>Kembali</button>
          </div>

        </div>
      </main>
    </>
  );
}
