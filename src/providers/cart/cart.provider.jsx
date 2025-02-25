import React, { createContext, useState, useEffect } from 'react';

import { 
    addItemToCart, 
    removeItemFromCart, 
    filterItemFromCart, 
    getCartItemsCount,
    getCartTotal
 } from './cart.utils';

export const CartContext = createContext({
    hidden : true,
    toggleHidden : () => {},
    cartItems : [],
    addItem : () => {},
    removeItem : () => {},
    clearItemFromCart : () => {},
    cartItemsCount : 0,
    cartTotal : 0
});

const CartProvider = ({ children }) => {
    const [ hidden, setHidden] = useState(true);
    const [ cartItems, setCartItem] = useState([]);
    const [ cartItemsCount, setCartItemsCount] = useState(0);
    const [ cartTotal, setCartTotal] = useState(0);

    const toggleHidden = () => setHidden(!hidden);
    const addItem = item => setCartItem(addItemToCart(cartItems, item));
    const removeItem = item => setCartItem(removeItemFromCart(cartItems, item));
    const clearItemFromCart = item => setCartItem(filterItemFromCart(cartItems, item));

    useEffect(() => {
        setCartItemsCount(getCartItemsCount(cartItems));
        setCartTotal(getCartTotal(cartItems));
    }, [cartItems]);

    return <CartContext.Provider
        value = {{
            hidden,
            cartItems,
            cartItemsCount,
            cartTotal,
            toggleHidden,
            addItem,
            removeItem,
            clearItemFromCart
        }}> 
        { children } 
        </CartContext.Provider>
}

export default CartProvider;