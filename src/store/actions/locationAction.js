import { locationService } from '../../services/locationService.js'
import { utilsService } from '../../services/utilsService.js'


export function loadLocation(locationInfo) {
  return async dispatch => {
    try {
      const location = await locationService.getLocation(locationInfo)
      dispatch({ type: 'SET_LOCATION', location })
    }
    catch (err) {
      console.log('locationActions: err in loadLocation ', err);
    }

  }
}

export function loadSuggestedLocations(query) {
  return async dispatch => {
    try {
      const suggestedLocations = await locationService.getSuggestedLocations(query)
      dispatch({ type: 'SET_SUGGESTED', suggestedLocations })
    }
    catch (err) {
      console.log('locationActions: err in loadSuggestedLocations ', err);
    }
  }
}

export function toggleUnits(unit) {
  const toggledUnits = utilsService.toggleUnits(unit);
  return { type: 'SET_UNITS', toggledUnits }
}



