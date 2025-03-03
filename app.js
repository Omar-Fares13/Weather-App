import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getGeoCode, getForecast } from "./geocode/geocode.js";

const argv = yargs(hideBin(process.argv))
  .option("a", {
    demandOption: true,
    alias: "address",
    describe: "Address to fetch weather for",
    type: "string",
  })
  .help()
  .alias("help", "h")
  .parse();

async function main() {
  try {
    const geo = await getGeoCode(argv.a);
    if (geo) { 
      await getForecast(geo.lat, geo.lng);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main(); // Run the async function