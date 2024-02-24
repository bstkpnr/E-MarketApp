import { combineReducers } from 'redux';
import { cartReducer, favoritesReducer } from './cardReducer';
const rootReducer = combineReducers({
    cart: cartReducer ,
    favorites:favoritesReducer
});


export default rootReducer;