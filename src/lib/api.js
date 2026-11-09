// Semua pemanggilan backend lewat sini.
// NEXT_PUBLIC_USE_MOCK=true  -> pakai data palsu di localStorage (buat demo front end dulu)
// NEXT_PUBLIC_USE_MOCK=false -> panggil API route Next.js yang terhubung ke database
const MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";
const BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

export const session = {
  get token() {
    try { return localStorage.getItem("ds_token"); } catch { return null; }
  },
  set(token) { localStorage.setItem("ds_token", token); },
  clear() { localStorage.removeItem("ds_token"); },
};

function fail(message, status = 400) {
  const err = new Error(message);
  err.status = status;
  return err;
}

async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(session.token ? { Authorization: `Bearer ${session.token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw fail(data.message || "Terjadi kesalahan. Coba lagi.", res.status);
  return data;
}

/* ---------- Mock (sementara, sebelum database siap) ---------- */
const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));
const users = () => JSON.parse(localStorage.getItem("ds_mock_users") || "[]");
const saveUsers = (u) => localStorage.setItem("ds_mock_users", JSON.stringify(u));
const strip = ({ password, ...rest }) => rest;

const mock = {
  async register({ name, email, phone, password }) {
    await wait();
    const list = users();
    if (list.some((u) => u.email === email)) throw fail("Email sudah terdaftar. Coba masuk.", 409);
    list.push({ name, email, phone, password, address: "" });
    saveUsers(list);
    return { message: "Akun berhasil dibuat" };
  },
  async login({ email, password }) {
    await wait();
    const u = users().find((x) => x.email === email && x.password === password);
    if (!u) throw fail("Email atau password salah.", 401);
    return { token: u.email, user: strip(u) };
  },
  async getProfile() {
    await wait(300);
    const u = users().find((x) => x.email === session.token);
    if (!u) throw fail("Sesi berakhir. Silakan masuk lagi.", 401);
    return strip(u);
  },
  async updateProfile(payload) {
    await wait();
    const list = users();
    const i = list.findIndex((x) => x.email === session.token);
    if (i < 0) throw fail("Sesi berakhir. Silakan masuk lagi.", 401);
    list[i] = { ...list[i], ...payload };
    saveUsers(list);
    return strip(list[i]);
  },
};

/* ---------- Real API ---------- */
const real = {
  register: (p) => request("/auth/register", { method: "POST", body: p }),
  login: (p) => request("/auth/login", { method: "POST", body: p }),
  getProfile: () => request("/profile"),
  updateProfile: (p) => request("/profile", { method: "PUT", body: p }),
};

export const api = MOCK ? mock : real;
