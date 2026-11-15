"use client";
import { useState, useEffect } from "react";
import "./style.css";
import { getReviews, addReview } from "./actions";

type ReviewData = {
  id?: number;
  name: string;
  rating: number;
  tags: string;
  text: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      const dbReviews = await getReviews();
      setReviews(dbReviews);
    }
    fetchReviews();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const submitReviewHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setAlertMessage("Mohon berikan rating bintang (1-5) terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);

    const finalTags = selectedTags.length === 0 ? "Menu Umum" : selectedTags.join(", ");
    
    const formData = new FormData();
    formData.append("name", reviewerName);
    formData.append("rating", rating.toString());
    formData.append("text", reviewText);
    formData.append("tags", finalTags);

    const result = await addReview(formData);

    if (result.success && result.review) {
      setReviews([result.review, ...reviews]);
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

  const menuUtama = ["Ayam Bakar", "Ayam Geprek", "Nasi Goreng Spesial", "Mie Goreng", "Rendang Sapi", "Sate Ayam", "Spaghetti Bolognese"];
  const camilanMinuman = ["French Fries", "Lumpia Goreng", "Tempe Mendoan", "Roti Bakar", "Pisang Bakar", "Choco Cake", "Tiramisu", "Es Campur", "Jus Alpukat", "Berry Smoothies", "Matcha Latte", "Lemon Tea", "Americano"];

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
        <h1>Apa Kata Mereka?</h1>
        <p>Ulasan asli dari para pelanggan setia Dapur Senja</p>
      </header>

      <div className="filter-container">
        <a href="/promotions" className="filter-btn">Promotions</a>
        <a href="/events" className="filter-btn">Events</a>
        <a href="/gallery" className="filter-btn">Gallery</a>
        <a href="/reviews" className="filter-btn active">Reviews</a>
      </div>

      <main>
        <div className="review-grid">
          {reviews.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#777' }}>Belum ada ulasan. Jadilah yang pertama!</p>
          ) : (
            reviews.map((rev, index) => (
              <div className="review-card" key={index}>
                <h3>{rev.name}</h3>
                <p className="stars" style={{ fontSize: '1.2rem', color: '#ffb400' }}>
                  {Array(rev.rating).fill("★").join("")}
                  {Array(5 - rev.rating).fill("☆").join("")}
                </p>
                <div className="tag-container">
                  {rev.tags.split(", ").map((tag, tIndex) => (
                    <span className="menu-tag" key={tIndex}>{tag}</span>
                  ))}
                </div>
                <p>"{rev.text}"</p>
              </div>
            ))
          )}
        </div>

        <section className="newsletter-section">
          <h2>Punya Pengalaman Menarik?</h2>
          <p>Bagikan cerita Anda. Masukan Anda membantu kami melayani lebih baik.</p>
          
          <form className="review-form" onSubmit={submitReviewHandler}>
            <input 
              type="text" 
              placeholder="Nama Anda" 
              required 
              value={reviewerName}
              onChange={e => setReviewerName(e.target.value)}
            />
            
            <div className="star-rating-container" onMouseLeave={() => setHoverRating(rating)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star}
                  className={`star-select ${star <= (hoverRating || rating) ? 'active' : ''}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onClick={() => setRating(star)}
                  style={{ fontSize: '3.5rem', cursor: 'pointer', transition: 'color 0.2s ease-in-out' }}
                >
                  ★
                </span>
              ))}
            </div>

            <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>Pilih Menu Utama (Bisa lebih dari 1):</p>
            <div className="tag-selector">
              {menuUtama.map(tag => (
                <button 
                  type="button" 
                  key={tag}
                  className={`tag-select-btn ${selectedTags.includes(tag) ? 'selected' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>Pilih Camilan & Minuman (Bisa lebih dari 1):</p>
            <div className="tag-selector">
              {camilanMinuman.map(tag => (
                <button 
                  type="button" 
                  key={tag}
                  className={`tag-select-btn ${selectedTags.includes(tag) ? 'selected' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <textarea 
              placeholder="Tulis ulasan Anda di sini..." 
              rows={4} 
              required 
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
            />
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Kirim Ulasan"}
            </button>
          </form>
        </section>

        {alertMessage && (
          <div className="custom-alert-overlay" onClick={() => setAlertMessage("")}>
            <div className="custom-alert-box" onClick={(e) => e.stopPropagation()}>
              <p>{alertMessage}</p>
              <button onClick={() => setAlertMessage("")}>Tutup</button>
            </div>
          </div>
        )}
      </main>
      <footer>
        <p style={{ textAlign: 'center' }}>&copy; 2026 Dapur Senja. All rights reserved.</p>
      </footer>
    </>
  );
}