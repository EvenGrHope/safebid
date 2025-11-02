export const metadata = {
  title: "Personvernerklæring | Bytteklar.no",
  description:
    "Les vår personvernerklæring for hvordan vi behandler dine personopplysninger i henhold til GDPR.",
};

export default function Personvern() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Personvernerklæring</h1>

      <p>
        Selskapsnavn AS er en leverandør av digitale løsninger som formidler
        forsikringsleads. Vi samler inn og bruker data som kan knyttes til våre
        brukere, også kjent som personopplysninger.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Behandlingsansvarlig</h2>
      <p>
        Behandlingsansvarlig for personopplysninger som omtales i denne
        erklæringen er Selskapsnavn AS. Vi følger strenge regler om
        databeskyttelse, i samsvar med personvernforordningen (GDPR).
      </p>

      <p className="mt-4">
        Har du spørsmål om vår behandling av dine opplysninger:
        <br />
        <strong>Selskapsnavn AS</strong>
        <br />
        Organisasjonsnummer: xxx xxx xxx
        <br />
        Adresse xx, xxxx Poststed
        <br />
        <a
          href="mailto:post@bytteklar.no"
          className="text-blue-600 hover:underline"
        >
          post@bytteklar.no
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Informasjonskapsler</h2>
      <p>
        Vår nettside bruker informasjonskapsler (cookies) for å forbedre
        brukeropplevelsen. Dette kan du lese mer om i vår cookie-policy.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Kontakt oss</h2>
      <p>
        For spørsmål om personvern, kontakt oss på{" "}
        <a
          href="mailto:post@bytteklar.no"
          className="text-blue-600 hover:underline"
        >
          post@bytteklar.no
        </a>
        .
      </p>
    </main>
  );
}
