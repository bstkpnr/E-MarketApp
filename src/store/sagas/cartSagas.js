import { takeLatest, put,select } from 'redux-saga/effects';
import { ADD_TO_CART_ASYNC, ADD_TO_CART ,CLEAR_TO_CART,REMOVE_FROM_CART} from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* addToCartSaga(action) {
    yield put({ type: ADD_TO_CART, payload: action.payload });
    const cartItems = yield select(state => state.cartReducer.cartItems);
        yield AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
}


export function* watchAddToCart() { 
    yield takeLatest(ADD_TO_CART_ASYNC, addToCartSaga);
   
}

