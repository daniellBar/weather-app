import { httpService } from './httpService.js';
import { storageService } from './storageService.js'

const WEATHER_KEY = 'n9HoCZLMDfWcspzwv3V0421FL510gcRI'
const GEOLOCATION_KEY = '18e66ae99e3b46a29d5f7a2bf59dd011'
const LOCATION_API = 'locationApi'
const FORECAST_API = 'forecastApi'
const GEOCODE_API = 'geocodeApi'

let gSuggested = {}
let gLocations = {}
let gFavorites = {}


export const locationService = {
    getSuggestedLocations,
    getLocation,
    getFavorites,
    toggleFromFavorites,
    getReverseGeocoding
}

async function getSuggestedLocations(query) {
    if (!query) return
    const suggestedFromStorage = _queryStorage(query, 'suggested')
    if (suggestedFromStorage) {
        console.log('found in storage');
        return suggestedFromStorage;
    }
    _loadSuggested()
    const queryStr = `cities/autocomplete?apikey=${WEATHER_KEY}&q=${query}`;
    const suggestedLocations = await httpService.get(queryStr, LOCATION_API);
    const reducedSuggestedLocations = suggestedLocations.map(location => {
        return {
            key: location.Key,
            localizedName: location.LocalizedName,
            country: location.Country.LocalizedName,
            type: location.Type,
            administrativeArea: location.AdministrativeArea.LocalizedName,
            fullDisplayName: `${location.LocalizedName}, ${location.AdministrativeArea.LocalizedName}, ${location.Country.LocalizedName}`
        }
    })
    gSuggested[query] = reducedSuggestedLocations;
    _saveSuggested();
    return reducedSuggestedLocations;
}

async function getLocation(locationInfo) {
    if (!locationInfo) return
    const { locationKey, locationName } = locationInfo;
    const locationFromStorage = _queryStorage(locationKey, 'locations')
    if (locationFromStorage && _checkDatesValidity(locationFromStorage)) {
        console.log('found in storage');
        return locationFromStorage;
    }
    _loadLocations();
    const queryStr = `${locationKey}?apikey=${WEATHER_KEY}`;
    const locationForecast = await httpService.get(queryStr, FORECAST_API);
    const location = {
        locationKey: locationKey,
        locationName: locationName,
        isFavorite: isFavorite(locationKey),
        dailyForecasts: locationForecast.DailyForecasts
    }
    gLocations[locationKey] = location;
    _saveLocations();
    return location;
}

async function getFavorites() {
    const favorites = storageService.loadFromStorage('favorites');
    gFavorites = favorites;
    _saveFavorites();
    return (
        await Promise.all(Object.keys(favorites).map(key => {
            const locationKey = key
            const locationName = favorites[key]
            return getLocation({ locationKey, locationName })
        }))
    )
}

async function getReverseGeocoding(lat, lng) {
    const geoQueryStr = `json?q=${lat},${lng}&key=${GEOLOCATION_KEY}&no_annotations=1`;
    const data = await httpService.get(geoQueryStr, GEOCODE_API);
    console.log(data);
    const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village;
    const country = data.results[0].components.country;
    const suggestedQueryStr = `${city}`
    console.log(suggestedQueryStr);
    const suggestedLocations = await getSuggestedLocations(suggestedQueryStr)
    return (suggestedLocations.map(location => {
        if (location.country === country && location.localizedName === city) {
            return {
                locationKey: location.key,
                locationName: location.localizedName
            }
        }
        else {
            return null
        }
    })[0])
}

function toggleFromFavorites(locationInfo) {
    const { locationKey, locationName } = locationInfo;
    const favorites = storageService.loadFromStorage('favorites');
    if (!favorites) {
        gFavorites[locationKey] = locationName
    }
    else {
        favorites.hasOwnProperty(locationKey) ? delete favorites[locationKey] : favorites[locationKey] = locationName;
        gFavorites = favorites;
    }
    _saveFavorites();
    _updateLocations(locationKey);
}


function _updateLocations(locationKey) {
    const location = _queryStorage(locationKey, 'locations')
    location.isFavorite = !location.isFavorite;
    const locations = storageService.loadFromStorage('locations');
    locations[locationKey] = location;
    gLocations = locations;
    _saveLocations()
}

function _checkDatesValidity(location) {
    const currDate = new Date()
    const firstDayOfForecast = new Date(location.dailyForecasts[0].EpochDate * 1000)
    return ((firstDayOfForecast.getDate() === currDate.getDate()) && (firstDayOfForecast.getMonth() === currDate.getMonth()));

}

// returns true/false 
function isFavorite(key) {
    const favorites = storageService.loadFromStorage('favorites');
    if (!favorites) return false;
    return favorites.hasOwnProperty(key);
}

// returns data if found
function _queryStorage(key, collection) {
    const data = storageService.loadFromStorage(collection)
    if (!data) return null
    if (data.hasOwnProperty(key)) {
        return data[key];
    }
    else return null
}

function _saveSuggested() {
    storageService.saveToStorage('suggested', gSuggested);
}

function _saveLocations() {
    storageService.saveToStorage('locations', gLocations);
}

function _saveFavorites() {
    storageService.saveToStorage('favorites', gFavorites);
}

function _loadSuggested() {
    const suggested = storageService.loadFromStorage('suggested')
    if (!suggested) return;
    gSuggested = suggested;

}

function _loadLocations() {
    const locations = storageService.loadFromStorage('locations');
    if (!locations) return;
    gLocations = locations
}











