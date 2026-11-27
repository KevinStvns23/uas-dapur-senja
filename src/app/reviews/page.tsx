"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import "./style.css";
import { getReviews, addReview } from "./actions";

type ReviewData = {
  id?: number;
  name: string;
  rating: number;
  tags: string;
  text: string;
};

const menuUtama = [
  "Ayam Bakar",
  "Ayam Geprek",
  "Nasi Goreng Spesial",
  "Mie Goreng",
  "Rendang Sapi",
  "Sate Ayam",
  "Spaghetti Bolognese",
];

const camilanMinuman = [
  "French Fries",
  "Lumpia Goreng",
  "Tempe Mendoan",
  "Roti Bakar",
  "Pisang Bakar",
  "Choco Cake",
  "Tiramisu",
  "Es Campur",
  "Jus Alpukat",
  "Berry Smoothies",
  "Matcha Latte",
  "Lemon Tea",
  "Americano",
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      try {
        const dbReviews = await getReviews();
        setReviews(dbReviews);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    if (!alertMessage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAlertMessage("");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [alertMessage]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const submitReviewHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = reviewerName.trim();
    const cleanText = reviewText.trim();

    if (!cleanName || !cleanText) {
      setAlertMessage("Nama dan isi ulasan tidak boleh kosong.");
      return;
    }

    if (rating === 0) {
      setAlertMessage("Mohon berikan rating bintang (1-5) terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);

    const finalTags = selectedTags.length === 0 ? "Menu Umum" : selectedTags.join(", ");

    const formData = new FormData();
    formData.append("name", cleanName);
    formData.append("rating", rating.toString());
    formData.append("text", cleanText);
    formData.append("tags", finalTags);

    const result = await addReview(formData);

    if (result.success && result.review) {
      setReviews((prev) => [result.review, ...prev]);
      setAlertMessage("Terima kasih atas ulasannya! Ulasan Anda telah berhasil disimpan ke database.");
      setReviewerName("");
      setReviewText("");
      setSelectedTags([]);
      setRating(0);
      setHoverRating(0);
    } else {
      setAlertMessage("Maaf, terjadi kesalahan saat menyimpan ulasan. Pastikan server database berjalan.");
    }

    setIsSubmitting(false);
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
        <h1>Apa Kata Mereka?</h1>
        <p>Ulasan asli dari para pelanggan setia Dapur Senja</p>
      </motion.header>

      <div className="filter-container">
        <Link href="/promotions" className="filter-btn">Promotions</Link>
        <Link href="/events" className="filter-btn">Events</Link>
        <Link href="/gallery" className="filter-btn">Gallery</Link>
        <Link href="/reviews" className="filter-btn active">Reviews</Link>
      </div>

      <main>
        <div className="review-grid">
          {isLoading ? (
            <p className="review-status-text">Memuat ulasan...</p>
          ) : reviews.length === 0 ? (
            <p className="review-status-text">Belum ada ulasan. Jadilah yang pertama!</p>
          ) : (
            reviews.map((rev, index) => (
              <motion.div
                className="review-card"
                key={rev.id ?? index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3), ease: "easeOut" }}
              >
                <h3>{rev.name}</h3>
                <p className="stars">
                  {Array(rev.rating).fill("★").join("")}
                  {Array(5 - rev.rating).fill("☆").join("")}
                </p>
                <div className="tag-container">
                  {rev.tags.split(", ").map((tag, tIndex) => (
                    <span className="menu-tag" key={tIndex}>{tag}</span>
                  ))}
                </div>
                <p>&ldquo;{rev.text}&rdquo;</p>
              </motion.div>
            ))
          )}
        </div>

        <motion.section
          className="newsletter-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2>Punya Pengalaman Menarik?</h2>
          <p>Bagikan cerita Anda. Masukan Anda membantu kami melayani lebih baik.</p>

          <form className="review-form" onSubmit={submitReviewHandler}>
            <input
              type="text"
              placeholder="Nama Anda"
              required
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
            />

            <div className="star-rating-container" onMouseLeave={() => setHoverRating(rating)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.span
                  key={star}
                  className={`star-select ${star <= (hoverRating || rating) ? "active" : ""}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onClick={() => setRating(star)}
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.92 }}
                >
                  ★
                </motion.span>
              ))}
            </div>

            <p className="tag-label">Pilih Menu Utama (Bisa lebih dari 1):</p>
            <div className="tag-selector">
              {menuUtama.map((tag) => (
                <motion.button
                  type="button"
                  key={tag}
                  whileTap={{ scale: 0.95 }}
                  className={`tag-select-btn ${selectedTags.includes(tag) ? "selected" : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </motion.button>
              ))}
            </div>

            <p className="tag-label">Pilih Camilan & Minuman (Bisa lebih dari 1):</p>
            <div className="tag-selector">
              {camilanMinuman.map((tag) => (
                <motion.button
                  type="button"
                  key={tag}
                  whileTap={{ scale: 0.95 }}
                  className={`tag-select-btn ${selectedTags.includes(tag) ? "selected" : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </motion.button>
              ))}
            </div>

            <textarea
              placeholder="Tulis ulasan Anda di sini..."
              rows={4}
              required
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <motion.button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? "Menyimpan..." : "Kirim Ulasan"}
            </motion.button>
          </form>
        </motion.section>

        <AnimatePresence>
          {alertMessage && (
            <motion.div
              className="custom-alert-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setAlertMessage("")}
            >
              <motion.div
                className="custom-alert-box"
                initial={{ opacity: 0, scale: 0.92, y: -12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <p>{alertMessage}</p>
                <button onClick={() => setAlertMessage("")}>Tutup</button>
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