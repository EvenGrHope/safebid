"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 text-center text-gray-500 text-sm bg-gray-50 border-t">
      <p>© {new Date().getFullYear()} Bytteklar.no. Alle rettigheter forbeholdt.</p>
      <div className="mt-2 space-x-4">
        <Link href="/personvern" className="hover:text-gray-700 underline underline-offset-2">
          Personvern
        </Link>
        <span className="text-gray-400">|</span>
        <Link href="/kontakt" className="hover:text-gray-700 underline underline-offset-2">
          Kontakt oss
        </Link>
        <span className="text-gray-400">|</span>
        <Link href="/om-oss" className="hover:text-gray-700 underline underline-offset-2">
          Om oss
        </Link>
      </div>
    </footer>
  );
}
