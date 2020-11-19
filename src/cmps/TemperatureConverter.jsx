import React from 'react'

export function TemperatureConverter({ minTemp, maxTemp, unit }) {
    if (unit === 'fahrenheit') {
        return (<div>{`${minTemp} / ${maxTemp}`}<span>&#8457;</span></div>)
    }
    else if (unit === 'celsius') {
        const minTempC = ((minTemp - 32) * (5 / 9)).toFixed()
        const maxTempC = ((maxTemp - 32) * (5 / 9)).toFixed()
        return (
            <div>{`${minTempC} / ${maxTempC}`}<span>&#8451;</span></div>
        )
    }
}