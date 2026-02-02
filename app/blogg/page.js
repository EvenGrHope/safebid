"use client";

import Link from "next/link";
import { BookOpen, PenLine, Newspaper } from "lucide-react";

export default function BlogPage() {
  const articles = [
    {
      slug: "guide-til-bilforsikring",
      bilde: "/guide-bil.jpg",
      tittel: "Guide til bilforsikring",
      tekst: 
        "Forstå bonus, egenandel og dekninger før du velger bilforsikring.",
    },
    {
      slug: "guide-til-hus-og-innbo",
      bilde: "/guide-hus.jpg",
      tittel: "Guide til hus- og innboforsikring",
      tekst:
        "Hvordan sikrer du hjemmet ditt riktig, og unngår over- eller underforsikring?",
    },
    {
      slug: "guide-til-reiseforsikring",
      bilde: "/guide-reise.jpg",
      tittel: "Guide til reiseforsikring",
      tekst:
        "Når dekker forsikringen egentlig skader, avbestilling og bagasje?",
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
            Forsikrings<span className="text-blue-700">guiden</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Les våre guider, tips og artikler om hvordan du får mest mulig igjen
            for forsikringen din, og unngår vanlige feil.
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
                    href={`/blogg/${artikkel.slug}`}
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
      
      {/* CTA */}
      <section className="py-20 bg-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klar for å se hvor mye du kan spare?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Fyll ut ett skjema, få tilbud fra flere rådgivere, og velg det som passer deg best.
          </p>
          <Link
            href="/forsikringer"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Start nå
          </Link>
        </div>
      </section>

    </main>
  );
}
