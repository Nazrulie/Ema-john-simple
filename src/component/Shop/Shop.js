import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../product/Product';
import { addToDb, getstoredCart } from '../../utilities/fakedb'
import './Shop.css'

const Shop = () => {
    const [products, setproduts] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        console.log('product load before')
        fetch('products.json')
            .then(res => res.json())
            .then(data => {
                setproduts(data)
                // console.log('console log loaded') 
            })
    }, []);
    useEffect(() => {
        const storedCart = getstoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products])
    const handleclick = (selectedproduct) => {
        // console.log(product);
        let newcart = [];
        const exists = cart.find(product => product.id === selectedproduct.id);
        if (!exists) {
            selectedproduct.quantity = 1;
            newcart = [...cart, selectedproduct]
        }
        else {
            const rest = cart.filter(product => product.id !== selectedproduct.id);
            exists.quantity = exists.quantity + 1;
            newcart = [...rest, exists];
        }
        setCart(newcart);
        addToDb(selectedproduct.id);
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleclick={handleclick}></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;