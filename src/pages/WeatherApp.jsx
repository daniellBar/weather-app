import React, { Component } from "react";
import { connect } from "react-redux";
import { loadLocation, toggleUnits } from '../store/actions/locationAction.js'
import { ForecastList } from '../cmps/ForecastList.jsx'
import Icon from '@material-ui/core/Icon';
import { locationService } from "../services/locationService.js";

class _WeatherApp extends Component {

    componentDidMount() {
        const { location } = this.props;
        if (JSON.stringify(location) === '{}') {
            navigator.geolocation.getCurrentPosition(async position => {
                const locationInfo = await locationService.getReverseGeocoding(position.coords.latitude, position.coords.longitude)
                locationInfo ? this.props.loadLocation(locationInfo) : this.props.loadLocation({ locationKey: '215854', locationName: 'Tel Aviv' })
            })
        }
    }

    onToggleFromFavorites = () => {
        const { locationKey, locationName } = this.props.location
        locationService.toggleFromFavorites({ locationKey, locationName })
        this.props.loadLocation({ locationKey, locationName })
    }

    onChangeUnit = () => {
        const { firstUnit } = this.props.units
        this.props.toggleUnits(firstUnit)
    }

    render() {
        const { dailyForecasts, isFavorite, locationName } = this.props.location
        const { firstUnit, secondaryUnit } = this.props.units
        return <div className="weather-app">
            <h2 className="location-name">
                {locationName}
            </h2>
            {dailyForecasts &&
                <>
                    <div className={`btn btn-fav ${isFavorite ? 'active' : ''}`} onClick={this.onToggleFromFavorites}>
                        <Icon className={isFavorite ? 'fas fa-heart' : 'far fa-heart'} />
                    </div>
                    <div className="btn btn-unit" onClick={this.onChangeUnit} >{`View in ${secondaryUnit}`}</div>
                    <ForecastList dailyForecasts={dailyForecasts} unit={firstUnit} />
                </>
            }
        </div>
    }
}

const mapStateToProps = state => {
    return {
        location: state.location,
        units: state.units
    }
}

const mapDispatchToProps = {
    loadLocation,
    toggleUnits
}

export const WeatherApp = connect(mapStateToProps, mapDispatchToProps)(_WeatherApp)