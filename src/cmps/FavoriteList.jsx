import React from 'react'
import { FavoritePreview } from './FavoritePreview.jsx'

export function FavoriteList(props) {
    const { favorites, onDelete, unit } = props;
    return (
        <div className="favorite-list grid-list">
            {favorites.map(favorite => <FavoritePreview key={favorite.locationKey} favorite={favorite} onDelete={onDelete} unit={unit} />)}
        </div>
    )
} 