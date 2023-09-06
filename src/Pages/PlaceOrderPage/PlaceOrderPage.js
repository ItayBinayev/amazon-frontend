import React, { useContext, useReducer, useEffect } from "react";
import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAIL,
  CLEAR_CART,
} from "../../Reducers/Actions";
import { Store } from "../../Context/Store";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, Row, Col, ListGroup, Button } from "react-bootstrap";
import { Title } from "../../Components/Title/Title";
import CheckoutSteps from "../../Components/CheckoutSteps/CheckoutSteps";
import Loading from "../../Components/Loading/Loading";

const reducer = (state, { type }) => {
    switch (type) {
      case GET_REQUEST:
        return { ...state, loading: true};
      case GET_SUCCESS:
        return { ...state, loading: false};
      case GET_FAIL:
        return { ...state, loading: false};
  
      default:
        return state;
    }
  };
  const PlaceOrderPage = () => {
     const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const navigate = useNavigate();
    const { cart, userInfo } = state;
    const { paymentMethod } = cart;
  
    const submitOrderHandler = async (e) => {
      try {
        e.preventDefault();
        dispatch({ type: GET_REQUEST });
        const { data } = await axios.post("/orders", {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice : cart.itemsPrice,
          shippingPrice : cart.shippingPrice,
          taxPrice : cart.taxPrice,
          totalPrice : cart.totalPrice,
        },
        {
          headers: {
            authorization:userInfo.token
          }
        }
        );
        dispatch({ type: GET_SUCCESS});
        ctxDispatch({ type: CLEAR_CART});
        navigate(`/order/${data.order._id}`);
  
      } catch (error) {
          dispatch({ type: GET_FAIL });
          toast.error(error.message);
      }
    };
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON)/100;
    cart.itemsPrice = round2(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
    cart.taxPrice = round2(cart.itemsPrice *0.17);
    cart.shippingPrice = round2(cart.itemsPrice  > 50 ? cart.itemsPrice * 0.1 : cart.itemsPrice * 0.02);
    cart.totalPrice = round2(cart.itemsPrice + cart.shippingPrice + cart.taxPrice);
  
    useEffect(() => {
      
      if(!paymentMethod){
          navigate("/payment");
      }
    },[paymentMethod])

  return (
    <div>
      <Title title="Orders Summary" />
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="my-3">Orders Summary</h1>
      <Row className="blblaasda">
        <Col md={8}>
          
        <Card className="mb-3">
             <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong>
                {cart.shippingAddress.fullName}
                <br />
                <strong>Address: </strong>
                {cart.shippingAddress.address}
                <br />
                <strong>City: </strong>
                {cart.shippingAddress.city}
                <br />
                <strong>Country: </strong>
                {cart.shippingAddress.country}
              </Card.Text>
            </Card.Body> 
          </Card>
          
          
          <Card className="mb-3">
             <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
         
          <Card className="mb-3">
            <Card.Body className="container">
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded img-thumbnail"
                        />{" "}
                        <Link to={`/product/${item.token}`}>{item.title}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Summary: </Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items: </Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping: </Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax: </Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total: </Col>
                    <Col>
                      <strong>${cart.totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={submitOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Submit
                    </Button>
                  </div>
                   {loading && <Loading />} 
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default PlaceOrderPage;
