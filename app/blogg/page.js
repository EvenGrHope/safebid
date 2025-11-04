"use client";

import Link from "next/link";
import { BookOpen, PenLine, Newspaper } from "lucide-react";

export default function BlogPage() {
  const articles = [
    {
      bilde: "/guide-bil.jpg",
      tittel: "Hva påvirker prisen på bilforsikring?",
      tekst:
        "Lær hva som gjør at prisen på bilforsikring varierer mellom selskaper, og hvordan du kan spare penger uten å miste viktige dekninger.",
      kategori: "Bilforsikring",
    },
    {
      bilde: "/guide-hus.jpg",
      tittel: "5 tips for billigere husforsikring",
      tekst:
        "Små justeringer kan gi store besparelser. Vi forklarer hvordan du får lavere premie uten å redusere tryggheten.",
      kategori: "Hus og innbo",
    },
    {
      bilde: "/guide-reise.jpg",
      tittel: "Når bør du bytte forsikringsselskap?",
      tekst:
        "Et nytt selskap kan ofte gi bedre vilkår eller pris. Her er tegnene på at du bør se deg om etter et nytt tilbud.",
      kategori: "Generelt",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-28"
        style={{
          backgroundImage: "url('/blog-hero.jpg')", // legg gjerne inn et lyst, profesjonelt bilde i /public
        }}
      >
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Forsikrings<span className="text-blue-700">bloggen</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Les våre guider, tips og artikler om hvordan du får mest mulig igjen
            for forsikringen din – og unngår vanlige feil.
          </p>
        </div>
      </section>

      {/* Artikler */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50 border-t border-blue-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Nyeste artikler
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Oppdaterte råd fra erfarne forsikringsrådgivere og økonomer.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {articles.map((artikkel, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <img
                  src={artikkel.bilde}
                  alt={artikkel.tittel}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-medium mb-2">
                    {artikkel.kategori}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {artikkel.tittel}
                  </h3>
                  <p className="text-gray-600 mb-4">{artikkel.tekst}</p>
                  <Link
                    href="#"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Les mer →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategorier / Guider */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Utforsk temaer
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Dykk dypere inn i temaene som interesserer deg mest.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                ikon: <BookOpen className="text-blue-700" size={32} />,
                tittel: "Guider",
                tekst:
                  "Trinn-for-trinn veiledninger som hjelper deg å forstå dekninger, vilkår og valg av forsikring.",
              },
              {
                ikon: <PenLine className="text-blue-700" size={32} />,
                tittel: "Eksperttips",
                tekst:
                  "Praktiske råd og økonomiske vurderinger fra forsikringsrådgivere og analytikere.",
              },
              {
                ikon: <Newspaper className="text-blue-700" size={32} />,
                tittel: "Nyheter",
                tekst:
                  "Hold deg oppdatert på endringer i markedet, lover og regler som påvirker forsikring.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition p-10 text-center"
              >
                <div className="flex justify-center mb-5">{item.ikon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {item.tittel}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vil du motta våre beste forsikringstips?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Meld deg på vårt nyhetsbrev og få eksklusive guider, analyser og
            tilbud rett i innboksen.
          </p>
          <Link
            href="/kontakt"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Kontakt oss
          </Link>
        </div>
      </section>
      
    </main>
  );
}
