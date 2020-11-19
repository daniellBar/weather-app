import { locationService } from '../../services/locationService.js'


export function loadLocation(locationInfo) {
  return async dispatch => {
    const location = await locationService.getLocation(locationInfo)
    dispatch({ type: 'SET_LOCATION', location })
  }
}

export function loadSuggestedLocations(input) {
  return async dispatch => {
    const suggestedLocs = await locationService.getSuggested(input)
    dispatch({ type: 'SET_SUGGESTED', suggestedLocs })
  }
}


