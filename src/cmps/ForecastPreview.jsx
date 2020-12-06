import React from "react";
import moment from 'moment'
import { TemperatureConverter } from './TemperatureConverter.jsx'


export function ForecastPreview(props) {
    const { forecast,unit } = props;
    const minTempF = forecast.Temperature.Minimum.Value;
    const maxTempF = forecast.Temperature.Maximum.Value;
    return (
        <section className="forecast-preview" >
            <div className="forecast-info">
                <div className="forcest-date">{moment(forecast.Date).format('ddd MM/DD/YY')}</div>
                <div className="forecast-icon">
                    <img src={require(`../assets/imgs/icons/${forecast.Day.Icon}.png`)} alt="" />
                </div>
                <div className="forcest-description">{forecast.Day.IconPhrase}</div>
                <TemperatureConverter minTemp={minTempF} maxTemp={maxTempF} unit={unit} />
                <a className="read-more" target="_blank" href={forecast.Link}>Read More</a>
            </div>
        </section>)
}

