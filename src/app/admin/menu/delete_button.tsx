"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, name }: { id: number; name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus menu "${name}"?`)) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/menus/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Menu berhasil dihapus!");
          router.refresh(); 
        } else {
          alert("Gagal menghapus menu.");
          setIsDeleting(false);
        }
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan sistem.");
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="btn btn-sm btn-outline-danger"
      style={{ borderRadius: "6px" }}
    >
      {isDeleting ? "Menghapus..." : "Hapus"}
    </button>
  );
}