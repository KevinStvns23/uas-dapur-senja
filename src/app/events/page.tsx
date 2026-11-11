"use client";
import "./style.css";

export default function EventsPage() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">Dapur Senja</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/promotions">Promo & Info</a></li>
          <li><a href="/reservation">Reservation</a></li>
          <li><a href="/login">Account</a></li>
        </ul>
      </nav>

      <header className="menu-header">
        <h1>Acara Spesial di Dapur Senja</h1>
        <p>Makan enak sambil menikmati suasana seru bersama kami</p>
      </header>

      <div className="filter-container">
        <a href="/promotions" className="filter-btn">Promotions</a>
        <a href="/events" className="filter-btn active">Events</a>
        <a href="/gallery" className="filter-btn">Gallery</a>
        <a href="/reviews" className="filter-btn">Reviews</a>
      </div>

      <main>
        <div className="event-card">
          <h2>Live Music Akustik</h2>
          <img src="/img-events&momen/live-akustik.jpg" alt="Live Akustik" style={{ width: '100%', borderRadius: '8px', marginBottom: '15px', maxHeight: '400px', objectFit: 'cover' }} />
          <p>Nikmati malam minggu Anda dengan iringan musik akustik langsung dari musisi lokal berbakat. Cocok untuk makan malam romantis atau bersantai dengan teman dan keluarga.</p>
          <p><strong>Jadwal:</strong> Setiap Sabtu, 19:00 - 22:00 WIB</p>
        </div>
        
        <div className="event-card">
          <h2>Nonton Bareng (Nobar) Pertandingan Sepak Bola</h2>
          <img src="/img-events&momen/nonton-bareng.jpg" alt="Nonton Bareng" style={{ width: '100%', borderRadius: '8px', marginBottom: '15px', maxHeight: '400px', objectFit: 'cover' }} />
          <p>Dukung tim kesayangan Anda bersama penggemar lainnya! Layar lebar, sorak sorai, dan camilan enak siap menemani malam pertandingan Anda. Suasana dijamin meriah.</p>
          <p><strong>Jadwal:</strong> Sesuai jadwal pertandingan besar (Cek info terbaru di media sosial kami)</p>
        </div>
      </main>
      <footer>
        <p style={{ textAlign: 'center' }}>&copy; 2026 Dapur Senja. All rights reserved.</p>
      </footer>
    </>
  );
}