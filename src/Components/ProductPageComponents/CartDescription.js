import React from 'react'
import { Badge, Card, Col, ListGroup, Row, Button } from 'react-bootstrap'

const CartDescription = ({ product, addToCart}) => {
  return (
    <Card>
            <Card.Body>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>${product.price}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                {product.countInStock > 0 ?
                                    <Badge bg='success'>In Stock</Badge>
                                    :
                                    <Badge bg='danger'>Not in Stock</Badge>
                                }
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <div className='d-grid'>
                                <Button
                                    onClick={() => addToCart()}
                                    variant='primary'>
                                    Add to cart
                                </Button>
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
  )
}

export default CartDescription