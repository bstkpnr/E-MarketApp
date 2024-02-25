import {
  ADD_TO_CART,
  ADD_TO_CART_ASYNC,
  ADD_TO_FAVORITES,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from "./types";

export const addToCartAsync = (product) => ({
  type: ADD_TO_CART_ASYNC,
  payload: product,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const increaseQuantity = (id) => ({
  type: INCREASE_QUANTITY,
  payload: id,
});

export const decreaseQuantity = (id) => ({
  type: DECREASE_QUANTITY,
  payload: id,
});

export const addToFavorites = (product) => ({
  type: ADD_TO_FAVORITES,
  payload: product,
});
export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

