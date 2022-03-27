import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './product.css'

const Product = (props) => {
    const { id, category, name, seller, price, stock, ratings, ratingsCount, img, shipping, quantity } = props.product;
    return (
        <div className='product'>
            <img src={img} alt="" ></img>
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p>Price : ${price}</p>
                <p><small>Manufacturer : {seller}</small></p>
                <p><small>Ratings : {ratings} stars</small></p>
            </div>
            <button onClick={() => props.handleclick(props.product)} className='btn-cart'>
                <p className='btn-add'>Add to Cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;