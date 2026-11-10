"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

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

export default function MenuPage() {
  const [menuData, setMenuData] = useState<Menu[]>([]);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("default");
  const [totalOrders, setTotalOrders] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem("restaurantOrders");
    if (savedOrders) {
      setTotalOrders(parseInt(savedOrders, 10));
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
      }
    }
    loadDataFromAPI();
  }, []);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleOrder = (itemName: string) => {
    const newTotal = totalOrders + 1;
    setTotalOrders(newTotal);
    localStorage.setItem("restaurantOrders", newTotal.toString());
    alert(`Berhasil menambahkan "${itemName}" ke pesanan!`);
  };

  const handleCheckout = () => {
    alert(`Terima kasih! Total ada ${totalOrders} item yang akan diproses.`);
    setTotalOrders(0);
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
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <nav className="navbar">
        <div className="logo">Dapur Senja</div>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/menu" className="active">
              Menu
            </a>
          </li>
          <li>
            <a href="/promo">Promo & Info</a>
          </li>
          <li>
            <a href="/booking">Reservation</a>
          </li>
          <li>
            <a href="/profile">Account</a>
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
          <button onClick={handleCheckout}>Pesan</button>
        </div>
      )}

      <main className="menu-container">
        {filteredData.length === 0 ? (
          <div className="empty-state">Maaf, menu yang Anda cari tidak ditemukan.</div>
        ) : (
          filteredData.map((item) => (
            <div key={item.id} className="menu-card">
              {item.rating >= 4.8 && <span className="recommended-badge">🔥 Top Rating</span>}
              <a href={`/menu/${item.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <img src={`/${item.image}`} alt={item.name} />
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
                        handleOrder(item.name);
                      }}
                    >
                      + Pesan
                    </button>
                  </div>
                </div>
              </a>
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
    </>
  );
}