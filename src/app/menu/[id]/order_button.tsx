"use client";

import { useState, useEffect } from "react";

export default function OrderButton({ itemName }: { itemName: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const handleOrder = () => {
    setIsClicked(true);
    const savedOrders = localStorage.getItem("restaurantOrders");
    const currentTotal = savedOrders ? parseInt(savedOrders, 10) : 0;
    const newTotal = currentTotal + 1;
    
    localStorage.setItem("restaurantOrders", newTotal.toString());
    
    setTimeout(() => {
      setIsClicked(false);
      setShowToast(true);
    }, 300);
  };

  return (
    <>
      <button 
        onClick={handleOrder}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="btn w-100" 
        style={{ 
          backgroundColor: isHovered ? "#b45f06" : "#d97706", 
          color: "#fff", 
          padding: "16px 20px", 
          fontSize: "1.2rem", 
          fontWeight: "bold", 
          borderRadius: "14px", 
          border: "none", 
          boxShadow: isHovered 
            ? "0 12px 24px rgba(217, 119, 6, 0.5)" 
            : "0 8px 20px rgba(217, 119, 6, 0.3)",
          transform: isClicked ? "scale(0.95)" : isHovered ? "scale(1.02) translateY(-2px)" : "scale(1)",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px"
        }}
      >
        <span style={{ fontSize: "1.4rem", lineHeight: "1" }}>+</span> 
        <span>Tambah ke Pesanan</span>
      </button>

      <div 
        style={{
          position: "fixed",
          top: "90px",
          right: showToast ? "30px" : "-100%",
          opacity: showToast ? 1 : 0,
          backgroundColor: "#2c1e16",
          color: "#fff",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
          zIndex: 9999,
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <div style={{ 
          backgroundColor: "#d97706", 
          borderRadius: "50%", 
          width: "28px", 
          height: "28px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center" 
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "15px", color: "#fff" }}>Berhasil Ditambahkan!</p>
          <p style={{ margin: 0, fontSize: "13px", color: "#d1d5db" }}>{itemName} masuk ke pesanan Anda.</p>
        </div>
      </div>
    </>
  );
}