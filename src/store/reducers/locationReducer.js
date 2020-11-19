const initialState = {
    location: {},
    suggestedLocs: [],
    dailyForecasts: [],
    // unit: 'celsius'
}

export function locationReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_Locations':
            return {
                ...state,
                locations: action.locations
            }
        case 'SET_SUGGESTED':
            return {
                ...state,
                suggestedLocs: action.suggestedLocs
            }
        case 'SET_LOCATION':
            return {
                ...state,
                location: action.location
            }
        case 'REMOVE_Locations':
            return {
                ...state,
                locations: state.locations.filter(locations => locations._id !== action._id)
            }
        case 'SAVE_Locations':
            return { ...state, locations: state.locations.map(location => (location._id === action.savedlocation._id) ? action.savedlocation : location) }
        default:
            return state;
    }
}