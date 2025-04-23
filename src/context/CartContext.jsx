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
    const existingItem = cart.find(item => item.id === movie.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === movie.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...movie, price, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (id) => {
    setCart(cart =>
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const increaseQuantity = (id) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const calculateTotal = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (totalItems > 5) discount = 0.2;
    else if (totalItems > 3) discount = 0.1;
    return subtotal * (1 - discount);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      decreaseQuantity,
      increaseQuantity,
      clearCart,
      calculateTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
