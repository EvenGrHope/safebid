"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Hjem" },
    { href: "/blogg", label: "Blogg" },
    { href: "/om-oss", label: "Om oss" },
    { href: "/kontakt", label: "Kontakt oss" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/safebid-icon.png"
            alt="Safebid logo"
            width={36}
            height={36}
            priority
          />
          <span className="text-xl font-bold text-blue-700">Safebid</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-blue-600 transition ${
                pathname === link.href ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobilmeny knapp */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobilmeny dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col items-center gap-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-700 hover:text-blue-600 transition ${
                  pathname === link.href ? "text-blue-600 font-semibold" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}