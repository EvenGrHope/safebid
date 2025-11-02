"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  Truck,
  Bike,
  Tractor,
  Shield,
  HeartPulse,
  Briefcase,
  Baby,
  Plane,
  Dog,
  Home,
  Building2,
  Ship,
  Gem,
  Mountain,
} from "lucide-react";

const groupedProducts = {
  "Bil og kjøretøy": [
    { id: "bil", label: "Bilforsikring", description: "Dekker skade på egen bil og ansvar for skade på andre kjøretøy.", icon: Car },
    { id: "båt", label: "Båtforsikring", description: "Dekker skader, ulykker og ansvar ved bruk av båt.", icon: Ship },
    { id: "campingvogn", label: "Campingvogn", description: "Dekker skade, tyveri og brann for campingvognen din.", icon: Truck },
    { id: "elsparkesykkel", label: "Elsparkesykkel", description: "Forsikring ved skade, tyveri eller ansvar for elsparkesykkel.", icon: Bike },
    { id: "mc", label: "MC, ATV og snøscooter", description: "Dekker motorsykkel, ATV og snøscooter ved skade og ansvar.", icon: Bike },
    { id: "moped", label: "Mopedforsikring", description: "Trygghet ved ulykke, tyveri og skade på moped.", icon: Bike },
    { id: "tilhenger", label: "Tilhengerforsikring", description: "Dekker skader og ansvar ved bruk av tilhenger.", icon: Truck },
    { id: "traktor", label: "Traktor og arbeidsmaskin", description: "Forsikring for traktor og anleggsmaskiner i drift og transport.", icon: Tractor },
    { id: "veteran", label: "Veterankjøretøy", description: "Egen forsikring for klassiske og veterankjøretøy.", icon: Car },
  ],
  "Hjem og fritid": [
    { id: "hus", label: "Husforsikring", description: "Beskytter boligen din mot brann, vannskader og naturulykker.", icon: Home },
    { id: "hytte", label: "Hytteforsikring", description: "Trygghet for fritidsboligen din, både ved skade og tyveri.", icon: Mountain },
    { id: "innbo", label: "Innboforsikring", description: "Dekker tap eller skade på eiendeler i hjemmet ditt.", icon: Building2 },
    { id: "reise", label: "Reiseforsikring", description: "Trygghet ved sykdom, uhell eller tap på reise.", icon: Plane },
    { id: "verdisak", label: "Verdisakforsikring", description: "Forsikring av verdifulle eiendeler som smykker, klokker og kunst.", icon: Gem },
    { id: "dyr", label: "Dyreforsikring", description: "Dekker veterinærutgifter eller tap av kjæledyr.", icon: Dog },
  ],
  "Personforsikring": [
    { id: "liv", label: "Livsforsikring", description: "Sikrer dine nærmeste økonomisk trygghet hvis det verste skulle skje.", icon: HeartPulse },
    { id: "uføre", label: "Uføreforsikring", description: "Gir deg økonomisk sikkerhet ved langvarig sykdom eller skade.", icon: Briefcase },
    { id: "kritisk", label: "Kritisk sykdom", description: "Engangsutbetaling ved alvorlig sykdom.", icon: Shield },
    { id: "barn", label: "Barneforsikring", description: "Trygghet for barna dine ved sykdom, ulykke eller varig skade.", icon: Baby },
    { id: "helse", label: "Helseforsikring", description: "Gir rask tilgang til privat behandling og spesialisthelsetjenester.", icon: HeartPulse },
    { id: "ulykke", label: "Ulykkesforsikring", description: "Engangsutbetaling ved ulykke som gir varig skade.", icon: Shield },
  ],
};

export default function ForsikringerPage() {
  const router = useRouter();

  const allProducts = Object.values(groupedProducts).flat();
  const [counts, setCounts] = useState(
    allProducts.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {})
  );

  const increase = (id) =>
    setCounts((prev) => ({ ...prev, [id]: prev[id] + 1 }));

  const decrease = (id) =>
    setCounts((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));

  const totalSelected = Object.values(counts).reduce((a, b) => a + b, 0);
  const progress = Math.min((totalSelected / 3) * 100, 100);

  const handleGetOffer = () => {
    const selected = Object.entries(counts)
      .filter(([_, val]) => val > 0)
      .map(([key, val]) => `${key}=${val}`)
      .join(",");
    router.push(`/skjema?produkter=${selected}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-32 pt-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-12">
          Sammenlign tilbud på forsikringene dine
        </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            Velg alle forsikringene du ønsker tilbud på - få tilbud fra flere etablerte selskaper.
          </p>

        {Object.entries(groupedProducts).map(([category, products]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">
              {category}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const Icon = product.icon;
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <Icon className="text-blue-600" size={26} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {product.label}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-6">
                        {product.description}
                      </p>
                    </div>

                    {/* Teller */}
                    <div className="flex items-center justify-center gap-4 mt-auto">
                      <button
                        onClick={() => decrease(product.id)}
                        className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold text-gray-800 w-6 text-center">
                        {counts[product.id]}
                      </span>
                      <button
                        onClick={() => increase(product.id)}
                        className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center mt-12 mb-24">
          <button
            onClick={() => router.push("/")}
            className="text-blue-700 hover:underline font-medium"
          >
            ← Tilbake til forsiden
          </button>
        </div>
      </div>

      {/* === STICKY FOOTER MED PROGRESS BAR === */}
      {totalSelected > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-700 text-white shadow-lg py-3 px-6 flex flex-col items-center z-50 animate-slide-up rounded-t-2xl border-t border-blue-500">
          <div className="w-full max-w-5xl flex justify-between items-center mx-auto">
            <div className="flex items-center gap-3">
              <div className="bg-white text-blue-700 font-bold rounded-full w-8 h-8 flex items-center justify-center">
                {totalSelected}
              </div>
              <p className="font-medium text-sm sm:text-base">
                {totalSelected === 1
                  ? "1 forsikring valgt"
                  : `${totalSelected} forsikringer valgt`}
              </p>
            </div>

            <button
              onClick={handleGetOffer}
              className="bg-white text-blue-700 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              Gå videre →
            </button>
          </div>

          {/* Progress-bar for samlerabatt */}
          <div className="w-full max-w-5xl mt-3">
            <div className="h-2 bg-blue-500/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm mt-2 text-blue-100">
              {progress < 100
                ? `Samlerabatt: ${totalSelected} av 3 valgt – legg til ${
                    3 - totalSelected
                  } til for maks rabatt!`
                : "🎉 Du har full samlerabatt!"}
            </p>
          </div>
        </div>
      )}
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
