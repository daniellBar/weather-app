import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { toggleUnits } from '../store/actions/locationAction.js'
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

    onDelete = (locationKey) => {
        locationService.toggleFromFavorites(locationKey);
        this.loadFavorites();
    }

    onChangeUnit = () => {
        const { firstUnit } = this.props.units
        this.props.toggleUnits(firstUnit)
    }

    render() {
        const { favorites } = this.state
        const { secondaryUnit, firstUnit } = this.props.units
        return <div className="favorites-page">
            <h2 className="fav-header">
                {`Your favorite locations forecast on ${moment(new Date()).format('MM/DD/YY')}`}
            </h2>
            {favorites && <div className="btn btn-unit" onClick={this.onChangeUnit} >{`View in ${secondaryUnit}`}</div>}
            <FavoriteList favorites={favorites} onDelete={this.onDelete} unit={firstUnit} />
        </div>
    }
}

const mapStateToProps = state => {
    return {
        units: state.units
    }
}

const mapDispatchToProps = {
    toggleUnits
}

export const Favorites = connect(mapStateToProps, mapDispatchToProps)(_Favorites)