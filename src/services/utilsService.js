
const UNITS = ['celsius', 'fahrenheit']

export const utilsService = {
    toggleUnits
}

function toggleUnits(firstUnit) {
    if (firstUnit === UNITS[0]) {
        return {
            firstUnit: UNITS[1],
            secondaryUnit: UNITS[0]
        }
    }
    else if (firstUnit === UNITS[1]) {
        return {
            firstUnit: UNITS[0],
            secondaryUnit: UNITS[1]
        }
    }
}