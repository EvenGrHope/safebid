"use client";

import Link from "next/link";
import ProductSelector from "./components/ProductSelector";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-28"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 items-center px-6 gap-10">
          {/* Venstre side */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Få forsikringstilbud fra flere rådgivere – på én gang
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              Spar tid og penger ved å la erfarne rådgivere konkurrere om å gi deg
              det beste tilbudet – helt uforpliktende.
            </p>
            <Link
              href="/forsikringer"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              Få tilbud nå
            </Link>
          </div>

          {/* Høyre side - ProductSelector */}
          <div className="bg-white/95 p-8 rounded-2xl shadow-lg border border-gray-100">
            <ProductSelector />
          </div>
        </div>
      </section>

      {/* Hvordan det fungerer */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Slik fungerer <span className="text-blue-700">SafeBid</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            Vi gjør det enkelt å få de beste forsikringstilbudene. Du fyller ut ett
            skjema – vi sender det til flere rådgivere som konkurrerer om å gi deg
            det beste tilbudet.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                ikon: "📝",
                tittel: "1. Fyll ut skjemaet",
                tekst:
                  "Velg hvilke forsikringer du ønsker tilbud på, og legg igjen kontaktinformasjonen din. Det tar under 2 minutter.",
              },
              {
                ikon: "📤",
                tittel: "2. Vi sender forespørselen",
                tekst:
                  "Din forespørsel sendes trygt og automatisk til flere erfarne rådgivere – helt uforpliktende.",
              },
              {
                ikon: "💬",
                tittel: "3. Du mottar tilbud",
                tekst:
                  "Sammenlign pris, dekning og betingelser. Velg det tilbudet som passer best for deg.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-10 flex flex-col items-center text-center"
              >
                <div className="bg-blue-100 text-blue-700 w-16 h-16 flex items-center justify-center rounded-full text-3xl mb-6">
                  {item.ikon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {item.tittel}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {item.tekst}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/forsikringer"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
            >
              Få tilbud nå
            </Link>
          </div>
        </div>
      </section>

      {/* Fordeler */}
      <section className="py-20 bg-blue-50 border-t border-blue-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Derfor velger kunder <span className="text-blue-700">SafeBid</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                ikon: "🤝",
                tittel: "Trygg prosess",
                tekst:
                  "Vi samarbeider kun med autoriserte forsikringsrådgivere. Ingen kjøp, kun uforpliktende tilbud.",
              },
              {
                ikon: "⚡",
                tittel: "Rask og enkel",
                tekst:
                  "Du bruker under 2 minutter på å fylle ut skjemaet – vi gjør resten.",
              },
              {
                ikon: "💰",
                tittel: "Spar penger",
                tekst:
                  "Når flere rådgivere konkurrerer om deg, får du bedre dekning og lavere pris.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-10"
              >
                <div className="text-4xl mb-4">{item.ikon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {item.tittel}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Samarbeid */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm mb-4">
            Samarbeid med autoriserte rådgivere fra ledende forsikringsselskaper:
          </p>
          <div className="flex flex-wrap justify-center gap-8 grayscale opacity-80">
            <img src="/tryg-logo.png" alt="Tryg" className="h-10" />
            <img src="/storebrand-logo.png" alt="Storebrand" className="h-10" />
            <img src="/gjensidige-logo.png" alt="Gjensidige" className="h-10" />
          </div>
        </div>
      </section>

      {/* Guider */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Forsikringsguider
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Lær hvordan du får mest mulig igjen for forsikringen din – og hva som
            faktisk påvirker prisen. Våre guider hjelper deg å ta trygge og smarte valg.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                bilde: "/guide-bil.jpg",
                tittel: "Guide til bilforsikring",
                tekst:
                  "Forstå bonus, egenandel og dekninger før du velger bilforsikring.",
              },
              {
                bilde: "/guide-hus.jpg",
                tittel: "Guide til hus- og innboforsikring",
                tekst:
                  "Hvordan sikrer du hjemmet ditt riktig – og unngår over- eller underforsikring?",
              },
              {
                bilde: "/guide-reise.jpg",
                tittel: "Guide til reiseforsikring",
                tekst:
                  "Når dekker forsikringen egentlig skader, avbestilling og bagasje?",
              },
            ].map((guide, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <img
                  src={guide.bilde}
                  alt={guide.tittel}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {guide.tittel}
                  </h3>
                  <p className="text-gray-600 mb-4">{guide.tekst}</p>
                  <Link
                    href="/blogg"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Les mer →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/blogg"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Se alle guider
            </Link>
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
            Fyll ut ett skjema – få tilbud fra flere rådgivere – og velg det som passer deg best.
          </p>
          <Link
            href="/forsikringer"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Start nå
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm bg-gray-50 border-t">
        <p>© {new Date().getFullYear()} Safebid. Alle rettigheter forbeholdt.</p>
        <p className="mt-2">Personvern | Kontakt | Om oss</p>
      </footer>
    </main>
  );
}
