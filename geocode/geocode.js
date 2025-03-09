
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const geoKey = process.env.GEOCODE_API_KEY;
const weatherKey = process.env.WEATHER_API_KEY;

export async function getGeoCode(address) {

    try{
        var encodedAddress = encodeURIComponent(address);

        const url = `https://api.opencagedata.com/geocode/v1/json?key=${geoKey}&q=${encodedAddress}`;

        const response = await fetch(url);

        if(!response.ok){

            throw new Error(`HTTP Error Geocode! Status: ${response.status}`);

        }else{
            
            const data = await response.json();

            if(data.total_results === 0){
                throw new Error('Error fetching data: ', error.message);
            }else{
                console.log(data.results[0].formatted);
                console.log(data.results[0].geometry.lat);
                console.log(data.results[0].geometry.lng);
                return data.results[0].geometry;
            }
        }
    }catch(error){
        console.error('Error fetching Geocode: ', error.message);
    }

}

export async function getForecast(lat, lng) {
    try{
        const q = `${lat},${lng}`;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${q}`;

        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`HTTP Error Forecast! Status: ${response.status}`);
        }else{
            const data = await response.json();
            console.log(data.current.temp_c);
        }

    }catch(error){
        console.log(error.message);
    }
}