import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import DeleteButton from "./delete_button";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const menus = await prisma.menu.findMany({
    orderBy: {
      id: "desc",
    },
  });

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "40px 0" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="container" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: "#2c1e16" }}>Manajemen Menu</h2>
            <p className="text-muted mb-0">Kelola daftar menu Dapur Senja</p>
          </div>
          
          <Link 
            href="/admin/menu/create" 
            className="btn shadow-sm"
            style={{ backgroundColor: "#d97706", color: "white", fontWeight: "600", borderRadius: "8px", padding: "10px 20px" }}
          >
            + Tambah Menu Baru
          </Link>
        </div>

        <div className="card border-0 shadow-sm" style={{ borderRadius: "16px", overflow: "hidden" }}>
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead style={{ backgroundColor: "#f3f4f6" }}>
                <tr>
                  <th className="py-3 px-4 border-0" style={{ color: "#4b5563", fontWeight: "600" }}>No</th>
                  <th className="py-3 px-4 border-0" style={{ color: "#4b5563", fontWeight: "600" }}>Gambar</th>
                  <th className="py-3 px-4 border-0" style={{ color: "#4b5563", fontWeight: "600" }}>Nama Menu</th>
                  <th className="py-3 px-4 border-0" style={{ color: "#4b5563", fontWeight: "600" }}>Kategori</th>
                  <th className="py-3 px-4 border-0" style={{ color: "#4b5563", fontWeight: "600" }}>Harga</th>
                  <th className="py-3 px-4 border-0 text-center" style={{ color: "#4b5563", fontWeight: "600" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {menus.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-5 text-muted">
                      Belum ada data menu. Silakan tambah menu baru.
                    </td>
                  </tr>
                ) : (
                  menus.map((menu, index) => (
                    <tr key={menu.id}>
                      <td className="px-4 text-muted">{index + 1}</td>
                      <td className="px-4 py-3">
                        <div style={{ width: "60px", height: "60px", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f3f4f6" }}>
                          <img 
                            src={`/${menu.image}`} 
                            alt={menu.name} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                          />
                        </div>
                      </td>
                      <td className="px-4 fw-semibold" style={{ color: "#2c1e16" }}>{menu.name}</td>
                      <td className="px-4 text-capitalize">
                        <span className="badge" style={{ backgroundColor: "#ffeedb", color: "#d97706" }}>
                          {menu.category.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-4 fw-semibold" style={{ color: "#4a3b32" }}>
                        {formatRupiah(menu.price)}
                      </td>
                      <td className="px-4">
                        <div className="d-flex justify-content-center gap-2">
                          <Link 
                            href={`/admin/menu/edit/${menu.id}`}
                            className="btn btn-sm btn-outline-primary"
                            style={{ borderRadius: "6px" }}
                          >
                            Edit
                          </Link>
                          
                          <DeleteButton id={menu.id} name={menu.name} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}