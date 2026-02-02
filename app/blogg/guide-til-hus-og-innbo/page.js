import Link from "next/link";

export default function HusoginnboArtikkel() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <p className="text-blue-600 font-medium mb-3">Hus- og innboforsikring</p>
          <h1 className="text-4xl font-bold mb-6">
            Guide til hus- og innboforsikring
          </h1>
          <p className="text-lg text-gray-700">
            Hus- og innboforsikring kan være komplisert. Her får du en enkel og praktisk
            gjennomgang av hva du faktisk bør bry deg om.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 prose prose-lg">
        <h2>Hva er bilforsikring?</h2>
        <p>
          Bilforsikring beskytter deg økonomisk dersom bilen blir skadet,
          stjålet eller forårsaker skade på andre.
        </p>

        <h2>Typer bilforsikring</h2>
        <ul>
          <li><strong>Ansvar</strong> – lovpålagt</li>
          <li><strong>Delkasko</strong> – brann, tyveri, glass</li>
          <li><strong>Kasko</strong> – også skade på egen bil</li>
        </ul>

        <h2>Bonus og egenandel</h2>
        <p>
          Bonus gir rabatt ved skadefri kjøring. Egenandel er det du betaler selv.
        </p>
      </section>

      <section className="bg-blue-700 text-white py-16 mt-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Vil du sammenligne bilforsikring?
          </h2>
          <Link
            href="/forsikringer"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold"
          >
            Sammenlign tilbud
          </Link>
        </div>
      </section>
    </main>
  );
}
