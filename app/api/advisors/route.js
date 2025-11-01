import fs from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "data", "advisors.json");

export async function GET() {
  try {
    const advisors = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    return new Response(JSON.stringify(advisors), { status: 200 });
  } catch (err) {
    console.error("Feil ved henting av rådgivere:", err);
    return new Response(JSON.stringify({ error: "Kunne ikke lese advisor-fil" }), { status: 500 });
  }
}
