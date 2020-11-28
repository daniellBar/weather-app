import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { locationReducer } from './reducers/locationReducer';



// const rootReducer = combineReducers({
//     locationReducer
// })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(locationReducer, composeEnhancers(applyMiddleware(thunk)))