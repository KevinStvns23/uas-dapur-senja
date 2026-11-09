"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const subLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function SubNavbar() {
    const pathname = usePathname();

    return (
        <nav className="sub-navbar" aria-label="Navigasi halaman Dapur Senja">
            <div className="sub-nav-menu">
                {subLinks.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`sub-nav-link ${
                            pathname === item.href ? "active" : ""
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
