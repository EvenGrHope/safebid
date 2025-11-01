"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Home, Building2, Car, Plane } from "lucide-react";

const products = [
  { id: "hus", label: "Husforsikring", icon: Home },
  { id: "innbo", label: "Innboforsikring", icon: Building2 },
  { id: "bil", label: "Bilforsikring", icon: Car },
  { id: "reise", label: "Reiseforsikring", icon: Plane },
];

export default function ProductSelector() {
  const router = useRouter();
  const [counts, setCounts] = useState(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {})
  );

  const increase = (id) => {
    setCounts((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrease = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 0),
    }));
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const handleGetOffer = () => {
    const query = Object.entries(counts)
      .filter(([_, val]) => val > 0)
      .map(([k, v]) => `${k}=${v}`)
      .join(",");
    router.push(`/skjema?produkter=${query}`);
  };

  return (
    <div>
      <ul className="space-y-3">
        {products.map(({ id, label, icon: Icon }) => (
          <li
            key={id}
            className="flex justify-between items-center border rounded-lg p-3 bg-white hover:border-blue-400 transition"
          >
            <div className="flex items-center gap-3">
              <Icon className="text-blue-600" size={24} />
              <span className="font-medium text-gray-800">{label}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => decrease(id)}
                className="bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-300"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold">
                {counts[id]}
              </span>
              <button
                onClick={() => increase(id)}
                className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-blue-700"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Hovedknapp */}
      <button
        onClick={handleGetOffer}
        disabled={total === 0}
        className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
          total > 0
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {total > 0
          ? `Få tilbud på ${total} ${
              total === 1 ? "forsikring" : "forsikringer"
            }`
          : "Velg forsikringer for å få tilbud"}
      </button>

      {/* Ny knapp – Se alle forsikringer */}
      <div className="text-center mt-5">
        <button
          onClick={() => router.push("/forsikringer")}
          className="text-blue-600 hover:underline font-medium"
        >
          Se alle forsikringer
        </button>
      </div>
    </div>
  );
}
