import React, { Component } from "react";
import { connect } from "react-redux";
import { loadLocation, loadSuggestedLocations } from '../store/actions/locationAction.js'
import { ForecastList } from '../cmps/ForecastList.jsx'
import Icon from '@material-ui/core/Icon';
import { locationService } from "../services/locationService.js";

const units = ['celsius', 'fahrenheit']

class _WeatherApp extends Component {

    state = {
        unit: 'celsius',
        secondaryUnit: 'fahrenheit'
    }

    componentDidMount() { }

    onToggleFromFavorites = () => {
        const { locationKey, locationName } = this.props.location
        locationService.toggleFromFavorites({ locationKey, locationName })
        this.props.loadLocation({ locationKey, locationName })
    }

    onChangeUnit = () => {
        if (this.state.unit === units[0]) {
            this.setState({ unit: units[1], secondaryUnit: units[0] })
        }
        else if (this.state.unit === units[1])
            this.setState({ unit: units[0], secondaryUnit: units[1] })
    }


    render() {
        const { dailyForecasts, isFavorite, locationName } = this.props.location
        const { unit, secondaryUnit } = this.state
        return <div className="weather-app">
            <h2 className="location-name">
                {locationName}
            </h2>
            {dailyForecasts && <div className={isFavorite ? 'btn btn-fav active' : 'btn btn-fav'} onClick={this.onToggleFromFavorites}>
                <Icon className={isFavorite ? 'fas fa-heart' : 'far fa-heart'} />
            </div>}
            {dailyForecasts && <div className="btn btn-unit" onClick={this.onChangeUnit} >{`View in ${secondaryUnit}`}</div>}
            {dailyForecasts && <ForecastList dailyForecasts={dailyForecasts} unit={unit} />}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        suggestedLocs: state.locationReducer.suggestedLocs,
        location: state.locationReducer.location
    }
}

const mapDispatchToProps = {
    loadLocation,
    loadSuggestedLocations
}

export const WeatherApp = connect(mapStateToProps, mapDispatchToProps)(_WeatherApp)