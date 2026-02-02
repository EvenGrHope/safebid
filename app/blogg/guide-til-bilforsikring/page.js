import Link from "next/link";

export default function BlogArticle({ params }) {
  const { slug } = params;

  const articles = {
    "guide-til-bilforsikring": {
      tittel: "Guide til bilforsikring",
      ingress:
        "Bilforsikring kan være komplisert. Her får du en enkel og praktisk gjennomgang av hva du faktisk bør bry deg om – og hva som ofte er unødvendig.",
      innhold: (
        <>
          <h2>Hva er bilforsikring?</h2>
          <p>
            Bilforsikring er en avtale som beskytter deg økonomisk dersom bilen
            blir skadet, stjålet eller forårsaker skade på andre. I Norge er
            ansvarsforsikring lovpålagt for alle registrerte kjøretøy.
          </p>

          <h2>De vanligste typene bilforsikring</h2>
          <ul>
            <li>
              <strong>Ansvar:</strong> Dekker skader du påfører andre personer
              eller kjøretøy.
            </li>
            <li>
              <strong>Delkasko:</strong> Dekker blant annet brann, tyveri og
              glasskader.
            </li>
            <li>
              <strong>Kasko:</strong> Dekker også skader på egen bil, selv ved
              uhell.
            </li>
          </ul>

          <h2>Bonus og egenandel – dette må du forstå</h2>
          <p>
            Bonus gir rabatt på forsikringen dersom du kjører skadefritt.
            Egenandel er beløpet du betaler selv ved skade. Lav egenandel gir
            høyere pris – og motsatt.
          </p>

          <h2>Vanlige feil mange gjør</h2>
          <ul>
            <li>Velger for lav dekning for ny eller verdifull bil</li>
            <li>Har for høy egenandel uten å vite det</li>
            <li>Sammenligner ikke tilbud fra flere selskaper</li>
          </ul>

          <h2>Hvordan få best mulig pris?</h2>
          <p>
            Den enkleste måten å sikre god pris og riktige vilkår på, er å hente
            flere tilbud samtidig og sammenligne både pris og dekning.
          </p>
        </>
      ),
    },
  };

  const article = articles[slug];

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-bold">Artikkel ikke funnet</h1>
        <Link href="/blogg" className="text-blue-600 underline mt-4 block">
          ← Tilbake til bloggen
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <p className="text-blue-600 font-medium mb-3">Bilforsikring</p>
          <h1 className="text-4xl font-bold mb-6">{article.tittel}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {article.ingress}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-16 prose prose-lg">
        {article.innhold}
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white py-16 mt-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Vil du se hva bilforsikringen faktisk bør koste?
          </h2>
          <p className="mb-8 opacity-90">
            Sammenlign tilbud fra flere rådgivere – helt gratis og uforpliktende.
          </p>
          <Link
            href="/forsikringer"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Sammenlign tilbud
          </Link>
        </div>
      </section>
    </main>
  );
}
