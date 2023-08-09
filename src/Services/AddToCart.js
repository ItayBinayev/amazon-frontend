import axios from "axios";
import { toast } from "react-toastify";
import { ADD_TO_CART, GET_FAIL } from "../Reducers/Actions";

export const AddToCartHandler = async (product,cartItems,ctxDispatch) => {
    const ExistingItems = cartItems.find(item => item._id === product._id);
    const quantity = ExistingItems? ExistingItems.quantity + 1 : 1;
    try{
        const {data} = await axios.get('products/id/' + product._id)
        if(data.countInStock < quantity){
            toast.error("Sorry, we can't add that item to your cart");
            return;
        }
        ctxDispatch({type: ADD_TO_CART, payload: {...product, quantity}});
    }
    catch(err){
        ctxDispatch({type: GET_FAIL,payload: err.message});
        }
}