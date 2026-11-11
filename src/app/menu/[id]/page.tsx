import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import OrderButton from "./order_button";

export default async function DetailMenu({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const menu = await prisma.menu.findUnique({
    where: {
      id: Number(resolvedParams.id),
    },
  });

  if (!menu) {
    notFound();
  }

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div style={{ backgroundColor: "#fcf9f2", minHeight: "100vh", padding: "50px 0" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      
      <div className="container">
        <Link 
          href="/menu" 
          style={{ 
            textDecoration: "none", 
            color: "#8b5a2b", 
            fontWeight: "600", 
            fontSize: "15px", 
            display: "inline-flex", 
            alignItems: "center", 
            marginBottom: "25px",
            fontFamily: "'Inter', sans-serif"
          }}
        >
          <span style={{ marginRight: "8px", fontSize: "20px", lineHeight: "1" }}>&larr;</span> Kembali ke Menu
        </Link>
        
        <div className="card border-0 shadow-sm" style={{ borderRadius: "24px", overflow: "hidden", backgroundColor: "#fff" }}>
          <div className="row g-0">
            <div className="col-md-6">
              <div style={{ height: "100%", minHeight: "500px", position: "relative" }}>
                <img 
                  src={`/${menu.image}`} 
                  alt={menu.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} 
                />
              </div>
            </div>
            <div className="col-md-6 d-flex flex-column" style={{ padding: "50px", fontFamily: "'Inter', sans-serif" }}>
              <div className="mb-4 d-flex gap-3 align-items-center">
                <span style={{ backgroundColor: "#ffeedb", color: "#d97706", padding: "6px 14px", fontSize: "13px", borderRadius: "8px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#d97706"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>
                  {menu.rating} / 5.0
                </span>
                <span style={{ color: "#8b5a2b", fontSize: "14px", fontWeight: "500", textTransform: "capitalize", borderLeft: "1px solid #e5e7eb", paddingLeft: "15px" }}>
                  {menu.category.replace("-", " ")}
                </span>
              </div>
              
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: "700", color: "#2c1e16", fontSize: "2.8rem", marginBottom: "8px", lineHeight: "1.2" }}>
                {menu.name}
              </h1>
              
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "25px" }}>
                <span style={{ color: "#6b5c53", fontSize: "16px", fontWeight: "500" }}>Harga:</span>
                <h2 style={{ color: "#d97706", fontWeight: "700", fontSize: "2.2rem", margin: "0" }}>
                  {formatRupiah(menu.price)}
                </h2>
              </div>

              <hr style={{ borderTop: "2px dashed #e5e7eb", opacity: "1", margin: "0 0 25px 0" }} />
              
              <div style={{ flexGrow: 1 }}>
                <h5 style={{ fontWeight: "600", color: "#2c1e16", marginBottom: "12px", fontSize: "1.1rem" }}>
                  Informasi Hidangan
                </h5>
                <p style={{ color: "#5a4d44", lineHeight: "1.8", fontSize: "1.05rem", marginBottom: "40px" }}>
                  {menu.desc}
                </p>
              </div>
              
              <OrderButton itemName={menu.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}