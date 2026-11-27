"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import "./style.css";

const momenItems = [
  { imgSrc: "/img-events&momen/suasana-restoran.webp", alt: "Suasana Resto", title: "Area Makan Nyaman" },
  { imgSrc: "/img-events&momen/suasana-outdoor.jpg", alt: "Suasana Outdoor", title: "Area Teras Terbuka" },
  { imgSrc: "/img-events&momen/momen-hangat-keluarga.jpeg", alt: "Momen Keluarga", title: "Momen Hangat Keluarga" },
  { imgSrc: "/img-events&momen/dapur-restoran.jpg", alt: "Dapur", title: "Dapur Profesional" },
  { imgSrc: "/img-events&momen/tim-restoran.jpg", alt: "Tim Koki", title: "Chef Berpengalaman" },
  { imgSrc: "/img-events&momen/live-akustik.jpg", alt: "Akustik", title: "Panggung Akustik" },
  { imgSrc: "/img-events&momen/nonton-bareng.jpg", alt: "Nobar", title: "Area Nonton Bareng" },
];

const rasaItems = [
  { imgSrc: "/images/ayambakar.jpg", alt: "Ayam Bakar", label: "Ayam Bakar", title: "Ayam Bakar", desc: "Diungkep perlahan dengan racikan rempah warisan keluarga sebelum dibakar di atas arang." },
  { imgSrc: "/images/ayamgeprek.jpg", alt: "Ayam Geprek", label: "Ayam Geprek", title: "Ayam Geprek", desc: "Perpaduan tekstur ayam krispi keemasan dengan ulekan sambal bawang pedas yang menggigit." },
  { imgSrc: "/images/nasigoreng.jpg", alt: "Nasi Goreng", label: "Nasi Goreng Spesial", title: "Nasi Goreng Spesial", desc: "Dimasak dengan api besar untuk mengunci aroma wok hei, dipadukan dengan bumbu rempah pekat." },
  { imgSrc: "/images/miegoreng.jpg", alt: "Mie Goreng", label: "Mie Goreng", title: "Mie Goreng", desc: "Racikan mie kenyal yang ditumis bersuhu tinggi, menyajikan cita rasa gurih manis dengan limpahan topping." },
  { imgSrc: "/images/rendang.jpg", alt: "Rendang Sapi", label: "Rendang Sapi", title: "Rendang Sapi", desc: "Potongan daging sapi dimasak perlahan berjam-jam dalam lumuran santan kental, tekstur empuk bumbu meresap." },
  { imgSrc: "/images/sate.jpg", alt: "Sate Ayam", label: "Sate Ayam", title: "Sate Ayam", desc: "Daging ayam lembut dipanggang sempurna, dilumuri bumbu kacang kental gurih manis." },
  { imgSrc: "/images/spageti.jpg", alt: "Spaghetti", label: "Spaghetti", title: "Spaghetti Bolognese", desc: "Pasta al dente yang disajikan dengan saus tomat daging cincang kaya rempah khas Italia." },
  { imgSrc: "/images/frenchfries.jpg", alt: "French Fries", label: "French Fries", title: "French Fries", desc: "Potongan kentang pilihan yang digoreng garing di luar namun tetap lembut di dalam." },
  { imgSrc: "/images/lumpia.jpg", alt: "Lumpia Goreng", label: "Lumpia Goreng", title: "Lumpia Goreng", desc: "Kulit krispi menyembunyikan isian rebung dan sayur gurih yang kaya rasa, digoreng dadakan." },
  { imgSrc: "/images/mendoan.jpg", alt: "Tempe Mendoan", label: "Tempe Mendoan", title: "Tempe Mendoan", desc: "Dibalut adonan tepung berbumbu yang digoreng setengah matang, tekstur basah dan gurih khas." },
  { imgSrc: "/images/bread.jpg", alt: "Roti Bakar", label: "Roti Bakar", title: "Roti Bakar", desc: "Roti tebal dipanggang dengan mentega hingga garing, menyembunyikan kelembutan dan manis di dalam." },
  { imgSrc: "/images/pisangbakar.jpg", alt: "Pisang Bakar", label: "Pisang Bakar", title: "Pisang Bakar", desc: "Pisang manis legit yang dibakar perlahan hingga karamelisasi alaminya keluar." },
  { imgSrc: "/images/cake.jpg", alt: "Choco Cake", label: "Choco Cake", title: "Choco Cake", desc: "Kejutan manis yang menghangatkan suasana. Bolu cokelat lembut dengan rasa pekat yang lumer." },
  { imgSrc: "/images/tiramisu.jpg", alt: "Tiramisu", label: "Tiramisu", title: "Tiramisu", desc: "Dessert klasik berlapis ladyfingers celup kopi dengan krim mascarpone yang ringan dan taburan kakao." },
  { imgSrc: "/images/escampur.jpg", alt: "Es Campur", label: "Es Campur", title: "Es Campur", desc: "Mangkuk nostalgia dengan serutan es, sirup manis legit, dan ragam isian kenyal menyegarkan." },
  { imgSrc: "/images/alpukat.jpg", alt: "Jus Alpukat", label: "Jus Alpukat", title: "Jus Alpukat", desc: "Alpukat mentega yang diblend sempurna dengan sentuhan kental manis cokelat di pinggiran gelas." },
  { imgSrc: "/images/stroberi.jpg", alt: "Smoothies", label: "Berry Smoothies", title: "Berry Smoothies", desc: "Campuran buah beri segar dan yogurt yang dihaluskan, sangat cocok untuk mengimbangi hidangan gurih." },
  { imgSrc: "/images/matcha.jpg", alt: "Matcha", label: "Matcha Latte", title: "Matcha Latte", desc: "Perpaduan teh hijau premium dengan susu krimi, menghasilkan rasa earthy yang khas dan menenangkan." },
  { imgSrc: "/images/lemontea.jpg", alt: "Lemon Tea", label: "Lemon Tea", title: "Lemon Tea", desc: "Kesegaran teh pilihan berpadu dengan asam manis perasan lemon asli." },
  { imgSrc: "/images/americano.jpg", alt: "Americano", label: "Americano", title: "Americano", desc: "Ekstraksi kopi murni yang tegas dan berkarakter, memberikan energi murni tanpa rasa manis berlebih." },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("tab-momen");
  const [modalData, setModalData] = useState({ isOpen: false, imgSrc: "", title: "", desc: "" });

  const openModal = (imgSrc: string, title: string, desc: string) => {
    setModalData({ isOpen: true, imgSrc, title, desc });
  };

  const closeModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    if (!modalData.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalData.isOpen]);

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
        <h1>Galeri & Momen</h1>
        <p>Jelajahi fasilitas dan momen hangat di restoran kami</p>
      </motion.header>

      <div className="filter-container">
        <Link href="/promotions" className="filter-btn">Promotions</Link>
        <Link href="/events" className="filter-btn">Events</Link>
        <Link href="/gallery" className="filter-btn active">Gallery</Link>
        <Link href="/reviews" className="filter-btn">Reviews</Link>
      </div>

      <main>
        <div className="tab-container">
          <button
            className={`tab-btn ${activeTab === "tab-momen" ? "active" : ""}`}
            onClick={() => setActiveTab("tab-momen")}
          >
            Suasana & Momen
          </button>
          <button
            className={`tab-btn ${activeTab === "tab-rasa" ? "active" : ""}`}
            onClick={() => setActiveTab("tab-rasa")}
          >
            Kisah di Balik Rasa
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "tab-momen" ? (
            <motion.section
              key="tab-momen"
              id="tab-momen"
              className="tab-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <p className="tab-subtitle">Intip fasilitas dan momen hangat di Dapur Senja.</p>
              <div className="gallery-grid">
                {momenItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="gallery-item"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
                  >
                    <div className="gallery-img-wrapper">
                      <img src={item.imgSrc} alt={item.alt} />
                    </div>
                    <p>{item.title}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="tab-rasa"
              id="tab-rasa"
              className="tab-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <p className="tab-subtitle">Klik hidangan untuk mengetahui cerita di balik rasanya.</p>
              <div className="gallery-grid">
                {rasaItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="gallery-item"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.025, 0.25), ease: "easeOut" }}
                    onClick={() => openModal(item.imgSrc, item.title, item.desc)}
                  >
                    <div className="gallery-img-wrapper">
                      <img src={item.imgSrc} alt={item.alt} />
                    </div>
                    <p>{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {modalData.isOpen && (
            <motion.div
              id="food-modal"
              className="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeModal}
            >
              <motion.div
                className="modal-content"
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-btn" onClick={closeModal}>X</button>
                {modalData.imgSrc && (
                  <motion.img
                    id="modal-img"
                    src={modalData.imgSrc}
                    alt={modalData.title}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                )}
                <motion.div
                  className="modal-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.06, ease: "easeOut" }}
                >
                  <h2 id="modal-title">{modalData.title}</h2>
                  <p id="modal-desc">{modalData.desc}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer>
        <p>&copy; 2026 Dapur Senja. All rights reserved.</p>
      </footer>
    </>
  );
}