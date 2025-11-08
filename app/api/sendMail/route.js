import nodemailer from "nodemailer";

const ADVISORS = {
  Storebrand: ["even.gronbech-hope@storebrand.no"],
  IF: ["evengrhope@outlook.com"],
  Gjensidige: ["even@igniteuit.no"],
  Tryg: ["egr085@uit.no"],
};

let advisorIndex = {
  Storebrand: 0,
  IF: 0,
  Gjensidige: 0,
  Tryg: 0,
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { kontakt, ...forsikringer } = body;

    const customerCompany = kontakt?.selskap?.trim();
    const allCompanies = Object.keys(ADVISORS);
    const targetCompanies = allCompanies.filter(
      (c) => c.toLowerCase() !== customerCompany?.toLowerCase()
    );
    const selectedCompanies = targetCompanies.slice(0, 3);

    const recipients = selectedCompanies.map((company) => {
      const advisors = ADVISORS[company];
      const index = advisorIndex[company] % advisors.length;
      const chosen = advisors[index];
      advisorIndex[company] = (advisorIndex[company] + 1) % advisors.length;
      return { company, email: chosen };
    });

    // 📦 Lag HTML for forsikringene
    const forsikringHTML = Object.entries(forsikringer)
      .filter(([_, arr]) => Array.isArray(arr) && arr.length > 0)
      .map(([type, arr]) => {
        const title = type.charAt(0).toUpperCase() + type.slice(1);
        const items = arr
          .map(
            (obj) =>
              `<div style="margin-bottom:10px; padding:10px; background:#f9fafb; border-radius:8px;">
                ${Object.entries(obj)
                  .map(
                    ([key, val]) =>
                      `<p style="margin:0;"><strong>${key}:</strong> ${val || "-"}</p>`
                  )
                  .join("")}
              </div>`
          )
          .join("");
        return `
          <div style="margin-bottom:20px;">
            <h3 style="color:#1e40af; font-size:18px; margin-bottom:6px;">${title}</h3>
            ${items}
          </div>`;
      })
      .join("");

    // 🧩 Formater fødselsdato pent
    const formattedBirthdate = kontakt?.fodselsdato
      ? new Date(kontakt.fodselsdato).toLocaleDateString("no-NO")
      : "-";

    // 📧 Bygg HTML-body med de nye feltene inkludert
    const htmlBody = `
      <div style="font-family:Arial, sans-serif; color:#111827; background-color:#ffffff; padding:24px; border-radius:12px; max-width:600px; margin:auto; border:1px solid #e5e7eb;">
        <h2 style="color:#1e3a8a; text-align:center;">Ny kundeforespørsel via Safebid</h2>

        <div style="margin-top:20px;">
          <h3 style="color:#1e40af;">Kontaktinformasjon</h3>
          <p><strong>Navn:</strong> ${kontakt?.navn || "-"}</p>
          <p><strong>Fødselsdato:</strong> ${formattedBirthdate}</p>
          <p><strong>E-post:</strong> ${kontakt?.epost || "-"}</p>
          <p><strong>Telefon:</strong> ${kontakt?.telefon || "-"}</p>
          <p><strong>Nåværende selskap:</strong> ${kontakt?.selskap || "-"}</p>
          <p><strong>Antall skader siste tre år:</strong> ${kontakt?.skader || "-"}</p>
        </div>

        <hr style="margin:20px 0; border:0; border-top:1px solid #e5e7eb;" />

        <div>
          <h3 style="color:#1e40af;">Valgte forsikringer</h3>
          ${forsikringHTML || "<p>Ingen forsikringer valgt.</p>"}
        </div>

        <hr style="margin:20px 0; border:0; border-top:1px solid #e5e7eb;" />

        <p style="font-size:13px; color:#6b7280; text-align:center; margin-top:16px;">
          Denne forespørselen ble sendt automatisk fra <strong>Safebid.no</strong><br/>
          Svar direkte på denne e-posten for å kontakte kunden.
        </p>
      </div>
    `;

    // ✉️ Sett opp Nodemailer-transportør
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // 📬 Send e-post til utvalgte rådgivere
    for (const { email } of recipients) {
      await transporter.sendMail({
        from: `"Safebid.no" <${process.env.MAIL_USER}>`,
        to: email,
        bcc: "safebid95@gmail.com",
        subject: `Ny kundeforespørsel via Safebid – ${kontakt?.navn || "Ukjent kunde"}`,
        html: htmlBody,
      });
      console.log(`✅ E-post sendt til ${email}`);
    }

    // 📘 Logg
    console.log("📘 Anbud loggført:", {
      tidspunkt: new Date().toISOString(),
      kunde: kontakt,
      sendtTil: recipients,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ FULL E-POSTFEIL:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.stack || error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
