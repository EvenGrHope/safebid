export default function BlogArticle({ params }) {
  const { slug } = params;

  const articles = {
    "guide-til-bilforsikring": {
      tittel: "Guide til bilforsikring",
      innhold: "Her kommer en grundig gjennomgang av bilforsikring..."
    },
    "guide-til-hus-og-innbo": {
      tittel: "Guide til hus- og innboforsikring",
      innhold: "Alt du bør vite om boligforsikring..."
    },
    "guide-til-reiseforsikring": {
      tittel: "Guide til reiseforsikring",
      innhold: "Når dekker forsikringen deg på reise?"
    },
  };

  const article = articles[slug];

  if (!article) {
    return <div className="p-10">Artikkel ikke funnet</div>;
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">{article.tittel}</h1>
      <p className="text-gray-700 leading-relaxed">
        {article.innhold}
      </p>
    </main>
  );
}
