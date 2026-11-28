import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });

export const metadata = {
  title: "Dapur Senja",
  description: "Masuk atau daftar akun Dapur Senja.",
};

export default function AuthLayout({ children }) {
  return (
    <div className={`${bricolage.variable} ${dm.variable} min-h-screen bg-paper font-sans text-ink antialiased`}>
      {children}
    </div>
  );
}
