import React, { Component } from "react";
import moment from 'moment';
import { FavoriteList } from '../cmps/FavoriteList.jsx';
import { locationService } from '../services/locationService.js';

const units = ['celsius', 'fahrenheit']

export class Favorites extends Component {

    state = {
        favorites: [],
        unit: 'celsius',
        secondaryUnit: 'fahrenheit'
    }

    componentDidMount() {
        this.loadFavorites();
    }

    loadFavorites = async () => {
        console.log('hello favorites');
        const favorites = await locationService.getFavorites();
        this.setState({ favorites: favorites }, () => { console.log(this.state.favorites); })
    }

    onDelete = (locationKey) => {
        locationService.toggleFromFavorites(locationKey);
        this.loadFavorites();
    }

    onChangeUnit = () => {
        if (this.state.unit === units[0]) {
            this.setState({ unit: units[1], secondaryUnit: units[0] })
        }
        else if (this.state.unit === units[1])
            this.setState({ unit: units[0], secondaryUnit: units[1] })
    }

    render() {
        const { favorites, secondaryUnit,unit } = this.state
        return <div className="favorites-page">
            <h2 className="fav-header">
                {`Your favorite locations forecast on ${moment(new Date()).format('MM/DD/YY')}`}
            </h2>
            {favorites && <div className="btn btn-unit" onClick={this.onChangeUnit} >{`View in ${secondaryUnit}`}</div>}
            <FavoriteList favorites={favorites} onDelete={this.onDelete} unit={unit}/>
        </div>
    }
}