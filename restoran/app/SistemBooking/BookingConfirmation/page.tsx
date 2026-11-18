"use client";

import styles from "./bookingConfirmation.module.css";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "@/app/components/navbar";

function BookingConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nama = searchParams.get("nama") ?? "";
  const noTelp = searchParams.get("noTelp") ?? "";
  const email = searchParams.get("email") ?? "";
  const tanggal = searchParams.get("tanggal") ?? "";
  const jumlahOrang = Number(searchParams.get("jumlahOrang")) || 1;
  const acara = searchParams.get("acara") ?? "";

  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState("");

  const handleconfirm = async () => {
    setLoading(true);
    setPesan("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, noTelp, email, tanggal, jumlahOrang, acara }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setPesan(errorData.error ?? "Gagal menyimpan");
        return;
    }
      setPesan("Booking berhasil!");  
    } catch {
      setPesan("Tidak bisa terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPesan("");
    router.push("/SistemBooking/booking");
  };

  return (
    <>
    <div className={styles.booking}>
      <div className={styles.page}>
        <h1 className={styles.title}>Booking Confirmation</h1>
        <ul>
            <li>Nama: {nama}</li>
            <li>No Telepon: {noTelp}</li>
            <li>Email: {email}</li>
            <li>Tanggal: {tanggal}</li>
            <li>Jumlah Orang: {jumlahOrang}</li>
            <li>Acara: {acara}</li>
        </ul>
          <div className={styles.buttons}>
          <button className={styles.submit} type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Booking"}
          </button>

          <button type="button" className={styles.cancel} onClick={handleCancel} disabled={loading}>Cancel</button>
          </div>
        

        {pesan && <p>{pesan}</p>}
      </div>
    </div>
    </>
  );
}

export default function confirmAgain() {
    return (
    <>
    <NavbarComponent />
    <Suspense fallback={<div>Loading...</div>}>
    <BookingConfirmation />
    </Suspense>
    </>
    );
}