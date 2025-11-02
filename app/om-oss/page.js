"use client";

import { Shield, Users, Handshake, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-28"
        style={{
          backgroundImage: "url('/about-bg.jpg')", // legg gjerne inn et lyst, profesjonelt bilde
        }}
      >
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Om <span className="text-blue-700">BytteKlar.no</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Bytteklar.no er en norsk anbudstjeneste som gjør det enkelt for deg å sammenligne
            forsikringstilbud fra flere selskaper – raskt, trygt og helt
            uforpliktende.
          </p>
        </div>
      </section>

      {/* Visjon og verdier */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50 border-t border-blue-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Vår visjon og verdier
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            Vi tror på transparens, konkurranse og trygghet. Bytteklar.no skal gjøre
            det enklere å ta gode beslutninger og spare penger på forsikringene – uansett om du eier bolig, bil
            eller skal ut på reise. 
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                ikon: <Shield className="text-blue-700" size={32} />,
                tittel: "Trygghet først",
                tekst: "Vi samarbeider kun med autoriserte forsikringsrådgivere, slik at du alltid får profesjonell veiledning.",
              },
              {
                ikon: <Handshake className="text-blue-700" size={32} />,
                tittel: "Rettferdig konkurranse",
                tekst: "Ved å la rådgivere konkurrere om deg, får du bedre pris og bedre dekning – helt uforpliktende.",
              },
              {
                ikon: <Target className="text-blue-700" size={32} />,
                tittel: "Enkel og effektiv",
                tekst: "Vi kutter unødvendige prosesser og gir deg en rask vei til de beste tilbudene på markedet.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-10"
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

      {/* Hvem vi er */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Hvem vi er</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Bytteklar.no er utviklet av mennesker med bakgrunn fra både økonomi,
            forsikring og teknologi. Vi ønsker å gi kundene makten tilbake – og
            gjøre forsikring enklere, mer transparent og konkurransedyktig.
          </p>
          <div className="flex justify-center">
            <Users className="text-blue-700" size={40} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Vil du vite mer?</h2>
          <p className="text-lg mb-8 opacity-90">
            Ta kontakt med oss for samarbeid, presse eller spørsmål om
            tjenesten.
          </p>
          <Link
            href="/kontakt"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Kontakt oss
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm bg-gray-50 border-t">
        <p>© {new Date().getFullYear()} Bytteklar.no. Alle rettigheter forbeholdt.</p>
        <div className="mt-2 space-x-4">
          <Link href="/personvern" className="hover:text-gray-700 underline underline-offset-2">
            Personvern
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/kontakt" className="hover:text-gray-700 underline underline-offset-2">
            Kontakt
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/om-oss" className="hover:text-gray-700 underline underline-offset-2">
            Om oss
          </Link>
        </div>
      </footer>
    </main>
  );
}