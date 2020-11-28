
import { Favorites } from './pages/Favorites.jsx'
import { WeatherApp } from './pages/WeatherApp.jsx'


export default [
    {
        path: '/favorites/',
        component: Favorites
    },
    {
        path: '/',
        component: WeatherApp,
    },
]