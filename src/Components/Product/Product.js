import React from "react";
import "./Product.css";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating.js";
import { AddToCartHandler } from "../../Services/AddToCart.js";
import { useContext } from "react";
import { Store } from "../../Context/Store.js";


const Product = ({ product }) => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart: {cartItems} } = state;
  

  return (
    <>
      <Card className="product-card">
        <Link to={`/product/${product.token}`}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
            className="card-image-page"
          />
          </Link>
          <Card.Body className="card-body-1">
          <Link to={`/product/${product.token}`}>
            <Card.Title className="text-shortener">{product.title}</Card.Title>
            </Link>
            <Rating
              rating={product.rating.rate}
              numReviews={product.rating.count}
            />
            <Card.Text>{product.price}$</Card.Text>
            {product.countInStock === 0 ? (
              <Button variant="light" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button
              className="btn-primary"
              onClick={() => AddToCartHandler(product,cartItems,contextDispatch)}
              >
                Add To Cart
              </Button>
            )}
          </Card.Body>
            
      </Card>
    </>
  );
  };

export default Product;
