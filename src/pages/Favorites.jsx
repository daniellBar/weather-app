import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { loadLocation, toggleUnits } from '../store/actions/locationAction.js'
import { FavoriteList } from '../cmps/FavoriteList.jsx';
import { locationService } from '../services/locationService.js';

class _Favorites extends Component {

    state = {
        favorites: []
    }

    componentDidMount() {
        this.loadFavorites();
    }

    loadFavorites = async () => {
        const favorites = await locationService.getFavorites();
        this.setState({ favorites: favorites })
    }

    onDelete = (locationInfo) => {
        locationService.toggleFromFavorites(locationInfo);
        this.loadFavorites();
        this.updatePropLocation(locationInfo)
    }

    onChangeUnit = () => {
        const { firstUnit } = this.props.units
        this.props.toggleUnits(firstUnit)
    }

    //function for specfic case when location removed from favorites is the location in the prop
    updatePropLocation = (locationInfo) => {
        const { location } = this.props
        if (location.locationKey === locationInfo.locationKey && location.locationName === locationInfo.locationName) {
            this.props.loadLocation(locationInfo)
        }
    }

    render() {
        const { favorites } = this.state
        const { secondaryUnit, firstUnit } = this.props.units
        return <section className="favorites-page">
            <h2 className="favorites-page-title">
                {`Your favorite locations forecast on ${moment(new Date()).format('MM/DD/YY')}`}
            </h2>
            {favorites && <div className="btn btn-unit" onClick={this.onChangeUnit} >{`View in ${secondaryUnit}`}</div>}
            <FavoriteList favorites={favorites} onDelete={this.onDelete} unit={firstUnit} />
        </section>
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

export const Favorites = connect(mapStateToProps, mapDispatchToProps)(_Favorites)