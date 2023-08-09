import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Store } from '../../Context/Store';
import { Title } from '../../Components/Title/Title.js';
import { Col, Row } from 'react-bootstrap';
import Cart from '../../Components/Cart/Cart.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ADD_TO_CART, GET_FAIL, REMOVE_FROM_CART } from '../../Reducers/Actions';
import  Total  from '../../Components/Total/Total.js';

const CartPage = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
      cart,
      userInfo,
    } = state;
  
    const { cartItems } = cart;
    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }
    const updateCartHandler = async (item , quantity) => {
        try{
            const {data} = await axios.get("/products/id/" + item._id)
            if(data.countInStock < quantity)
            {
                toast.error('Sorry , we don\'t have enough in stock to complete');
                return;
            }
            ctxDispatch({type: ADD_TO_CART, payload: {...item, quantity}})
        }
        catch(err){
            ctxDispatch({ type: GET_FAIL, payload: err.message });
        }
    }

    const removeItemHandler = (item) => {
        ctxDispatch({type: REMOVE_FROM_CART , payload: item})
    }

    return (
    <div>
        <Title children="Shopping Cart">
        </Title>
        <Row>
            <Col md={8}>
                <Cart cartItems={cartItems} updateCartHandler={updateCartHandler} removeCartHandler={removeItemHandler}></Cart>
            </Col>
            <Col md={4}>
                <Total cartItems={cartItems} checkoutHandler={checkoutHandler}>

                </Total>
            </Col>
        </Row>
    </div>
  )
}

export default CartPage