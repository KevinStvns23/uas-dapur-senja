"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import "./style.css";

const faqList = [
  {
    q: "Bagaimana cara menggunakan kode promo dari website ini?",
    a: "Semua promo diproses secara manual. Anda cukup menekan tombol klaim pada website, kemudian tunjukkan kode atau layar HP Anda secara langsung kepada staf kasir kami sebelum melakukan pembayaran.",
  },
  {
    q: "Apakah kode voucher promo bisa digabungkan?",
    a: "Tidak bisa. Dalam satu struk transaksi, Anda hanya dapat memilih dan menggunakan satu penawaran promo yang memberikan keuntungan terbesar bagi Anda.",
  },
  {
    q: "Apakah Promo Spesial Bulanan akan selalu sama setiap bulannya?",
    a: "Tidak. Kami rutin mengganti jenis Promo Bulanan setiap tanggal 1 di awal bulan untuk memberikan variasi penawaran menarik. Pantau terus halaman ini untuk promo terbaru.",
  },
  {
    q: "Apa syarat wajib untuk Promo Hari Kelahiran?",
    a: "Diskon 10% ini hanya berlaku tepat pada tanggal kelahiran Anda (H-0). Kasir kami wajib memverifikasinya melalui KTP asli atau identitas resmi lainnya yang memiliki tanggal lahir. Tidak berlaku untuk hari sebelum atau sesudah ulang tahun.",
  },
  {
    q: "Apakah Promo Pelajar berlaku untuk mahasiswa yang sedang skripsi/cuti?",
    a: "Selama Kartu Tanda Mahasiswa (KTM) Anda memiliki masa berlaku (tahun akademik) yang masih aktif tercetak di kartu, kasir kami akan memproses diskon 20% tersebut.",
  },
  {
    q: "Apakah promo diskon berlaku untuk dibawa pulang (Takeaway)?",
    a: "Semua promo yang tertera di website saat ini eksklusif berlaku untuk makan di tempat (Dine-in) agar kualitas dan kehangatan hidangan tetap terjaga saat dinikmati.",
  },
  {
    q: "Apakah transaksi menggunakan promo bisa pisah struk (Split Bill)?",
    a: "Mohon maaf, demi kelancaran sistem pencatatan kasir, satu meja yang menggunakan promo wajib melakukan pembayaran gabungan dalam satu struk (tidak bisa di-split).",
  },
];

export default function PromotionsPage() {
  const [countdown, setCountdown] = useState("Memuat waktu tersisa...");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const targetDate = new Date("Dec 12, 2026 23:59:59").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        setCountdown("PROMO TELAH BERAKHIR");
        return false;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`Waktu Tersisa: ${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`);
      return true;
    };

    const isRunning = updateCountdown();
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (!updateCountdown()) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!alertMessage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAlertMessage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [alertMessage]);

  const handleAlert = (msg: string) => {
    setAlertMessage(msg);
  };

  const closeAlert = () => {
    setAlertMessage(null);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="logo">Dapur Senja</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/menu">Menu</Link></li>
          <li><Link href="/promotions" className="active">Promo & Info</Link></li>
          <li><Link href="/reservation">Reservation</Link></li>
          <li><Link href="/login">Account</Link></li>
        </ul>
      </nav>

      <motion.header
        className="menu-header"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h1>Promo Makanan & Penawaran Spesial</h1>
        <p>Klaim vouchernya sekarang dan nikmati harga spesial untuk menu andalan Dapur Senja!</p>
      </motion.header>

      <div className="filter-container">
        <Link href="/promotions" className="filter-btn active">Promotions</Link>
        <Link href="/events" className="filter-btn">Events</Link>
        <Link href="/gallery" className="filter-btn">Gallery</Link>
        <Link href="/reviews" className="filter-btn">Reviews</Link>
      </div>

      <main>
        <motion.section
          className="promo-card"
          style={{ borderLeft: "4px solid #ff8c00" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2>Weekend Santai (Diskon 15%)</h2>
          <p>Nikmati akhir pekan Anda! Setiap pembelian menu makanan apa saja, dapatkan diskon 15% plus pilihan Jus Strawberry atau Jus Alpukat GRATIS.</p>
          <p><strong>Masa Berlaku:</strong> Setiap Sabtu & Minggu (Berlaku Sepanjang Tahun)</p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => handleAlert("INFORMASI KLAIM MANUAL:\n\nKode Promo: WEEKEND15\n\nTunjukkan kode promo ini langsung kepada kasir kami sebelum Anda membayar pesanan. Jangan lupa sebutkan pilihan jus gratis Anda!")}
          >
            Klaim Voucher
          </motion.button>
        </motion.section>

        <motion.section
          className="promo-card"
          style={{ borderLeft: "4px solid #ff8c00" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
        >
          <h2>Promo Spesial Bulanan (Desember)</h2>
          <p>Transaksi minimal Rp 100.000, langsung dapat potongan Rp 15.000 untuk kunjungan Anda berikutnya.</p>
          <p><strong>Masa Berlaku:</strong> 1 - 31 Desember 2026</p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => handleAlert("INFORMASI KLAIM MANUAL:\n\nKode Promo: DES15K\n\nPromo ini berlaku untuk transaksi berikutnya. Simpan struk transaksi Anda hari ini (minimal Rp 100.000) dan tunjukkan kepada kasir saat Anda datang kembali.")}
          >
            Klaim Voucher
          </motion.button>
        </motion.section>

        <motion.section
          className="promo-card flash-sale"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <h2>Flash Sale 12.12 (Menu Cuma 15rb!)</h2>
          <p id="countdown" className="countdown-text">{countdown}</p>
          <p>Spesial tanggal kembar! Nikmati Nasi Goreng Spesial atau Ayam Bakar hanya seharga Rp 15.000.</p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => handleAlert("INFORMASI KLAIM MANUAL:\n\nKode Promo: FLASH1212\n\nHanya berlaku pada tanggal 12 Desember 2026! Tunjukkan pesan ini ke kasir sebelum memesan.")}
          >
            Klaim Voucher
          </motion.button>
        </motion.section>

        <motion.section
          className="promo-card"
          style={{ borderLeft: "4px solid #ffcc00" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, delay: 0.12, ease: "easeOut" }}
        >
          <h2>Promo Hari Kelahiran (Diskon 10%)</h2>
          <p>Rayakan hari spesial Anda bersama kami! Dapatkan diskon 10% untuk seluruh pesanan tanpa minimum transaksi.</p>
          <p><strong>Masa Berlaku:</strong> Berlaku tepat di hari ulang tahun Anda.</p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            style={{ backgroundColor: "#ffcc00", color: "#333" }}
            onClick={() => handleAlert("INFORMASI KLAIM MANUAL:\n\nKlaim Promo Ulang Tahun berhasil!\n\nPromo ini HANYA BERLAKU tepat pada hari kelahiran Anda. Silakan tunjukkan KTP/Identitas asli Anda langsung ke kasir kami untuk diverifikasi.")}
          >
            Klaim Promo Ulang Tahun
          </motion.button>
        </motion.section>

        <motion.section
          className="promo-card"
          style={{ borderLeft: "4px solid #4CAF50" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, delay: 0.14, ease: "easeOut" }}
        >
          <h2>Paket Pelajar & Mahasiswa (Diskon 20%)</h2>
          <p>Tunjukkan kartu pelajar atau KTM aktif kamu dan nikmati potongan harga 20% untuk semua menu tanpa terkecuali.</p>
          <p><strong>Masa Berlaku:</strong> Senin - Jumat (Tidak berlaku di hari libur nasional)</p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            style={{ backgroundColor: "#4CAF50", color: "white" }}
            onClick={() => handleAlert("INFORMASI KLAIM MANUAL:\n\nPromo Mahasiswa/Pelajar tidak menggunakan kode voucher di website.\n\nAnda cukup membawa dan menunjukkan Kartu Pelajar atau KTM fisik yang masih aktif kepada kasir kami sebelum melakukan pembayaran.")}
          >
            Cek Syarat Pelajar
          </motion.button>
        </motion.section>

        <section className="faq-section">
          <h2 className="faq-title">Tanya Jawab Syarat & Ketentuan Promo</h2>
          <div className="faq-container">
            {faqList.map((faq, index) => (
              <div key={faq.q} className="faq-item">
                <button
                  className={`faq-btn ${activeFaq === index ? "active" : ""}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className={`faq-icon ${activeFaq === index ? "open" : ""}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      className="faq-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Dapur Senja. All rights reserved.</p>
      </footer>

      <AnimatePresence>
        {alertMessage && (
          <motion.div
            className="custom-alert-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeAlert}
          >
            <motion.div
              className="custom-alert-box"
              initial={{ opacity: 0, scale: 0.92, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {alertMessage.split("\n").map((line, idx) => (
                <p key={idx}>{line ? line : <br />}</p>
              ))}
              <button className="custom-alert-btn" onClick={closeAlert}>OK</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}