import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../Product/Product.js';

const Products = ({products = [] }) => {
    return (
        <>
        <Row>
            {products.map(product => (
                <Col key={product.token} lg={3} md={4} sm={6} className="mb-3">{product.name}
                <Product product={product}/>
                </Col>
                ))}
        </Row>
        </>
    )
}

export default Products;