import { FETCH_PRODUCTS, FETCH_SIZES, FILTERED_ITEMS, CART_ITEMS, REMOVE_FROM_CART, UPDATE_CART } from "../types";
const initialState = {
    cartItems: [],
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                items: action.payload
            };
        case FETCH_SIZES:
            return {
                ...state,
                allSizes: action.payload
            };
        case FILTERED_ITEMS:
            return {
                ...state,
                selectedSize: action.payload.size,
                filteredItems: action.payload.items
            };
        case CART_ITEMS:

            return {
                ...state,
                cartItems: JSON.parse(action.payload),

            };
        case REMOVE_FROM_CART:

            return {
                ...state,
                cartItems: JSON.parse(action.payload),

            };
        case UPDATE_CART:

            return {
                ...state,
                cartItems: JSON.parse(action.payload),

            };

        default:
            return state;

    }
}