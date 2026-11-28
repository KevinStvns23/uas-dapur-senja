"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import Field from "@/components/Field";
import Button from "@/components/Button";
import { api, session } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function validate() {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Masukkan email yang valid.";
    if (!form.password) e.password = "Password wajib diisi.";
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
      const { token } = await api.login(form);
      session.set(token);
      router.push("/profile");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Masuk ke Dapur Senja"
      subtitle="Lanjutkan pesananmu dengan akun yang sudah ada."
      footer={
        <>
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-leaf underline underline-offset-4 hover:text-forest">
            Daftar sekarang
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
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="nama@email.com"
          value={form.email} onChange={onChange} error={errors.email} />
        <Field label="Password" name="password" type="password" autoComplete="current-password"
          value={form.password} onChange={onChange} error={errors.password} />
        <Button type="submit" loading={loading} className="w-full">Masuk</Button>
      </form>
    </AuthShell>
  );
}
