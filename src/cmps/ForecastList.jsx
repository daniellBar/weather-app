import React from "react";
import { ForecastPreview } from './ForecastPreview'

export function ForecastList({ dailyForecasts,unit }) {
  return (
    <div className="forecast-list grid-list">
      {
        dailyForecasts.map((forecast,idx) => ( 
          <ForecastPreview forecast={forecast} key={idx} unit={unit} />
        ))
      }
    </div>
  );
}

