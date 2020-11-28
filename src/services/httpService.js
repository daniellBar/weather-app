import Axios from 'axios';

const FORECAST_URL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
const LOCATION_URL = 'http://dataservice.accuweather.com/locations/v1/'
const GEOCODE_URL = 'https://api.opencagedata.com/geocode/v1/'



var axios = Axios.create({
    withCredentials: false
});

export const httpService = {
    get(endpoint, data) {
        console.log('data-', data);
        return ajax(endpoint, 'GET', data)
    }
}

async function ajax(endpoint, method = 'get', data = null) {
    try {
        let baseUrl;
        if (data === 'locationApi') {
            baseUrl = LOCATION_URL;
        }
        else if (data === 'forecastApi') {
            baseUrl = FORECAST_URL;
        }
        else if (data === 'geocodeApi') {
            baseUrl = GEOCODE_URL;
        }
        const res = await axios({
            url: `${baseUrl}${endpoint}`,
            method,
            data
        })
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the API, endpoint: ${endpoint}, with data: ${data}`);
        console.dir(err);
        throw err;
    }
}