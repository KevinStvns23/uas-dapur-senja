"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateMenuPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "main-course",
    desc: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Menu baru berhasil ditambahkan!");
        router.push("/admin/menu");
        router.refresh();
      } else {
        alert("Gagal menambahkan menu.");
        setIsLoading(false);
      }
    } catch (error) {
      alert("Terjadi kesalahan sistem.");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "40px 0" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0" style={{ color: "#2c1e16" }}>Tambah Menu Baru</h2>
          <Link href="/admin/menu" className="btn btn-outline-secondary">
            Batal
          </Link>
        </div>

        <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nama Menu</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Harga (Rp)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Kategori</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="main-course">Main Course</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="dessert">Dessert</option>
                    <option value="beverage">Beverage</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Nama File Gambar (contoh: es-teh.jpg)</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Pastikan file gambar sudah ada di folder public"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Deskripsi</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  className="form-control"
                  rows={4}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn w-100"
                style={{ backgroundColor: "#d97706", color: "white", fontWeight: "bold", padding: "12px", borderRadius: "8px" }}
              >
                {isLoading ? "Menyimpan..." : "Simpan Menu"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}