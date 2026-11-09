"use client";

import styles from "./booking.module.css";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "@/app/components/navbar";

export default function Booking() {
  const router = useRouter();

  const [nama, setName] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState(1);
  const [acara, setAcara] = useState("");
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState("");

  const resetForm = () => {
    setName("");
    setNoTelp("");
    setEmail("");
    setTanggal("");
    setJumlahOrang(1);
    setAcara("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      setPesan("Booking berhasil disimpan!");
      resetForm();
    } catch {
      setPesan("Tidak bisa terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setPesan("");
    router.push("/SistemBooking/reservasi");
  };

  return (
    <>
    <NavbarComponent />
    <div className={styles.booking}>
      <div className={styles.page}>
        <h1 className={styles.title}>Booking restoran</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input value={nama} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nama" required />
          <input value={noTelp} onChange={(e) => setNoTelp(e.target.value)} type="text" placeholder="No Telepon" required/>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
          <input value={tanggal} onChange={(e) => setTanggal(e.target.value)} type="date" required />
          <input type="number" min={1} value={jumlahOrang} onChange={(e) => setJumlahOrang(Number(e.target.value))} placeholder="Jumlah Orang"/>
          <input type="text" value={acara} onChange={(e) => setAcara(e.target.value)} placeholder="Acara (opsional)"/>
          <div className={styles.buttons}>
          <button className={styles.submit} type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Booking"}
          </button>

          <button
            type="button"
            className={styles.cancel}
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
          </div>
        </form>
        

        {pesan && <p>{pesan}</p>}
      </div>
    </div>
    </>
  );
}