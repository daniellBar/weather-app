import { locationService } from '../../services/locationService.js'
import { utilsService } from '../../services/utilsService.js'


export function loadLocation(locationInfo) {
  return async dispatch => {
    const location = await locationService.getLocation(locationInfo)
    dispatch({ type: 'SET_LOCATION', location })
  }
}

export function loadSuggestedLocations(query) {
  return async dispatch => {
    const suggestedLocations = await locationService.getSuggestedLocations(query)
    dispatch({ type: 'SET_SUGGESTED', suggestedLocations })
  }
}

export function toggleUnits(unit) {
    const toggledUnits = utilsService.toggleUnits(unit);
    return { type: 'SET_UNITS', toggledUnits }
  }



