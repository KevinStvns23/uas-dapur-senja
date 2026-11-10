"use client";
import { useState, useEffect } from "react";
import "./style.css";

export default function PromotionsPage() {
  const [countdown, setCountdown] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const targetDate = new Date("Dec 12, 2026 23:59:59").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        setCountdown("PROMO TELAH BERAKHIR");
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown("Waktu Tersisa: " + days + " Hari " + hours + " Jam " + minutes + " Menit " + seconds + " Detik");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
        <div className="logo">Dapur Senja</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/promotions" className="active">Promo & Info</a></li>
          <li><a href="/reservation">Reservation</a></li>
          <li><a href="/login">Account</a></li>
        </ul>
      </nav>

      <header className="menu-header">
        <h1>Promo Makanan & Penawaran Spesial</h1>
        <p>Klaim vouchernya sekarang dan nikmati harga spesial untuk menu andalan Dapur Senja!</p>
      </header>

      <div className="filter-container">
        <a href="/promotions" className="filter-btn active">Promotions</a>
        <a href="/events" className="filter-btn">Events</a>
        <a href="/gallery" className="filter-btn">Gallery</a>
        <a href="/reviews" className="filter-btn">Reviews</a>
      </div>

      <main>
        <section className="promo-card" style={{ borderLeft: '4px solid #ff8c00' }}>
          <h2>Weekend Santai (Diskon 15%)</h2>
          <p>Nikmati akhir pekan Anda! Setiap pembelian menu makanan apa saja, dapatkan diskon 15% plus pilihan Jus Strawberry atau Jus Alpukat GRATIS.</p>
          <p><strong>Masa Berlaku:</strong> Setiap Sabtu & Minggu (Berlaku Sepanjang Tahun)</p>
          <button onClick={() => handleAlert('INFORMASI KLAIM MANUAL:\n\nKode Promo: WEEKEND15\n\nTunjukkan kode promo ini langsung kepada kasir kami sebelum Anda membayar pesanan. Jangan lupa sebutkan pilihan jus gratis Anda!')}>Klaim Voucher</button>
        </section>

        <section className="promo-card" style={{ borderLeft: '4px solid #ff8c00' }}>
          <h2>Promo Spesial Bulanan (Oktober)</h2>
          <p>Transaksi minimal Rp 100.000, langsung dapat potongan Rp 15.000 untuk kunjungan Anda berikutnya.</p>
          <p><strong>Masa Berlaku:</strong> 1 - 31 Oktober 2026</p>
          <button onClick={() => handleAlert('INFORMASI KLAIM MANUAL:\n\nKode Promo: OKT15K\n\nPromo ini berlaku untuk transaksi berikutnya. Simpan struk transaksi Anda hari ini (minimal Rp 100.000) dan tunjukkan kepada kasir saat Anda datang kembali.')}>Klaim Voucher</button>
        </section>

        <section className="promo-card flash-sale">
          <h2>Flash Sale 12.12 (Menu Cuma 15rb!)</h2>
          <p id="countdown" style={{ fontWeight: 'bold', color: '#ff8c00', fontSize: '18px' }}>{countdown}</p>
          <p>Spesial tanggal kembar! Nikmati Nasi Goreng Spesial atau Ayam Bakar hanya seharga Rp 15.000.</p>
          <button onClick={() => handleAlert('INFORMASI KLAIM MANUAL:\n\nKode Promo: FLASH1212\n\nHanya berlaku pada tanggal 12 Desember 2026! Tunjukkan pesan ini ke kasir sebelum memesan.')}>Klaim Voucher</button>
        </section>

        <section className="promo-card" style={{ borderLeft: '4px solid #ffcc00' }}>
          <h2>Promo Hari Kelahiran (Diskon 10%)</h2>
          <p>Rayakan hari spesial Anda bersama kami! Dapatkan diskon 10% untuk seluruh pesanan tanpa minimum transaksi.</p>
          <p><strong>Masa Berlaku:</strong> Berlaku tepat di hari ulang tahun Anda.</p>
          <button style={{ backgroundColor: '#ffcc00', color: '#333' }} onClick={() => handleAlert('INFORMASI KLAIM MANUAL:\n\nKlaim Promo Ulang Tahun berhasil!\n\nPromo ini HANYA BERLAKU tepat pada hari kelahiran Anda. Silakan tunjukkan KTP/Identitas asli Anda langsung ke kasir kami untuk diverifikasi.')}>Klaim Promo Ulang Tahun</button>
        </section>

        <section className="promo-card" style={{ borderLeft: '4px solid #4CAF50' }}>
          <h2>Paket Pelajar & Mahasiswa (Diskon 20%)</h2>
          <p>Tunjukkan kartu pelajar atau KTM aktif kamu dan nikmati potongan harga 20% untuk semua menu tanpa terkecuali.</p>
          <p><strong>Masa Berlaku:</strong> Senin - Jumat (Tidak berlaku di hari libur nasional)</p>
          <button style={{ backgroundColor: '#4CAF50', color: 'white' }} onClick={() => handleAlert('INFORMASI KLAIM MANUAL:\n\nPromo Mahasiswa/Pelajar tidak menggunakan kode voucher di website.\n\nAnda cukup membawa dan menunjukkan Kartu Pelajar atau KTM fisik yang masih aktif kepada kasir kami sebelum melakukan pembayaran.')}>Cek Syarat Pelajar</button>
        </section>

        <section className="faq-section">
          <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Tanya Jawab Syarat & Ketentuan Promo</h2>
          <div className="faq-container">
            {[
              { q: "Bagaimana cara menggunakan kode promo dari website ini?", a: "Semua promo diproses secara manual. Anda cukup menekan tombol klaim pada website, kemudian tunjukkan kode atau layar HP Anda secara langsung kepada staf kasir kami sebelum melakukan pembayaran." },
              { q: "Apakah kode voucher promo bisa digabungkan?", a: "Tidak bisa. Dalam satu struk transaksi, Anda hanya dapat memilih dan menggunakan satu penawaran promo yang memberikan keuntungan terbesar bagi Anda." },
              { q: "Apakah Promo Spesial Bulanan akan selalu sama setiap bulannya?", a: "Tidak. Kami rutin mengganti jenis Promo Bulanan setiap tanggal 1 di awal bulan untuk memberikan variasi penawaran menarik. Pantau terus halaman ini untuk promo terbaru." },
              { q: "Apa syarat wajib untuk Promo Hari Kelahiran?", a: "Diskon 10% ini hanya berlaku tepat pada tanggal kelahiran Anda (H-0). Kasir kami wajib memverifikasinya melalui KTP asli atau identitas resmi lainnya yang memiliki tanggal lahir. Tidak berlaku untuk hari sebelum atau sesudah ulang tahun." },
              { q: "Apakah Promo Pelajar berlaku untuk mahasiswa yang sedang skripsi/cuti?", a: "Selama Kartu Tanda Mahasiswa (KTM) Anda memiliki masa berlaku (tahun akademik) yang masih aktif tercetak di kartu, kasir kami akan memproses diskon 20% tersebut." },
              { q: "Apakah promo diskon berlaku untuk dibawa pulang (Takeaway)?", a: "Semua promo yang tertera di website saat ini eksklusif berlaku untuk makan di tempat (Dine-in) agar kualitas dan kehangatan hidangan tetap terjaga saat dinikmati." },
              { q: "Apakah transaksi menggunakan promo bisa pisah struk (Split Bill)?", a: "Mohon maaf, demi kelancaran sistem pencatatan kasir, satu meja yang menggunakan promo wajib melakukan pembayaran gabungan dalam satu struk (tidak bisa di-split)." }
            ].map((faq, index) => (
              <div key={index}>
                <button
                  className={`faq-btn ${activeFaq === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  {faq.q}
                </button>
                <div
                  className="faq-content"
                  style={{ display: activeFaq === index ? 'block' : 'none' }}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <p style={{ textAlign: 'center' }}>&copy; 2026 Dapur Senja. All rights reserved.</p>
      </footer>

      {alertMessage && (
        <div className="custom-alert-overlay">
          <div className="custom-alert-box">
            {alertMessage.split('\n').map((line, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: line || '<br>' }} />
            ))}
            <button className="custom-alert-btn" onClick={closeAlert}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}