import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('movieCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('movieCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (movie, price) => {
    setCart([...cart, { ...movie, price, quantity: 1 }]);
  };

  const clearCart = () => setCart([]);

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    
    if (cart.length > 5) discount = 0.2;
    else if (cart.length > 3) discount = 0.1;
    
    return subtotal * (1 - discount);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
