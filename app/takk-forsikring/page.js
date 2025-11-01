"use client";

import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function TakkForsikringPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-center items-center px-6 py-20 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 max-w-xl">
        <div className="flex justify-center mb-6">
          <ShieldCheck className="text-blue-600" size={64} />
        </div>

        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Takk for forespørselen!
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Vi har mottatt din forespørsel og sender den nå videre til våre
          samarbeidende forsikringsrådgivere.
          <br />
          <br />
          Du blir kontaktet så snart som mulig med personlige tilbud – vanligvis
          innen én virkedag.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Tilbake til forsiden
          </Link>
          <Link
            href="/blogg"
            className="text-blue-700 hover:text-blue-900 font-medium"
          >
            Les våre guider →
          </Link>
        </div>
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} Safebid. Alle rettigheter forbeholdt.
      </footer>
    </main>
  );
}
