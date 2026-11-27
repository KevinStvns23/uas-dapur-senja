import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import SmoothScroll from "./SmoothScroll";

export const metadata: Metadata = {
  title: "Dapur Senja",
  description: "UAS Front-End Programming",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}