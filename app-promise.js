import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getGeoCode, getForecast } from "./geocode/geocode.js";
import axios from "axios";

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


