import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_ADDRESS, USER_SIGNIN, USER_SIGNOUT, CLEAR_CART, SAVE_PAYMENT_METHOD } from "./Actions";

export const StoreReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
            {
                const newItem = payload;
                const existingItem = state.cart.cartItems.find(item => item._id === newItem._id);
                const cartItems = existingItem ?
                    state.cart.cartItems.map((item) => item._id === existingItem._id ? newItem : item)
                    : [...state.cart.cartItems, newItem];
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                return {
                    ...state,
                    cart: {
                        ...state.cart,
                        cartItems
                    }
                }
            }
    case REMOVE_FROM_CART:{

        const cartItems = state.cart.cartItems.filter((item) => item._id !== payload._id);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return {...state, cart: {...state.cart, cartItems }};
    }
    case CLEAR_CART:{
        localStorage.removeItem("cartItems");
        return {...state, cart: {...state.cart, cartItems: []}};
    }
    case USER_SIGNIN:{
        localStorage.setItem("userInfo", JSON.stringify(payload));
        return {...state, userInfo: payload };
    }
    case USER_SIGNOUT:{
        localStorage.removeItem("userInfo");
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("paymentMethod");
        localStorage.removeItem("cartItems");
        return {...state, userInfo: null ,cart: {cartItems: [] ,shippingAddress: {}, paymentMethod: ""}};
    }
    case SAVE_SHIPPING_ADDRESS:{
        localStorage.setItem("shippingAddress", JSON.stringify(payload));
        return {...state, cart: {...state.cart, shippingAddress: payload }};
    }
    case SAVE_PAYMENT_METHOD:{
        localStorage.setItem("paymentMethod", payload);
        return {...state, cart: {...state.cart, paymentMethod: payload }};
    }
    default:
      return state;
  }
};
