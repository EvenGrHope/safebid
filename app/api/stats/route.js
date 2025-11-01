import fs from "fs";
import path from "path";

const LOG_PATH = path.join(process.cwd(), "logs", "anbud-logg.json");

export async function GET() {
  if (!fs.existsSync(LOG_PATH)) {
    return new Response(JSON.stringify({ stats: {} }), { status: 200 });
  }

  const logData = JSON.parse(fs.readFileSync(LOG_PATH, "utf8"));
  const stats = {};

  for (const entry of logData) {
    for (const sendt of entry.sendtTil) {
      if (!stats[sendt.selskap]) stats[sendt.selskap] = 0;
      stats[sendt.selskap]++;
    }
  }

  return new Response(JSON.stringify({ total: logData.length, stats }), {
    status: 200,
  });
}
