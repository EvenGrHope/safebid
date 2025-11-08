"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-28"
        style={{
          backgroundImage: "url('/contact-bg.jpg')", // legg gjerne til et lyst, profesjonelt bilde
        }}
      >
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Kontakt <span className="text-blue-700">BytteKlar.no</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Har du spørsmål, ønsker samarbeid, eller vil vite mer om hvordan Bytteklar.no fungerer?
            Vi hører gjerne fra deg.
          </p>
        </div>
      </section>

      {/* Kontaktinformasjon */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50 border-t border-blue-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Ta kontakt med oss
          </h2>

          <div className="grid md:grid-cols-4 gap-10 text-left">
            {[
              {
                ikon: <Mail className="text-blue-700" size={28} />,
                tittel: "E-post",
                tekst: "post@bytteklar.no",
              },
              {
                ikon: <Phone className="text-blue-700" size={28} />,
                tittel: "Telefon",
                tekst: "+47 400 12 345",
              },
              {
                ikon: <MapPin className="text-blue-700" size={28} />,
                tittel: "Adresse",
                tekst: "Tromsø, Norge",
              },
              {
                ikon: <Clock className="text-blue-700" size={28} />,
                tittel: "Åpningstider",
                tekst: "Man–Fre: 09–16",
              },
            ].map((info, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-8 text-center"
              >
                <div className="flex justify-center mb-4">{info.ikon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {info.tittel}
                </h3>
                <p className="text-gray-600">{info.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meldingsskjema */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Send oss en melding
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Vi svarer vanligvis innen én virkedag.
          </p>

          <form className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 grid gap-6 text-left">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-800">
                  Navn
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Ditt navn"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800">
                  E-postadresse
                </label>
                <input
                  type="email"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="din@email.no"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">
                Melding
              </label>
              <textarea
                rows="5"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Hva ønsker du å spørre oss om?"
                required
              ></textarea>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" required />
              <p className="text-sm text-gray-600">
                Jeg samtykker til at Bytteklar kan behandle mine opplysninger i
                henhold til personvernerklæringen.
              </p>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-transform hover:scale-[1.02] shadow-md"
            >
              Send melding
            </button>
          </form>
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

    </main>
  );
}
