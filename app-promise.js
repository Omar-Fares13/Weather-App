import yargs from "yargs";
import { hideBin } from "yargs/helpers";
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

const encodedAddress = encodeURIComponent(argv.a);

const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?key=ccbded3792c146c391baad3f1e7d7f8e&q=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
  if (response.data.total_results === 0) {
    throw new Error("Unable to find this address.");
  } else {
    const lat = response.data.results[0].geometry.lat;
    const lng = response.data.results[0].geometry.lng;
    console.log("Latitude:", lat, "Longitude:", lng);

    // Now fetch the weather using the obtained coordinates
    const key = "91e89eb58c8349dfbc8150907252202";
    const q = `${lat},${lng}`;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${q}`;

    return axios.get(url);
  }
}).then((response) => {
  console.log("Temperature:", response.data.current.temp_c);
}).catch((e) => {
  if (e.code === "ENOTFOUND") {
    console.log("Unable to connect to the API server.");
  } else {
    console.log(e.message);
  }
});
