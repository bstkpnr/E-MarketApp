import { all } from "redux-saga/effects";
import { watchAddToCart } from "./cartSagas"; 

export default function* rootSaga() {
    yield all([
        watchAddToCart(),
    ]);
}