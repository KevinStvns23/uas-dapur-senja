"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Field from "@/components/Field";
import Button from "@/components/Button";
import { api, session } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!session.token) return router.replace("/login");
    api
      .getProfile()
      .then((u) => {
        setUser(u);
        setForm({ name: u.name || "", phone: u.phone || "", address: u.address || "" });
      })
      .catch((err) => {
        if (err.status === 401) {
          session.clear();
          router.replace("/login");
        } else setStatus({ type: "error", text: err.message });
      });
  }, [router]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const dirty = user && (form.name !== user.name || form.phone !== user.phone || form.address !== (user.address || ""));

  function logout() {
    session.clear();
    router.push("/login");
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setStatus({ type: "", text: "" });
    const e = {};
    if (form.name.trim().length < 3) e.name = "Nama minimal 3 karakter.";
    if (!/^(\+62|62|0)8\d{8,11}$/.test(form.phone.replace(/[\s-]/g, "")))
      e.phone = "Gunakan nomor HP Indonesia, contoh 081234567890.";
    setErrors(e);
    if (Object.keys(e).length) return;

    setSaving(true);
    try {
      const updated = await api.updateProfile({ ...form, name: form.name.trim() });
      setUser(updated);
      setStatus({ type: "ok", text: "Perubahan tersimpan." });
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  const initials = (user?.name || "?")
    .split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

  return (
    <div className="min-h-screen">
      <header className="border-b-4 border-sun bg-forest text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-xl font-bold tracking-tight">Dapur Senja</Link>
          <Button variant="ghost" onClick={logout} className="!border-white/40 !py-2 text-white hover:!bg-white/10">
            Keluar
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {!user && !status.text ? (
          <p className="text-ink/60" role="status">Memuat profil...</p>
        ) : (
          <div className="grid gap-10 md:grid-cols-[240px_1fr]">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div
                aria-hidden="true"
                className="flex h-28 w-28 items-center justify-center rounded-full bg-leaf font-display text-4xl font-bold text-white ring-4 ring-sun ring-offset-4 ring-offset-paper"
              >
                {initials}
              </div>
              <h1 className="mt-6 font-display text-2xl font-bold text-forest">{user?.name}</h1>
              <p className="mt-1 break-all text-ink/65">{user?.email}</p>
            </div>

            <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-forest/15 bg-white p-6 md:p-8">
              <div>
                <h2 className="font-display text-xl font-bold text-forest">Data diri</h2>
                <p className="mt-1 text-sm text-ink/65">Alamat ini dipakai sebagai tujuan antar pesananmu.</p>
              </div>

              {status.text && (
                <p
                  role={status.type === "error" ? "alert" : "status"}
                  className={`rounded-lg px-4 py-3 text-sm ${
                    status.type === "error"
                      ? "border border-ember/40 bg-ember/10 text-ember"
                      : "border border-leaf/40 bg-leaf/10 text-forest"
                  }`}
                >
                  {status.text}
                </p>
              )}

              <Field label="Nama lengkap" name="name" value={form.name} onChange={onChange} error={errors.name} />
              <Field label="Email" name="email" value={user?.email || ""} readOnly hint="Email tidak bisa diubah." />
              <Field label="Nomor HP" name="phone" type="tel" value={form.phone} onChange={onChange} error={errors.phone} />
              <div>
                <label htmlFor="field-address" className="mb-1.5 block text-sm font-medium text-forest">
                  Alamat antar
                </label>
                <textarea
                  id="field-address"
                  name="address"
                  rows={3}
                  value={form.address}
                  onChange={onChange}
                  placeholder="Jalan, nomor rumah, kelurahan, kota"
                  className="w-full rounded-lg border border-forest/20 bg-white px-4 py-3 outline-none transition-colors placeholder:text-ink/35 focus:border-leaf focus:ring-2 focus:ring-leaf/25"
                />
              </div>

              <Button type="submit" variant="green" loading={saving} disabled={!dirty}>
                Simpan perubahan
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
