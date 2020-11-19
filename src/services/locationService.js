
import moment from 'moment';
import httpService from './httpService.js';
import { storageService } from './storageService.js'


const KEY = 'n9HoCZLMDfWcspzwv3V0421FL510gcRI'
const LOCATION_API = 'locationApi'
const FORECAST_API = 'forecastApi'

let gSuggested = {}
let gLocations = {}
let gFavorites = {}


export const locationService = {
    getSuggested,
    getLocation,
    getFavorites,
    toggleFromFavorites
}

async function getSuggested(input) {
    if (input === '' || input === null) return
    const suggestedFromStorage = _queryStorage(input, 'suggested')
    if (suggestedFromStorage) {
        console.log('found in storage');
        return suggestedFromStorage;
    }
    _loadSuggested()
    const queryStr = `cities/autocomplete?apikey=${KEY}&q=${input}`;
    const suggested = await httpService.get(queryStr, LOCATION_API);
    console.log(suggested);
    const reducedSuggested = suggested.map(location => {
        return {
            key: location.Key,
            localizedName: location.LocalizedName,
            country: location.Country.LocalizedName,
            type: location.Type,
            administrativeArea: location.AdministrativeArea.LocalizedName,
            fullDisplayName: `${location.LocalizedName}, ${location.AdministrativeArea.LocalizedName}, ${location.Country.LocalizedName}`
        }
    })
    console.log(reducedSuggested);
    gSuggested[input] = reducedSuggested;
    _saveSuggested();
    return reducedSuggested;
}

async function getLocation(locationInfo) {
    if (!locationInfo) return
    const { locationKey, locationName } = locationInfo;
    const locationFromStorage = _queryStorage(locationKey, 'locations')
    if (locationFromStorage) {
        console.log('found in storage');
        console.log(_checkDatesValidity(locationFromStorage));
        if (_checkDatesValidity(locationFromStorage)) {
            console.log('im inside validity if');
            return locationFromStorage;
        }
    }
    _loadLocations();
    const queryStr = `${locationKey}?apikey=${KEY}`;
    const locationForecast = await httpService.get(queryStr, FORECAST_API);
    const location = {
        locationKey: locationKey,
        locationName: locationName,
        isFavorite: _isFoundOnFavorites(locationKey),
        dailyForecasts: locationForecast.DailyForecasts
    }
    gLocations[locationKey] = location;
    console.log(gLocations);
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

function toggleFromFavorites(locationInfo) {
    const { locationKey, locationName } = locationInfo;
    console.log(locationKey);
    console.log(locationName);
    const favorites = storageService.loadFromStorage('favorites');
    if (!favorites) {
        console.log('helloo');
        gFavorites[locationKey] = locationName
        console.log(gFavorites);
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
function _isFoundOnFavorites(key) {
    const favorites = storageService.loadFromStorage('favorites');
    if (!favorites) return false;
    return favorites.hasOwnProperty(key);
}

// returns data if found
function _queryStorage(key, collection) {
    const data = storageService.loadFromStorage(collection)
    if (!data) return false
    if (data.hasOwnProperty(key)) {
        return data[key];
    }
    else return false
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











