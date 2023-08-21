import React, { useContext, useEffect, useReducer } from 'react'
import { Store } from '../../Context/Store';
import MsgBox from '../../Components/MsgBox/MsgBox';
import Loading from '../../Components/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { productPageReducer } from '../../Reducers/productPageReducer';
import { AddToCartHandler } from '../../Services/AddToCart';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../../Reducers/Actions';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import CartDescription from '../../Components/ProductPageComponents/CartDescription';
import ProductDescription from '../../Components/ProductPageComponents/ProductDescription';

const ProductPage = () => {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch} = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const initialState = {
    loading: true,
    error: '',
    products: []
  }

  const [{loading, error, product}, dispatch] = useReducer(
    productPageReducer,
    initialState
  );

  const addToCart = async () => {
    await AddToCartHandler(product, cartItems, ctxDispatch);
    navigate('/cart');
  }

  useEffect(() => {
    const getProduct = async () =>{
      dispatch({ type: GET_REQUEST});

      try {
        const res = await axios.get(`/products/token/${token}`);
        dispatch({ type: GET_SUCCESS, payload: res.data});
      }
      catch(err){
        dispatch({ type: GET_FAIL, payload: err.message });
      }
    };
    getProduct();
  }, [token]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MsgBox variant="danger">{error}</MsgBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img 
              src={`${product.image}`}
              alt={product.title}
              className='card-img-top card-image'
              />
            </Col>
            <Col md={3}>
              <ProductDescription {...product}/>
            </Col>

            <Col md={3}>
              <CartDescription product={product} addToCart={addToCart}/>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductPage