import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import {commerce} from './lib/commerce'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
    const [products, setProducts] = useState([])
    
    const [cart, setCart] = useState({})


    const fetchProducts = async () => {
        const data = await commerce.products.list();

        setProducts(data.data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantité) => {
        const item = await commerce.cart.add(productId, quantité);


        setCart(item.cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart();
    }, []);

    console.log(cart);


    
    return (
    <Router>
        <div>
            <Navbar totalItems={cart.total_items} />
            <Routes>
                <Route  path='/' exact element={<Products products={products} onAddToCart={handleAddToCart} />} />
                <Route path='/cart' exact element={<Cart cart={cart} />}/>

            </Routes>
        </div>
    </Router>
    );
};

export default App;