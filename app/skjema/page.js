"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";

/* === 1. Skjemaer for ulike forsikringer === */

// --- Bilforsikring ---
function BilForsikring({ data, onNext, onBack, index }) {
  const [localData, setLocalData] = useState(data);
  const [error, setError] = useState("");

  const validateRegnr = (value) => /^[A-Za-z]{2}\d{5}$/.test(value);

  const handleNext = () => {
    if (!localData.regnr || !validateRegnr(localData.regnr)) {
      setError("Registreringsnummer må bestå av to bokstaver og fem tall (f.eks. AB12345).");
      return;
    }
    setError("");
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-700">
          Bilforsikring {index !== undefined ? index + 1 : ""}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Fyll ut informasjonen om bilen du ønsker å forsikre.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-800">Registreringsnummer <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="F.eks. AB12345"
            className={`w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              error ? "border-red-500 ring-red-300" : "border-gray-300"
            }`}
            value={localData.regnr || ""}
            onChange={(e) =>
              setLocalData({ ...localData, regnr: e.target.value.toUpperCase() })
            }
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800">Årlig kjørelengde <span className="text-red-500">*</span></label>
          <select
            className="w-full border rounded-lg px-4 py-3 border-gray-300 focus:ring-2 focus:ring-blue-600"
            value={localData.kjorelengde || ""}
            onChange={(e) =>
              setLocalData({ ...localData, kjorelengde: e.target.value })
            }
          >
            <option value="">-</option>
            <option value="5000">5 000 km</option>
            <option value="8000">8 000 km</option>
            <option value="12000">12 000 km</option>
            <option value="16000">16 000 km</option>
            <option value="20000">20 000 km</option>
            <option value="30000">30 000 km</option>
            <option value="40000">40 000 km</option>
            <option value="ubegrenset">Ubegrenset</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800">Bonus <span className="text-red-500">*</span></label>
          <select
            className="w-full border rounded-lg px-4 py-3 border-gray-300 focus:ring-2 focus:ring-blue-600"
            value={localData.bonus || ""}
            onChange={(e) =>
              setLocalData({ ...localData, bonus: e.target.value })
            }
          >
            <option value="">-</option>
            <option value="mindre enn 60%">Mindre enn 60%</option>
            <option value="60%">60% (startbonus)</option>
            <option value="70%">70%</option>
            <option value="75%">75%</option>
            <option value="75%+">75% og høyere</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800">Ønsket dekning <span className="text-red-500">*</span></label>
          <select
            className="w-full border rounded-lg px-4 py-3 border-gray-300 focus:ring-2 focus:ring-blue-600"
            value={localData.dekning || ""}
            onChange={(e) =>
              setLocalData({ ...localData, dekning: e.target.value })
            }
          >
            <option value="">-</option>
            <option value="ansvar">Ansvar</option>
            <option value="delkasko">Delkasko</option>
            <option value="kasko">Kasko</option>
            <option value="super">Super</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300">
          Tilbake
        </button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">
          Neste
        </button>
      </div>
    </div>
  );
}

// --- InnboForsikring ---
function InnboForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState(data);

  const handleNext = () => {
    if (!localData.adresse || !localData.forsikringssum || !localData.dekning) {
      alert("Vennligst fyll ut alle felt før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Innboforsikring</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <label className="block mb-2 font-medium text-gray-800">Adresse <span className="text-red-500">*</span></label>
        <input
          type="text"
          placeholder="F.eks. Parkveien 12, 0350 Oslo"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.adresse || ""}
          onChange={(e) => setLocalData({ ...localData, adresse: e.target.value })}
        />

        <label className="block mb-2 font-medium text-gray-800">Forsikringssum <span className="text-red-500">*</span></label>
        <input
          type="number"
          placeholder="F.eks. 1 000 000 kr"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.forsikringssum || ""}
          onChange={(e) => setLocalData({ ...localData, forsikringssum: e.target.value })}
        />

        <label className="block mb-2 font-medium text-gray-800">Ønsket dekning <span className="text-red-500">*</span></label>
        <select
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600"
          value={localData.dekning || ""}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">-</option>
          <option value="standard">Standard</option>
          <option value="super">Super</option>
        </select>
        
        <label className="block mb-2 font-medium text-gray-800">Sikkerhetstiltak</label>
        <div className="flex flex-col gap-2 text-gray-700">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-600"
              checked={localData.brannalarm || false}
              onChange={(e) =>
                setLocalData({ ...localData, brannalarm: e.target.checked })
              }
            />
            Brannalarm
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-600"
              checked={localData.innbruddsalarm || false}
              onChange={(e) =>
                setLocalData({ ...localData, innbruddsalarm: e.target.checked })
              }
            />
            Innbruddsalarm
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300">
          Tilbake
        </button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">
          Neste
        </button>
      </div>
    </div>
  );
}

// --- ReiseForsikring ---
function ReiseForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState(data);

  const handleNext = () => {
    if (!localData.hvem || !localData.dekning) {
      alert("Vennligst fyll ut alle felt før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Reiseforsikring</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <label className="block mb-2 font-medium text-gray-800">Hvem skal forsikres <span className="text-red-500">*</span></label>
        <select
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600"
          value={localData.hvem || ""}
          onChange={(e) => setLocalData({ ...localData, hvem: e.target.value })}
        >
          <option value="">-</option>
          <option value="enkeltperson">Enkelperson</option>
          <option value="familie">Familie</option>
        </select>

        <label className="block mb-2 font-medium text-gray-800">Ønsket dekning <span className="text-red-500">*</span></label>
        <select
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600"
          value={localData.dekning || ""}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">-</option>
          <option value="standard">Standard</option>
          <option value="super">Super</option>
        </select>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300">
          Tilbake
        </button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">
          Neste
        </button>
      </div>
    </div>
  );
}

// --- Husforsikring ---
function HusForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    adresse: data.adresse || "",
    byggeår: data.byggeår || "",
    bruksareal: data.bruksareal || "",
    utleie: data.utleie || "",
    sikkerhetstiltak: data.sikkerhetstiltak || {
      brannalarm: false,
      innbruddsalarm: false,
      vannstopper: false,
      komfyrvakt: false,
    },
    tilleggsbygg: data.tilleggsbygg || [],
    harTilleggsbygg: data.harTilleggsbygg || false,
    dekning: data.dekning || "",
  });

  const handleAddBygg = () => {
    setLocalData({
      ...localData,
      tilleggsbygg: [
        ...localData.tilleggsbygg,
        { byggeår: "", bruksareal: "", beskrivelse: "" },
      ],
    });
  };

  const handleNext = () => {
    if (!localData.adresse || !localData.byggeår || !localData.bruksareal || !localData.dekning) {
      alert("Vennligst fyll ut alle påkrevde felt.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Husforsikring</h2>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        {/* Adresse */}
        <input
          type="text"
          placeholder="Adresse (f.eks. Storgata 10, Tromsø)"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.adresse}
          onChange={(e) => setLocalData({ ...localData, adresse: e.target.value })}
        />

        {/* Byggeår */}
        <input
          type="number"
          placeholder="Byggeår (f.eks. 1985)"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.byggeår}
          onChange={(e) => setLocalData({ ...localData, byggeår: e.target.value })}
        />

        {/* Bruksareal */}
        <input
          type="number"
          placeholder="Bruksareal i kvm (f.eks. 180)"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.bruksareal}
          onChange={(e) => setLocalData({ ...localData, bruksareal: e.target.value })}
        />

        {/* Utleie */}
        <select
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600"
          value={localData.utleie}
          onChange={(e) => setLocalData({ ...localData, utleie: e.target.value })}
        >
          <option value="">Har boligen utleie?</option>
          <option value="nei">Nei</option>
          <option value="delvis">Delvis</option>
          <option value="ja">Ja</option>
        </select>

        {/* Sikkerhetstiltak */}
        <div className="space-y-2">
          <label className="font-medium text-gray-800">Sikkerhetstiltak</label>
          {Object.keys(localData.sikkerhetstiltak).map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-blue-600"
                checked={localData.sikkerhetstiltak[key]}
                onChange={(e) =>
                  setLocalData({
                    ...localData,
                    sikkerhetstiltak: {
                      ...localData.sikkerhetstiltak,
                      [key]: e.target.checked,
                    },
                  })
                }
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        {/* Tilleggsbygg */}
        <div className="space-y-3">
          <label className="font-medium text-gray-800">Tilleggsbygg</label>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-600"
              checked={localData.harTilleggsbygg}
              onChange={(e) =>
                setLocalData({ ...localData, harTilleggsbygg: e.target.checked })
              }
            />
            <span>Har tilleggsbygg</span>
          </div>

          {localData.harTilleggsbygg && (
            <div className="space-y-5 mt-4">
              {localData.tilleggsbygg.map((bygg, i) => (
                <div 
                  key={i} 
                  className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm space-y-3"
                >
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Er du sikker på at du vil fjerne dette bygget?")) {
                          const newList = localData.tilleggsbygg.filter((_, idx) => idx !== i);
                          setLocalData({ ...localData, tilleggsbygg: newList});
                        }
                      }}
                      className="border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 hover:border-red-400 font-medium text-sm px-4 py-1.5 rounded-lg transition-all duration-200"
                    >
                      X Fjern bygg
                    </button>
                  </div>    

                  <input
                    type="number"
                    placeholder="Byggeår"
                    className="w-full border rounded-lg px-3 py-2"
                    value={bygg.byggeår}
                    onChange={(e) => {
                      const newList = [...localData.tilleggsbygg];
                      newList[i].byggeår = e.target.value;
                      setLocalData({ ...localData, tilleggsbygg: newList });
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Bruksareal (kvm)"
                    className="w-full border rounded-lg px-3 py-2"
                    value={bygg.bruksareal}
                    onChange={(e) => {
                      const newList = [...localData.tilleggsbygg];
                      newList[i].bruksareal = e.target.value;
                      setLocalData({ ...localData, tilleggsbygg: newList });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Beskrivelse (f.eks. garasje eller anneks)"
                    className="w-full border rounded-lg px-3 py-2"
                    value={bygg.beskrivelse}
                    onChange={(e) => {
                      const newList = [...localData.tilleggsbygg];
                      newList[i].beskrivelse = e.target.value;
                      setLocalData({ ...localData, tilleggsbygg: newList });
                    }}
                  />
                </div>
              ))}

              <button
                onClick={handleAddBygg}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200"
              >
                + Legg til bygg
              </button>
            </div>
          )}
        </div>

        {/* Dekning */}
        <select
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="standard">Standard</option>
          <option value="super">Super</option>
        </select>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300">
          Tilbake
        </button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">
          Neste
        </button>
      </div>
    </div>
  );
}

// --- Campingvogn ---
function CampingvognForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    regnr: data.regnr || "",
    dekning: data.dekning || "",
    verdi: data.verdi || "",
  });

  const handleNext = () => {
    if (!localData.regnr || !localData.dekning || !localData.verdi) {
      alert("Vennligst fyll ut alle feltene før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Campingvognforsikring</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <input
          type="text"
          placeholder="Registreringsnummer (f.eks. AB12345)"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.regnr}
          onChange={(e) => setLocalData({ ...localData, regnr: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-4 py-3"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="ansvar">Ansvar</option>
          <option value="kasko">Kasko</option>
          <option value="super">Super</option>
        </select>

        <input
          type="number"
          placeholder="Verdi (f.eks. 250000)"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.verdi}
          onChange={(e) => setLocalData({ ...localData, verdi: e.target.value })}
        />
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- Båtforsikring ---
function BatForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    regnr: data.regnr || "",
    verdi: data.verdi || "",
    dekning: data.dekning || "",
  });

  const handleNext = () => {
    if (!localData.regnr || !localData.verdi || !localData.dekning) {
      alert("Vennligst fyll ut alle feltene før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Båtforsikring</h2>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <input
          type="text"
          placeholder="Registreringsnummer eller båtnavn"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.regnr}
          onChange={(e) => setLocalData({ ...localData, regnr: e.target.value })}
        />

        <input
          type="number"
          placeholder="Verdi (f.eks. 400000)"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.verdi}
          onChange={(e) => setLocalData({ ...localData, verdi: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-4 py-3"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="ansvar">Ansvar</option>
          <option value="kasko">Kasko</option>
          <option value="super">Super</option>
        </select>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- Elsparkesykkel ---
function ElsparkesykkelForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    understellnummer: data.understellnummer || "",
    dekning: data.dekning || "",
    verdi: data.verdi || "",
  });

  const handleNext = () => {
    if (!localData.understellnummer || !localData.dekning || !localData.verdi) {
      alert("Fyll ut alle feltene før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Elsparkesykkelforsikring</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <input
          type="text"
          placeholder="Understellnummer"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.understellnummer}
          onChange={(e) => setLocalData({ ...localData, understellnummer: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-4 py-3"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="standard">Standard</option>
          <option value="super">Super</option>
        </select>

        <input
          type="number"
          placeholder="Verdi (f.eks. 15000)"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.verdi}
          onChange={(e) => setLocalData({ ...localData, verdi: e.target.value })}
        />
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- MC, ATV og Snøscooter ---
function MCForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    regnr: data.regnr || "",
    dekning: data.dekning || "",
    verdi: data.verdi || "",
  });

  const handleNext = () => {
    if (!localData.regnr || !localData.dekning || !localData.verdi) {
      alert("Vennligst fyll ut alle feltene før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">MC / ATV / Snøscooter</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <input
          type="text"
          placeholder="Registreringsnummer"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.regnr}
          onChange={(e) => setLocalData({ ...localData, regnr: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-4 py-3"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="ansvar">Ansvar</option>
          <option value="kasko">Kasko</option>
          <option value="super">Super</option>
        </select>

        <input
          type="number"
          placeholder="Verdi (f.eks. 120000)"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.verdi}
          onChange={(e) => setLocalData({ ...localData, verdi: e.target.value })}
        />
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- Hytteforsikring ---
function HytteForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    adresse: data.adresse || "",
    byggeår: data.byggeår || "",
    bruksareal: data.bruksareal || "",
    sikkerhetstiltak: data.sikkerhetstiltak || {
      brannalarm: false,
      innbruddsalarm: false,
      vannstopper: false,
      komfyrvakt: false,
    },
    dekning: data.dekning || "",
  });

  const handleNext = () => {
    if (!localData.adresse || !localData.byggeår || !localData.bruksareal || !localData.dekning) {
      alert("Vennligst fyll ut alle feltene før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Hytteforsikring</h2>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <input
          type="text"
          placeholder="Adresse (f.eks. Hytteveien 10, Hemsedal)"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.adresse}
          onChange={(e) => setLocalData({ ...localData, adresse: e.target.value })}
        />

        <input
          type="number"
          placeholder="Byggeår (f.eks. 1998)"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.byggeår}
          onChange={(e) => setLocalData({ ...localData, byggeår: e.target.value })}
        />

        <input
          type="number"
          placeholder="Bruksareal i kvm (f.eks. 120)"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.bruksareal}
          onChange={(e) => setLocalData({ ...localData, bruksareal: e.target.value })}
        />

        <div className="space-y-2">
          <label className="font-medium text-gray-800">Sikkerhetstiltak</label>
          {Object.keys(localData.sikkerhetstiltak).map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-blue-600"
                checked={localData.sikkerhetstiltak[key]}
                onChange={(e) =>
                  setLocalData({
                    ...localData,
                    sikkerhetstiltak: {
                      ...localData.sikkerhetstiltak,
                      [key]: e.target.checked,
                    },
                  })
                }
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        <select
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="standard">Standard</option>
          <option value="super">Super</option>
        </select>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- Verdisakforsikring ---
function VerdisakForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    verdi: data.verdi || "",
    beskrivelse: data.beskrivelse || "",
  });

  const handleNext = () => {
    if (!localData.verdi || !localData.beskrivelse) {
      alert("Vennligst fyll ut både verdi og beskrivelse før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Verdisakforsikring</h2>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <input
          type="number"
          placeholder="Verdi (f.eks. 50 000)"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.verdi}
          onChange={(e) => setLocalData({ ...localData, verdi: e.target.value })}
        />

        <textarea
          placeholder="Beskrivelse av objektet (f.eks. Rolex Submariner, gull, 2022-modell)"
          className="w-full border rounded-lg px-4 py-3"
          rows="3"
          value={localData.beskrivelse}
          onChange={(e) => setLocalData({ ...localData, beskrivelse: e.target.value })}
        />
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- Dyreforsikring ---
function DyreForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    navn: data.navn || "",
    fodselsdato: data.fodselsdato || "",
    dod: data.dod || 10000,
    veterinar: data.veterinar || 10000,
  });

  const handleNext = () => {
    if (!localData.navn || !localData.fodselsdato) {
      alert("Fyll ut navn og fødselsdato før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Dyreforsikring</h2>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <input
          type="text"
          placeholder="Dyrets navn (f.eks. Luna)"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.navn}
          onChange={(e) => setLocalData({ ...localData, navn: e.target.value })}
        />

        <input
          type="date"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.fodselsdato}
          onChange={(e) => setLocalData({ ...localData, fodselsdato: e.target.value })}
        />

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Ønsket utbetaling ved død: {localData.dod.toLocaleString("no-NO")} kr
          </label>
          <input
            type="range"
            min="10000"
            max="50000"
            step="10000"
            value={localData.dod}
            onChange={(e) =>
              setLocalData({ ...localData, dod: parseInt(e.target.value) })
            }
            className="w-full accent-blue-600"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Ønsket utbetaling ved veterinærutgifter: {localData.veterinar.toLocaleString("no-NO")} kr
          </label>
          <input
            type="range"
            min="10000"
            max="50000"
            step="10000"
            value={localData.veterinar}
            onChange={(e) =>
              setLocalData({ ...localData, veterinar: parseInt(e.target.value) })
            }
            className="w-full accent-blue-600"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- Mopedforsikring ---
function MopedForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    regnr: data.regnr || "",
    dekning: data.dekning || "",
    verdi: data.verdi || "",
  });

  const handleNext = () => {
    if (!localData.regnr || !localData.dekning || !localData.verdi) {
      alert("Vennligst fyll ut alle feltene før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Mopedforsikring</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <input
          type="text"
          placeholder="Registreringsnummer"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.regnr}
          onChange={(e) => setLocalData({ ...localData, regnr: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-4 py-3"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="ansvar">Ansvar</option>
          <option value="kasko">Kasko</option>
          <option value="super">Super</option>
        </select>

        <input
          type="number"
          placeholder="Verdi (f.eks. 25000)"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.verdi}
          onChange={(e) => setLocalData({ ...localData, verdi: e.target.value })}
        />
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}


// --- Tilhengerforsikring ---
function TilhengerForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    regnr: data.regnr || "",
    verdi: data.verdi || "",
    dekning: data.dekning || "",
  });

  const handleNext = () => {
    if (!localData.regnr || !localData.verdi || !localData.dekning) {
      alert("Vennligst fyll ut registreringsnummer, verdi og dekning før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Tilhengerforsikring</h2>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        {/* Registreringsnummer */}
        <input
          type="text"
          placeholder="Registreringsnummer (f.eks. AB1234)"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.regnr}
          onChange={(e) => setLocalData({ ...localData, regnr: e.target.value })}
        />

        {/* Verdi */}
        <input
          type="number"
          placeholder="Verdi (f.eks. 50 000)"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.verdi}
          onChange={(e) => setLocalData({ ...localData, verdi: e.target.value })}
        />

        {/* Dekning */}
        <select
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="brann-tyveri">Brann og tyveri</option>
          <option value="kasko">Kasko</option>
        </select>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300"
        >
          Tilbake
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800"
        >
          Neste
        </button>
      </div>
    </div>
  );
}


// --- Traktor og arbeidsmaskin ---
function TraktorForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    regnr: data.regnr || "",
    verdi: data.verdi || "",
    dekning: data.dekning || "",
  });

  const handleNext = () => {
    if (!localData.regnr || !localData.verdi || !localData.dekning) {
      alert("Vennligst fyll ut alle feltene før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Traktor og arbeidsmaskin</h2>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <input
          type="text"
          placeholder="Registreringsnummer"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.regnr}
          onChange={(e) => setLocalData({ ...localData, regnr: e.target.value })}
        />

        <input
          type="number"
          placeholder="Verdi (f.eks. 350000)"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.verdi}
          onChange={(e) => setLocalData({ ...localData, verdi: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-4 py-3"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="ansvar">Ansvar</option>
          <option value="kasko">Kasko</option>
          <option value="super">Super</option>
        </select>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300"
        >
          Tilbake
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800"
        >
          Neste
        </button>
      </div>
    </div>
  );
}


// --- Veterankjøretøy ---
function VeteranForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    regnr: data.regnr || "",
    verdi: data.verdi || "",
    dekning: data.dekning || "",
  });

  const handleNext = () => {
    if (!localData.regnr || !localData.verdi || !localData.dekning) {
      alert("Vennligst fyll ut alle feltene før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Veterankjøretøy</h2>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <input
          type="text"
          placeholder="Registreringsnummer"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.regnr}
          onChange={(e) => setLocalData({ ...localData, regnr: e.target.value })}
        />

        <input
          type="number"
          placeholder="Verdi (f.eks. 150000)"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.verdi}
          onChange={(e) => setLocalData({ ...localData, verdi: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-4 py-3"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="ansvar">Ansvar</option>
          <option value="kasko">Kasko</option>
          <option value="super">Super</option>
        </select>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300"
        >
          Tilbake
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800"
        >
          Neste
        </button>
      </div>
    </div>
  );
}

// --- Livsforsikring ---
function LivsForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    navn: data.navn || "",
    fodselsdato: data.fodselsdato || "",
    utbetaling: data.utbetaling || 300000,
  });

  const handleNext = () => {
    if (!localData.navn || !localData.fodselsdato) {
      alert("Fyll ut navn og fødselsdato før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Livsforsikring</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border space-y-6">
        <input
          type="text"
          placeholder="Navn"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.navn}
          onChange={(e) => setLocalData({ ...localData, navn: e.target.value })}
        />

        <input
          type="date"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.fodselsdato}
          onChange={(e) => setLocalData({ ...localData, fodselsdato: e.target.value })}
        />

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Ønsket utbetaling: {localData.utbetaling.toLocaleString("no-NO")} kr
          </label>
          <input
            type="range"
            min="300000"
            max="6000000"
            step="50000"
            value={localData.utbetaling}
            onChange={(e) =>
              setLocalData({ ...localData, utbetaling: parseInt(e.target.value) })
            }
            className="w-full accent-blue-600"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- Kritisk sykdom ---
function KritiskSykdom({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    navn: data.navn || "",
    fodselsdato: data.fodselsdato || "",
    utbetaling: data.utbetaling || 300000,
  });

  const handleNext = () => {
    if (!localData.navn || !localData.fodselsdato) {
      alert("Fyll ut navn og fødselsdato før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Kritisk sykdom</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border space-y-6">
        <input
          type="text"
          placeholder="Navn"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.navn}
          onChange={(e) => setLocalData({ ...localData, navn: e.target.value })}
        />

        <input
          type="date"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.fodselsdato}
          onChange={(e) => setLocalData({ ...localData, fodselsdato: e.target.value })}
        />

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Ønsket utbetaling: {localData.utbetaling.toLocaleString("no-NO")} kr
          </label>
          <input
            type="range"
            min="300000"
            max="6000000"
            step="50000"
            value={localData.utbetaling}
            onChange={(e) =>
              setLocalData({ ...localData, utbetaling: parseInt(e.target.value) })
            }
            className="w-full accent-blue-600"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- Uføreforsikring ---
function UforeForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    navn: data.navn || "",
    fodselsdato: data.fodselsdato || "",
    manedlig: data.manedlig || 5000,
    engangs: data.engangs || 300000,
  });

  const handleNext = () => {
    if (!localData.navn || !localData.fodselsdato) {
      alert("Fyll ut navn og fødselsdato før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Uføreforsikring</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border space-y-6">
        <input
          type="text"
          placeholder="Navn"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.navn}
          onChange={(e) => setLocalData({ ...localData, navn: e.target.value })}
        />

        <input
          type="date"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.fodselsdato}
          onChange={(e) => setLocalData({ ...localData, fodselsdato: e.target.value })}
        />

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Månedlig utbetaling: {localData.manedlig.toLocaleString("no-NO")} kr
          </label>
          <input
            type="range"
            min="5000"
            max="50000"
            step="1000"
            value={localData.manedlig}
            onChange={(e) =>
              setLocalData({ ...localData, manedlig: parseInt(e.target.value) })
            }
            className="w-full accent-blue-600"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Engangsutbetaling: {localData.engangs.toLocaleString("no-NO")} kr
          </label>
          <input
            type="range"
            min="300000"
            max="6000000"
            step="50000"
            value={localData.engangs}
            onChange={(e) =>
              setLocalData({ ...localData, engangs: parseInt(e.target.value) })
            }
            className="w-full accent-blue-600"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- Barneforsikring ---
function BarneForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    navn: data.navn || "",
    fodselsdato: data.fodselsdato || "",
    dekning: data.dekning || "",
  });

  const handleNext = () => {
    if (!localData.navn || !localData.fodselsdato || !localData.dekning) {
      alert("Fyll ut alle felt før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Barneforsikring</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border space-y-6">
        <input
          type="text"
          placeholder="Navn"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.navn}
          onChange={(e) => setLocalData({ ...localData, navn: e.target.value })}
        />

        <input
          type="date"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.fodselsdato}
          onChange={(e) => setLocalData({ ...localData, fodselsdato: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-4 py-3"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="basis">Basis</option>
          <option value="ekstra">Ekstra</option>
          <option value="topp">Topp</option>
        </select>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- Helseforsikring ---
function HelseForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    navn: data.navn || "",
    fodselsdato: data.fodselsdato || "",
    dekning: data.dekning || "",
  });

  const handleNext = () => {
    if (!localData.navn || !localData.fodselsdato || !localData.dekning) {
      alert("Fyll ut alle felt før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Helseforsikring</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border space-y-6">
        <input
          type="text"
          placeholder="Navn"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.navn}
          onChange={(e) => setLocalData({ ...localData, navn: e.target.value })}
        />

        <input
          type="date"
          className="w-full border rounded-lg px-4 py-3"
          value={localData.fodselsdato}
          onChange={(e) => setLocalData({ ...localData, fodselsdato: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-4 py-3"
          value={localData.dekning}
          onChange={(e) => setLocalData({ ...localData, dekning: e.target.value })}
        >
          <option value="">Velg dekning</option>
          <option value="basis">Basis</option>
          <option value="ekstra">Ekstra</option>
          <option value="topp">Topp</option>
        </select>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}

// --- Ulykkesforsikring ---
function UlykkeForsikring({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    dod: data.dod || "",
    invaliditet: data.invaliditet || "",
  });

  const handleNext = () => {
    if (!localData.dod || !localData.invaliditet) {
      alert("Velg ønsket forsikringssum for begge punktene.");
      return;
    }
    onNext(localData);
  };

  const options = [500000, 1000000, 1500000, 2000000, 2500000, 3000000, 4000000, 5000000];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Ulykkesforsikring</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Forsikringssum ved død
          </label>
          <select
            className="w-full border rounded-lg px-4 py-3"
            value={localData.dod}
            onChange={(e) => setLocalData({ ...localData, dod: e.target.value })}
          >
            <option value="">Velg sum</option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o.toLocaleString("no-NO")} kr
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Forsikringssum ved invaliditet
          </label>
          <select
            className="w-full border rounded-lg px-4 py-3"
            value={localData.invaliditet}
            onChange={(e) =>
              setLocalData({ ...localData, invaliditet: e.target.value })
            }
          >
            <option value="">Velg sum</option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o.toLocaleString("no-NO")} kr
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300">Tilbake</button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">Neste</button>
      </div>
    </div>
  );
}


// --- Kontaktinformasjon ---
function KontaktInfo({ data, onNext, onBack }) {
  const [localData, setLocalData] = useState(data);

  const handleNext = () => {
    if (!localData.navn || !localData.epost || !localData.telefon || !localData.selskap) {
      alert("Vennligst fyll ut alle feltene før du går videre.");
      return;
    }
    onNext(localData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Kontaktinformasjon</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
        <input
          type="text"
          placeholder="F.eks. Eva Hansen"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.navn || ""}
          onChange={(e) => setLocalData({ ...localData, navn: e.target.value })}
        />

        <input
          type="email"
          placeholder="F.eks. eva.hansen@email.no"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.epost || ""}
          onChange={(e) => setLocalData({ ...localData, epost: e.target.value })}
        />

        <input
          type="tel"
          placeholder="F.eks. 900 12 345"
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
          value={localData.telefon || ""}
          onChange={(e) => setLocalData({ ...localData, telefon: e.target.value })}
        />

        <select
        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600"
        value={localData.selskap || ""}
        onChange={(e) => setLocalData({ ...localData, selskap: e.target.value })}
      >
        <option value="">Velg ditt nåværende forsikringsselskap</option>
        <option value="Storebrand">Storebrand</option>
        <option value="IF">IF</option>
        <option value="Gjensidige">Gjensidige</option>
        <option value="Tryg">Tryg</option>
        <option value="Fremtind">Fremtind</option>
        <option value="Annet">Annet</option>
      </select>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300">
          Tilbake
        </button>
        <button onClick={handleNext} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">
          Neste
        </button>
      </div>
    </div>
  );
}

// --- Oppsummering ---
function Oppsummering({ data, onSubmit, onBack }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Oppsummering</h2>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6 text-gray-800">
        {data.bil.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">🚗 Bilforsikring</h3>
            {data.bil.map((b, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Registreringsnummer: {b.regnr}</p>
                <p>Kjørelengde: {b.kjorelengde}</p>
                <p>Bonus: {b.bonus}</p>
                <p>Dekning: {b.dekning}</p>
              </div>
            ))}
          </div>
        )}

        {data.innbo.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">🏠 Innboforsikring</h3>
            {data.innbo.map((i, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border mb-2">
                <p>Adresse: {i.adresse}</p>
                <p>Forsikringssum: {i.forsikringssum} kr</p>
                <p>Dekning: {i.dekning}</p>
                <p>Brannalarm: {i.brannalarm ? "Ja" : "Nei"}</p>
                <p>Innbruddsalarm: {i.innbruddsalarm ? "Ja" : "Nei"}</p>
              </div>
            ))}
          </div>
        )}

        {data.reise.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">✈️ Reiseforsikring</h3>
            {data.reise.map((r, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border mb-2">
                <p>Hvem: {r.hvem}</p>
                <p>Dekning: {r.dekning}</p>
              </div>
            ))}
          </div>
        )}

        {data.campingvogn.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">🚐 Campingvogn</h3>
            {data.campingvogn.map((m, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Registreringsnummer: {m.regnr}</p>
                <p>Dekning: {m.dekning}</p>
                <p>Verdi: {m.verdi}</p>
              </div>
            ))}
          </div>
        )}

        {data.liv.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">❤️ Livsforsikring</h3>
            {data.liv.map((l, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Navn: {l.navn}</p>
                <p>Fødselsdato: {l.fodselsdato}</p>
                <p>Utbetaling: {Number(l.utbetaling).toLocaleString("no-NO")} kr</p>
              </div>
            ))}
          </div>
        )}

        {data.kritisk.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">💔 Kritisk sykdom</h3>
            {data.kritisk.map((k, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Navn: {k.navn}</p>
                <p>Fødselsdato: {k.fodselsdato}</p>
                <p>Utbetaling: {Number(k.utbetaling).toLocaleString("no-NO")} kr</p>
              </div>
            ))}
          </div>
        )}

        {data.ufore.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">🦽 Uføreforsikring</h3>
            {data.ufore.map((u, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Navn: {u.navn}</p>
                <p>Fødselsdato: {u.fodselsdato}</p>
                <p>Månedlig utbetaling: {Number(u.manedlig).toLocaleString("no-NO")} kr</p>
                <p>Engangsutbetaling: {Number(u.engangs).toLocaleString("no-NO")} kr</p>
              </div>
            ))}
          </div>
        )}

        {data.barn.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">👶 Barneforsikring</h3>
            {data.barn.map((b, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Navn: {b.navn}</p>
                <p>Fødselsdato: {b.fodselsdato}</p>
                <p>Dekning: {b.dekning}</p>
              </div>
            ))}
          </div>
        )}

        {data.helse.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">🏥 Helseforsikring</h3>
            {data.helse.map((h, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Navn: {h.navn}</p>
                <p>Fødselsdato: {h.fodselsdato}</p>
                <p>Dekning: {h.dekning}</p>
              </div>
            ))}
          </div>
        )}

        {data.bat.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">🚤 Båtforsikring</h3>
            {data.bat.map((b, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Registreringsnummer: {b.regnr}</p>
                <p>Verdi: {b.verdi}</p>
                <p>Dekning: {b.dekning}</p>
              </div>
            ))}
          </div>
        )}

        {data.ulykke.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">⚠️ Ulykkesforsikring</h3>
            {data.ulykke.map((u, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Forsikringssum ved død: {Number(u.dod).toLocaleString("no-NO")} kr</p>
                <p>Forsikringssum ved invaliditet: {Number(u.invaliditet).toLocaleString("no-NO")} kr</p>
              </div>
            ))}
          </div>
        )}

        {data.hytte.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">🏡 Hytteforsikring</h3>
            {data.hytte.map((h, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Adresse: {h.adresse}</p>
                <p>Byggeår: {h.byggeår}</p>
                <p>Bruksareal: {h.bruksareal} kvm</p>
                <p>Dekning: {h.dekning}</p>
              </div>
            ))}
          </div>
        )}

        {data.verdisak.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">💎 Verdisakforsikring</h3>
            {data.verdisak.map((v, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Verdi: {Number(v.verdi).toLocaleString("no-NO")} kr</p>
                <p>Beskrivelse: {v.beskrivelse}</p>
              </div>
            ))}
          </div>
        )}

        {data.dyr.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">🐾 Dyreforsikring</h3>
            {data.dyr.map((d, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Navn: {d.navn}</p>
                <p>Fødselsdato: {d.fodselsdato}</p>
                <p>Utbetaling ved død: {Number(d.dod).toLocaleString("no-NO")} kr</p>
                <p>Utbetaling ved veterinær: {Number(d.veterinar).toLocaleString("no-NO")} kr</p>
              </div>
            ))}
          </div>
        )}

        {data.tilhenger.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">🚚 Tilhengerforsikring</h3>
            {data.tilhenger.map((t, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Registreringsnummer: {t.regnr}</p>
                <p>Verdi: {Number(t.verdi).toLocaleString("no-NO")} kr</p>
                <p>Dekning: {t.dekning === "brann-tyveri" ? "Brann og tyveri" : "Kasko"}</p>
              </div>
            ))}
          </div>
        )}

        {data.hus.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">🏡 Husforsikring</h3>
            {data.hus.map((h, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border mb-2">
                <p>Adresse: {h.adresse}</p>
                <p>Byggeår: {h.byggeår}</p>
                <p>Bruksareal: {h.bruksareal} kvm</p>
                <p>Utleie: {h.utleie}</p>
                <p>Dekning: {h.dekning}</p>
                <p>Sikkerhetstiltak:
          {" "}
          {Object.entries(h.sikkerhetstiltak)
            .filter(([_, v]) => v)
            .map(([k]) => k)
            .join(", ") || "Ingen"}
        </p>
        {h.harTilleggsbygg && (
          <div className="mt-2">
            <p className="font-medium">Tilleggsbygg:</p>
            {h.tilleggsbygg.map((tb, idx) => (
              <div key={idx} className="ml-3 text-sm">
                <p>- {tb.beskrivelse} ({tb.byggeår}, {tb.bruksareal} kvm)</p>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
)}

        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">👤 Kontaktinformasjon</h3>
          <div className="p-3 bg-white rounded-xl border">
            <p>Navn: {data.kontakt.navn}</p>
            <p>E-post: {data.kontakt.epost}</p>
            <p>Telefon: {data.kontakt.telefon}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300">
          Tilbake
        </button>
        <button onClick={onSubmit} className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800">
          Send inn forespørsel
        </button>
      </div>
    </div>
  );
}

import { Suspense } from "react";

/* === 2. Hovedkomponent === */

// Flytt hele den tidligere funksjonen inn i SkjemaContent
function SkjemaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productParam = searchParams.get("produkter") || "";
  const productEntries = productParam
    .split(",")
    .map((p) => {
      const [key, ...rest] = p.split("=");
      return [decodeURIComponent(key), rest.join("=")];
    })
    .map(([key, val]) => [decodeURIComponent(key), val]);

  const steps = useMemo(() => {
    const s = [];
    for (const [key, value] of productEntries) {
      if (!key) continue;
      const normalizedKey = decodeURIComponent(key)
        .toLowerCase()
        .replace("ø", "o")
        .replace("æ", "a")
        .replace("å", "a");
      const count = parseInt(value) || 1;
      for (let i = 0; i < count; i++) s.push({ type: normalizedKey, index: i });
    }
    s.push({ type: "kontakt" });
    s.push({ type: "oppsummering" });
    return s;
  }, [productParam]);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    bil: [],
    innbo: [],
    reise: [],
    hus: [],
    campingvogn: [],
    elsparkesykkel: [],
    mc: [],
    moped: [],
    tilhenger: [],
    traktor: [],
    veteran: [],
    liv: [],
    kritisk: [],
    ufore: [],
    barn: [],
    helse: [],
    ulykke: [],
    bat: [],
    hytte: [],
    verdisak: [],
    dyr: [],
    kontakt: {},
  });

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const handleNext = (data) => {
    let { type, index } = currentStep;
    type = decodeURIComponent(type)
      .normalize("NFC")
      .toLowerCase()
      .replace("ø", "o")
      .replace("æ", "a")
      .replace("å", "a");

    setFormData((prev) => {
      const updated = { ...prev };
      if (
        [
          "bil", "innbo", "reise", "hus", "campingvogn", "elsparkesykkel", "mc", "moped",
          "tilhenger", "traktor", "veteran", "liv", "kritisk", "ufore", "barn", "helse",
          "ulykke", "bat", "hytte", "verdisak", "dyr",
        ].includes(type)
      ) {
        const arr = [...(prev[type] || [])];
        arr[index] = data;
        updated[type] = arr;
      } else if (type === "kontakt") {
        updated.kontakt = data;
      }
      return updated;
    });
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Feil ved sending");

      alert("Skjema sendt til rådgiver!");
      router.push("/takk-forsikring");
    } catch (err) {
      console.error(err);
      alert("Kunne ikke sende skjema. Prøv igjen senere.");
    }
  };

  const getStepData = () => {
    const { type, index } = currentStep;
    return formData[type]?.[index] || formData[type] || {};
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-8">
        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-sm text-gray-600 text-center mb-4">
          Steg {step + 1} av {steps.length}
        </div>

        {/* --- Her beholdes alle if/else-renderne som før --- */}
        {currentStep.type === "bil" && (
          <BilForsikring data={getStepData()} index={currentStep.index} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep.type === "innbo" && <InnboForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "reise" && <ReiseForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "hus" && <HusForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "campingvogn" && <CampingvognForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "elsparkesykkel" && <ElsparkesykkelForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "mc" && <MCForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "moped" && <MopedForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "tilhenger" && <TilhengerForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "traktor" && <TraktorForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "veteran" && <VeteranForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "bat" && <BatForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "hytte" && <HytteForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "verdisak" && <VerdisakForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "dyr" && <DyreForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "liv" && <LivsForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "kritisk" && <KritiskSykdom data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "ufore" && <UforeForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "barn" && <BarneForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "helse" && <HelseForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "ulykke" && <UlykkeForsikring data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "kontakt" && <KontaktInfo data={getStepData()} onNext={handleNext} onBack={handleBack} />}
        {currentStep.type === "oppsummering" && <Oppsummering data={formData} onSubmit={handleSubmit} onBack={handleBack} />}
      </div>
    </main>
  );
}

// ✅ Ny eksport som fikser Vercel-feilen
export default function SkjemaPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-10">Laster skjema...</div>}>
      <SkjemaContent />
    </Suspense>
  );
}
