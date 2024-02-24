import { ADD_TO_CART, DECREASE_QUANTITY, INCREASE_QUANTITY,ADD_TO_FAVORITES, CLEAR_TO_CART ,REMOVE_FROM_CART} from "../actions/types";

const initialState = {
    cartItems: []
};
const initialFavoritesState={
    favoriCartItems:[]
}
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
            };
        case INCREASE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                )
            };
        case DECREASE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                )
            };
        default:
            return state;
    }
};

  
export const favoritesReducer = (state = initialFavoritesState, action) => {
    switch (action.type) {
      case ADD_TO_FAVORITES:
        const isItemInFavorites = state.favoriCartItems.some(item => item.id === action.payload.id);
        if (!isItemInFavorites) {
          return {
            ...state,
            favoriCartItems: [...state.favoriCartItems, action.payload],
          };
        } else {
          return {
            ...state,
            favoriCartItems: state.favoriCartItems.filter(item => item.id !== action.payload.id),
          };
        }
      default:
        return state;
    }
  };
  