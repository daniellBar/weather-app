const initialState = {
    location: {},
    suggestedLocations: [],
    units: {
        firstUnit: 'celsius',
        secondaryUnit: 'fahrenheit'
    }
}

export function locationReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SUGGESTED':
            return {
                ...state,
                suggestedLocations: action.suggestedLocations
            }
        case 'SET_LOCATION':
            return {
                ...state,
                location: action.location
            }
        case 'SET_UNITS':
            return {
                ...state,
                units: action.toggledUnits
            }
        default:
            return state;
    }
}