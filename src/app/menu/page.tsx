"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

interface Menu {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  desc: string;
  ingredients: string;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export default function MenuPage() {
  const [menuData, setMenuData] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("default");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastItem, setToastItem] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  useEffect(() => {
    const savedItems = localStorage.getItem("restaurantOrderItems");
    if (savedItems) {
      setOrderItems(JSON.parse(savedItems));
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function loadDataFromAPI() {
      try {
        const response = await fetch("/api/menus");
        if (response.ok) {
          const data = await response.json();
          setMenuData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadDataFromAPI();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const totalOrders = orderItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleOrder = (menu: Menu) => {
    const existingIndex = orderItems.findIndex((item) => item.id === menu.id);
    let updatedItems: OrderItem[];

    if (existingIndex > -1) {
      updatedItems = [...orderItems];
      updatedItems[existingIndex].qty += 1;
    } else {
      updatedItems = [
        ...orderItems,
        { id: menu.id, name: menu.name, price: menu.price, qty: 1 },
      ];
    }

    const newTotal = updatedItems.reduce((sum, item) => sum + item.qty, 0);
    setOrderItems(updatedItems);
    localStorage.setItem("restaurantOrderItems", JSON.stringify(updatedItems));
    localStorage.setItem("restaurantOrders", newTotal.toString());
    setToastItem(menu.name);
    setShowToast(true);
  };

  const handleOpenConfirm = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCheckout = () => {
    setConfirmedCount(totalOrders);
    setConfirmedTotal(totalPrice);
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    setOrderItems([]);
    localStorage.removeItem("restaurantOrderItems");
    localStorage.removeItem("restaurantOrders");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let filteredData = menuData;

  if (currentCategory !== "all") {
    filteredData = filteredData.filter((item) => item.category === currentCategory);
  }
  if (searchQuery !== "") {
    filteredData = filteredData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (sortType === "lowest") {
    filteredData.sort((a, b) => a.price - b.price);
  } else if (sortType === "highest") {
    filteredData.sort((a, b) => b.price - a.price);
  } else {
    filteredData.sort((a, b) => a.id - b.id);
  }

  return (
    <>
      <Head>
        <title>Menu Utama - Dapur Senja</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Pacifico&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <nav className="navbar">
        <div className="logo">Dapur Senja</div>
        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/menu" className="active">
              Menu
            </Link>
          </li>
          <li>
            <Link href="/promo">Promo & Info</Link>
          </li>
          <li>
            <Link href="/booking">Reservation</Link>
          </li>
          <li>
            <Link href="/profile">Account</Link>
          </li>
        </ul>
      </nav>

      <header className="menu-header">
        <h1>Menu Spesial Kami</h1>
        <p>Jelajahi hidangan terbaik dari koki kami</p>
      </header>

      <div className="controls-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Cari makanan atau minuman..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="sort-box">
          <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="default">Urutkan: Default</option>
            <option value="lowest">Harga: Termurah</option>
            <option value="highest">Harga: Termahal</option>
          </select>
        </div>
      </div>

      <div className="filter-container">
        <button
          className={`filter-btn ${currentCategory === "all" ? "active" : ""}`}
          onClick={() => setCurrentCategory("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${currentCategory === "appetizer" ? "active" : ""}`}
          onClick={() => setCurrentCategory("appetizer")}
        >
          Appetizer
        </button>
        <button
          className={`filter-btn ${currentCategory === "main-course" ? "active" : ""}`}
          onClick={() => setCurrentCategory("main-course")}
        >
          Main Course
        </button>
        <button
          className={`filter-btn ${currentCategory === "dessert" ? "active" : ""}`}
          onClick={() => setCurrentCategory("dessert")}
        >
          Dessert
        </button>
        <button
          className={`filter-btn ${currentCategory === "drinks" ? "active" : ""}`}
          onClick={() => setCurrentCategory("drinks")}
        >
          Drinks
        </button>
      </div>

      {totalOrders > 0 && (
        <div className="order-summary-bar">
          <span>
            Pesanan Dipilih: <strong>{totalOrders}</strong> item
          </span>
          <button onClick={handleOpenConfirm}>Pesan</button>
        </div>
      )}

      <main className="menu-container" style={{ minHeight: "60vh" }}>
        {isLoading ? (
          <div className="empty-state">Memuat hidangan spesial...</div>
        ) : filteredData.length === 0 ? (
          <div className="empty-state">Maaf, menu yang Anda cari tidak ditemukan.</div>
        ) : (
          filteredData.map((item) => (
            <div key={item.id} className="menu-card">
              {item.rating >= 4.8 && <span className="recommended-badge">🔥 Top Rating</span>}
              <Link href={`/menu/${item.id}`} passHref className="menu-card-link">
                <div className="menu-card-clickable">
                  <img src={`/${item.image}`} alt={item.name} loading="lazy" />
                  <div className="menu-info">
                    <h3>{item.name}</h3>
                    <p className="price">{formatRupiah(item.price)}</p>
                    <p className="rating">⭐ {item.rating}</p>
                    <div className="card-footer">
                      <span>{item.category.replace("-", " ")}</span>
                      <button
                        className="order-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOrder(item);
                        }}
                      >
                        + Pesan
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </main>

      <button
        id="back-to-top"
        title="Kembali ke atas"
        style={{ display: showBackToTop ? "block" : "none" }}
        onClick={scrollToTop}
      >
        ↑
      </button>

      <div className={`toast-notification ${showToast ? "show" : ""}`}>
        <div className="toast-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div>
          <p className="toast-title">Berhasil Ditambahkan!</p>
          <p className="toast-message">{toastItem} masuk ke pesanan Anda.</p>
        </div>
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="confirm-modal-box">
            <div className="confirm-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h3 className="confirm-title">Konfirmasi Pesanan</h3>
            <p className="confirm-text" style={{ marginBottom: "16px" }}>
              Berikut adalah daftar hidangan yang Anda pilih:
            </p>
            <div className="confirm-order-list">
              <div className="confirm-items-scroll">
                {orderItems.map((order) => (
                  <div key={order.id} className="confirm-order-item">
                    <div className="confirm-item-info">
                      <span className="confirm-item-qty">{order.qty}x</span>
                      <span className="confirm-item-name">{order.name}</span>
                    </div>
                    <span className="confirm-item-price">
                      {formatRupiah(order.price * order.qty)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="confirm-order-total">
                <span>Total Harga ({totalOrders} item)</span>
                <strong>{formatRupiah(totalPrice)}</strong>
              </div>
            </div>
            <div className="confirm-actions">
              <button onClick={() => setShowConfirmModal(false)} className="btn-cancel">
                Batal
              </button>
              <button onClick={handleConfirmCheckout} className="btn-confirm">
                Ya, Pesan
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay dark">
          <div className="success-modal-box">
            <div className="success-header">
              <div className="success-logo">Dapur Senja</div>
              <div className="success-subtitle">Authentic Culinary & Warmth</div>
            </div>
            <div className="success-body">
              <div className="success-badge">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 className="success-title">Terima Kasih!</h2>
              <p className="success-status">✦ Pesanan Anda Sedang Disiapkan ✦</p>
              <div className="success-summary">
                <span className="summary-label">Ringkasan Pembayaran ({confirmedCount} Hidangan)</span>
                <span className="summary-total">{formatRupiah(confirmedTotal)}</span>
              </div>
              <p className="success-quote">
                &ldquo;Setiap hidangan kami racik dengan sepenuh hati untuk menemani hangatnya momen Anda di Dapur Senja. Mohon tunggu sejenak, pesanan akan segera kami sajikan.&rdquo;
              </p>
              <button onClick={() => setShowSuccessModal(false)} className="btn-finish">
                Selesai & Kembali ke Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}