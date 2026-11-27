"use client";
import Link from "next/link";
import { motion } from "motion/react";
import "./style.css";

const eventsList = [
  {
    title: "Live Music Akustik",
    imgSrc: "/img-events&momen/live-akustik.jpg",
    alt: "Live Akustik",
    desc: "Nikmati malam minggu Anda dengan iringan musik akustik langsung dari musisi lokal berbakat. Cocok untuk makan malam romantis atau bersantai dengan teman dan keluarga.",
    schedule: "Setiap Sabtu, 19:00 - 22:00 WIB",
  },
  {
    title: "Nonton Bareng (Nobar) Pertandingan Sepak Bola",
    imgSrc: "/img-events&momen/nonton-bareng.jpg",
    alt: "Nonton Bareng",
    desc: "Dukung tim kesayangan Anda bersama penggemar lainnya! Layar lebar, sorak sorai, dan camilan enak siap menemani malam pertandingan Anda. Suasana dijamin meriah.",
    schedule: "Sesuai jadwal pertandingan besar (Cek info terbaru di media sosial kami)",
  },
];

export default function EventsPage() {
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
        <h1>Acara Spesial di Dapur Senja</h1>
        <p>Makan enak sambil menikmati suasana seru bersama kami</p>
      </motion.header>

      <div className="filter-container">
        <Link href="/promotions" className="filter-btn">Promotions</Link>
        <Link href="/events" className="filter-btn active">Events</Link>
        <Link href="/gallery" className="filter-btn">Gallery</Link>
        <Link href="/reviews" className="filter-btn">Reviews</Link>
      </div>

      <main>
        {eventsList.map((event, index) => (
          <motion.div
            key={event.title}
            className="event-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
          >
            <h2>{event.title}</h2>
            <div className="event-img-wrapper">
              <img src={event.imgSrc} alt={event.alt} className="event-img" />
            </div>
            <p>{event.desc}</p>
            <p className="event-schedule">
              <strong>Jadwal:</strong> {event.schedule}
            </p>
          </motion.div>
        ))}
      </main>

      <footer>
        <p>&copy; 2026 Dapur Senja. All rights reserved.</p>
      </footer>
    </>
  );
}