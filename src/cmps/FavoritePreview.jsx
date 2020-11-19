import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { TemperatureConverter } from './TemperatureConverter'
import { loadLocation } from '../store/actions/locationAction.js'


export class _FavoritePreview extends Component {

    onFavoriteClicked = (locationInfo) => {
        this.props.loadLocation(locationInfo)
        this.props.history.push(`/`)
    }


    render() {
        const { favorite, onDelete, unit } = this.props;
        const minTempF = favorite.dailyForecasts[0].Temperature.Minimum.Value
        const maxTempF = favorite.dailyForecasts[0].Temperature.Maximum.Value
        const locationInfo = {
            locationKey: favorite.locationKey,
            locationName: favorite.locationName
        }
        return (
            <div className="favorite-preview" >
                <div className="favorite-info">
                    <div>{favorite.locationName}</div>
                    <div className="forecast-icon">
                        <img src={require(`../assets/imgs/icons/${favorite.dailyForecasts[0].Day.Icon}.png`)} alt="" />
                    </div>
                    <div className="description">{favorite.dailyForecasts[0].Day.IconPhrase}</div>
                    <TemperatureConverter minTemp={minTempF} maxTemp={maxTempF} unit={unit} />
                    <div className="btn" onClick={() => this.onFavoriteClicked(locationInfo)}>See Next Days</div>
                    <div className="btn del-btn" onClick={() => onDelete(locationInfo)}>remove</div>
                </div>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        location: state.locationReducer.location
    }
}

const mapDispatchToProps = {
    loadLocation
}

export const FavoritePreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_FavoritePreview))

