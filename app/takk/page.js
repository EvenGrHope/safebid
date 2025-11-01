"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function TakkPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-center items-center px-6 py-20 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 max-w-xl">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500" size={64} />
        </div>

        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Takk for meldingen!
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Vi har mottatt henvendelsen din og vil ta kontakt så snart som mulig.
          Vanlig svartid er innen én virkedag.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Tilbake til forsiden
          </Link>
          <Link
            href="/forsikringer"
            className="text-blue-700 hover:text-blue-900 font-medium"
          >
            Få tilbud på forsikring →
          </Link>
        </div>
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} Safebid. Alle rettigheter forbeholdt.
      </footer>
    </main>
  );
}
