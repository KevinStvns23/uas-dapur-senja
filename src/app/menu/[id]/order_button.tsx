"use client";

import { useState } from "react";

export default function OrderButton({ itemName }: { itemName: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleOrder = () => {
    setIsClicked(true);
    const savedOrders = localStorage.getItem("restaurantOrders");
    const currentTotal = savedOrders ? parseInt(savedOrders, 10) : 0;
    const newTotal = currentTotal + 1;
    
    localStorage.setItem("restaurantOrders", newTotal.toString());
    
    // Reset animasi klik setelah 300ms
    setTimeout(() => {
      setIsClicked(false);
      alert(`Berhasil menambahkan "${itemName}" ke pesanan!`);
    }, 300);
  };

  return (
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
  );
}