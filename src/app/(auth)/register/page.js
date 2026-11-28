"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import Field from "@/components/Field";
import Button from "@/components/Button";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function validate() {
    const e = {};
    if (form.name.trim().length < 3) e.name = "Nama minimal 3 karakter.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Masukkan email yang valid.";
    if (!/^(\+62|62|0)8\d{8,11}$/.test(form.phone.replace(/[\s-]/g, "")))
      e.phone = "Gunakan nomor HP Indonesia, contoh 081234567890.";
    if (form.password.length < 8) e.password = "Password minimal 8 karakter.";
    if (form.confirm !== form.password) e.confirm = "Konfirmasi password tidak sama.";
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setServerError("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    try {
      const { name, email, phone, password } = form;
      await api.register({ name: name.trim(), email, phone, password });
      router.push("/login");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Buat akun baru"
      subtitle="Daftar sekali, pesan kapan saja."
      footer={
        <>
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-leaf underline underline-offset-4 hover:text-forest">
            Masuk
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {serverError && (
          <p role="alert" className="rounded-lg border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">
            {serverError}
          </p>
        )}
        <Field label="Nama lengkap" name="name" autoComplete="name" value={form.name}
          onChange={onChange} error={errors.name} />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="nama@email.com"
          value={form.email} onChange={onChange} error={errors.email} />
        <Field label="Nomor HP" name="phone" type="tel" autoComplete="tel" placeholder="081234567890"
          value={form.phone} onChange={onChange} error={errors.phone} />
        <Field label="Password" name="password" type="password" autoComplete="new-password"
          hint="Minimal 8 karakter." value={form.password} onChange={onChange} error={errors.password} />
        <Field label="Ulangi password" name="confirm" type="password" autoComplete="new-password"
          value={form.confirm} onChange={onChange} error={errors.confirm} />
        <Button type="submit" loading={loading} className="w-full">Buat akun</Button>
      </form>
    </AuthShell>
  );
}
