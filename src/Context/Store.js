import { createContext } from "react";
import { useReducer } from "react";
import { StoreReducer } from "../Reducers/StoreReducer";

export const Store = createContext();

const initState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: localStorage.getItem('paymentMethod')? localStorage.getItem('paymentMethod') : "",
    },
    userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null,
}

export function StoreProvider( props ) {
    const [state, dispatch] = useReducer(StoreReducer, initState);
    const  body = {
        state,
        dispatch
    }
    return (
        <Store.Provider value={body}>
            {props.children}
        </Store.Provider>
    )
}