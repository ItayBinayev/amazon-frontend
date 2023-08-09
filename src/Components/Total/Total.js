import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

const Total = ({ cartItems, checkoutHandler }) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ).toFixed(2)
  return (
    <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>
              Subtotal (
              {totalItems} items) :
              {" "}
              {subTotal}$
            </h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-grid">
            <Button type="button" variant="primary" disabled={cartItems.length === 0} onClick={checkoutHandler}>
              Checkout
            </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Total;
