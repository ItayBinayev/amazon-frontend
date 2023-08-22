import React, { useContext, useEffect, useReducer } from 'react'
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../../Reducers/Actions';
import { Store } from '../../Context/Store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Title } from '../../Components/Title/Title';
import MsgBox from '../../Components/MsgBox/MsgBox';
import Loading from '../../Components/Loading/Loading';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

const reducer = (state, { type, payload }) => {
    switch (type) {
      case GET_REQUEST:
        return { ...state, loading: true, error: '' };
      case GET_SUCCESS:
        return { ...state, loading: false, order: payload, error: '' };
      case GET_FAIL:
        return { ...state, loading: false, error: payload };
      
      default:
        return state;
    }
  };
  

const OrderPage = () => {
    const {
        state: { userInfo },
    } = useContext(Store);

    const params = useParams();
    const { orderId } = params;
    const navigate = useNavigate();

    const [{ loading, error, order}, dispatch] = useReducer(reducer, {
        loading: true,
        order: null,
        error: '',
    })

      
    useEffect(() => {
        const getOrder = async () => {
            dispatch({ type: GET_REQUEST});
            try{
                const { data } = await axios.get(`/orders/${orderId}`,{
                    headers: { authorization: `${userInfo.token}`},
                });
                dispatch({ type: GET_SUCCESS, payload: data})
            }
            catch(err){
                dispatch({ type: GET_FAIL, payload: err.message})
            }
        };
        if(!userInfo)
        {
            navigate('/signin');
        }
        if(!order || (order._id && orderId !== order._id))
        {
            getOrder()
        }
    },[navigate, order, orderId, userInfo])

  return loading ? (
    <Loading />
  ) 
  : 
  error ? (
    <MsgBox variant="danger">{error}</MsgBox>
  ) 
  : (
  <div>
    <Title title="Order" />
      <h1 className="my-3">Order {order._id.substr(order._id.length - 5)}</h1>
      <Row className="container">
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body className='card-fkng-body'>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city} ,{order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MsgBox variant="success">
                  Delivered at {order.deliveredAt}
                </MsgBox>
              ) : (
                <MsgBox variant="danger">Not Delivered</MsgBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body className='card-fkng-body'>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MsgBox variant="success">
                  Paid at {order.paidAt}
                </MsgBox>
              ) : (
                <MsgBox variant="danger">Not Paid</MsgBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
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
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );

}

export default OrderPage