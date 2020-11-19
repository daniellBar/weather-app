import Axios from 'axios';

const FORECAST_URL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
const LOCATION_URL = 'http://dataservice.accuweather.com/locations/v1/'


var axios = Axios.create({
    withCredentials: false
});

export default {
    get(endpoint, data) {
        console.log('data-', data);
        return ajax(endpoint, 'GET', data)
    }
}

async function ajax(endpoint, method = 'get', data = null) {
    try {
        let baseUrl;
        if(data==='locationApi'){
            baseUrl=LOCATION_URL;
        }
        else if (data==='forecastApi'){
            baseUrl=FORECAST_URL;
        }
        else return;
        const res = await axios({
            url: `${baseUrl}${endpoint}`,
            method,
            data
        })
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`);
        console.dir(err);
        if (err.response && err.response.status === 401) {
            window.location.assign('/#/login');
        }
        throw err;
    }
}