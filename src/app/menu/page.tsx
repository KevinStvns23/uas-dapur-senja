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

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background-color: #f8f9fa;
          color: #333;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 1rem 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 1.5rem;
        }

        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: bold;
          transition: color 0.3s;
        }

        .nav-links a.active,
        .nav-links a:hover {
          color: #ff9800;
        }

        .menu-header {
          text-align: center;
          padding: 4rem 1rem;
          background: linear-gradient(135deg, #ff9800, #ff5722);
          color: white;
        }

        .controls-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          padding: 2rem 5% 0;
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .search-box input,
        .sort-box select {
          padding: 0.8rem 1.5rem;
          border: 1px solid #ccc;
          border-radius: 25px;
          outline: none;
          font-size: 1rem;
          width: 250px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .search-box input:focus,
        .sort-box select:focus {
          border-color: #ff9800;
          box-shadow: 0 0 8px rgba(255, 152, 0, 0.3);
        }

        .filter-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          padding: 1.5rem 5% 2rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.6rem 1.5rem;
          border: none;
          border-radius: 25px;
          background-color: #e0e0e0;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: bold;
          font-size: 1rem;
        }

        .filter-btn.active,
        .filter-btn:hover {
          background-color: #ff9800;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(255, 152, 0, 0.3);
        }

        .menu-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          padding: 0 5% 3rem;
          max-width: 1200px;
          margin: 0 auto;
          min-height: 400px;
        }

        .menu-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
          animation: fadeIn 0.5s ease-in-out forwards;
          position: relative;
        }

        .menu-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .menu-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .menu-info {
          padding: 1.5rem;
        }

        .menu-info h3 {
          margin-bottom: 0.5rem;
          font-size: 1.3rem;
        }

        .price {
          color: #ff9800;
          font-weight: bold;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .rating {
          font-size: 0.9rem;
          color: #666;
        }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          color: #666;
          font-size: 1.2rem;
        }

        .order-summary-bar {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #333;
          color: white;
          padding: 1rem 2rem;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          animation: bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .order-summary-bar button {
          background-color: #ff9800;
          color: white;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .order-summary-bar button:hover {
          background-color: #e68900;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }

        .order-btn {
          background-color: #fff3e0;
          color: #ff9800;
          border: 1px solid #ff9800;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }

        .order-btn:hover {
          background-color: #ff9800;
          color: white;
        }

        @keyframes bounceIn {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .recommended-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #e91e63, #ff5722);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
          z-index: 10;
          letter-spacing: 0.5px;
        }

        #back-to-top {
          position: fixed;
          bottom: 90px;
          right: 20px;
          display: none;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          z-index: 999;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        #back-to-top:hover {
          background-color: #ff9800;
          transform: translateY(-5px);
        }

        .logo {
          font-family: "Pacifico", cursive;
          font-size: 2.2rem;
          font-weight: normal;
          color: #333;
          cursor: pointer;
        }

        .menu-header h1 {
          font-family: "Playfair Display", serif;
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          margin-bottom: 10px;
          color: #ffffff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .menu-header p {
          font-size: 1.2rem;
          font-weight: 300;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .controls-container {
            flex-direction: column;
            align-items: center;
          }

          .search-box input,
          .sort-box select {
            width: 100%;
            max-width: 350px;
          }
        }
      `}</style>

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