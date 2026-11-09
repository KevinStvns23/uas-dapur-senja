import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import MainNavbar from "./components/MainNavbar";

export const metadata: Metadata = {
    title: "Dapur Senja",
    description: "Sajian penuh rasa dalam suasana hangat di Dapur Senja.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <MainNavbar />
                {children}
            </body>
        </html>
    );
}
