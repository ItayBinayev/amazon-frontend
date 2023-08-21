import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Title } from '../Title/Title'
import Rating from '../Rating/Rating'

const ProductDescription = ({title, rating, price, description}) => {
  return (
    <ListGroup>
        <ListGroup.Item>
            <Title title={title}/>
            <h1>{title}</h1>
        </ListGroup.Item>
        <ListGroup.Item>
            <Rating
            rating={rating.rate}
            numReviews={rating.count}
            >
            </Rating>
        </ListGroup.Item>
        <ListGroup.Item>
            Price: ${price}
        </ListGroup.Item>
        <ListGroup.Item>
            Description: <p className='lead'>{description}</p>
        </ListGroup.Item>
    </ListGroup>
  )
}

export default ProductDescription