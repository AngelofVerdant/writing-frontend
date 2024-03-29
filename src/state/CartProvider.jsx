'use client'
import React, { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { 
        ...state, 
        cartItems: [...state.cartItems, action.payload]
    };
    case 'UPDATE_ITEM_QUANTITY':
      return {
        ...state,
        cartItems: action.payload,
      };
    case 'UPDATE_ITEM_COLOR_SIZE':
      return {
        ...state,
        cartItems: action.payload,
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product_item_id !== action.payload.product_item_id),
      };
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    case 'INITIALIZE_CART':
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); 

  const addItemToCart = (item) => {
    const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem.product_item_id === item.product_item_id);
  
    if (existingItemIndex !== -1) {
      const updatedCartItems = state.cartItems.map((cartItem, index) => {
        if (index === existingItemIndex) {
          const updatedQuantity = cartItem.quantity + 1;
          const updatedSubtotal = updatedQuantity * cartItem.price;
          return { ...cartItem, quantity: updatedQuantity, subtotal: updatedSubtotal };
        }
        return cartItem;
      });
  
      dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: updatedCartItems });
    } else {
      const subtotal = item.price;
      const newItem = { ...item, quantity: 1, subtotal };
      dispatch({ type: 'ADD_ITEM', payload: newItem });
      const updatedCartItems = [...state.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  const updateItemQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      const itemToRemove = state.cartItems.find(item => item.product_item_id === itemId);
      if (itemToRemove) {
        removeItemFromCart(itemToRemove);
        return;
      }
    }

    const item = state.cartItems.find(item => item.product_item_id === itemId);
    if (!item) return;

    if (quantity > item.stock) return;
  
    const updatedCartItems = state.cartItems.map(item => {
      if (item.product_item_id === itemId) {
        const updatedSubtotal = item.price * quantity;
        return { ...item, quantity, subtotal: updatedSubtotal };
      }
      return item;
    });
  
    dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: updatedCartItems });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  

  const removeItemFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
    const updatedCartItems = state.cartItems.filter(cartItem => cartItem.product_item_id !== item.product_item_id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cartItems');
  };
  
  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };
  
  const calculateGrandTotal = () => {
    return state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalItems = () => {
    let totalItems = 0;
    state.cartItems.forEach(item => {
      totalItems += item.quantity;
    });
    return totalItems;
  };

  const isItemInCart = (itemId) => {
    return state.cartItems.some(item => item.product_item_id === itemId);
  };

  const getItemFromCart = (itemId) => {
    return state.cartItems.find(item => item.product_item_id === itemId);
  };

  const updateColorAndSize = (itemId, color, size) => {
    const updatedCartItems = state.cartItems.map(item => {
      if (item.product_item_id === itemId) {
        const updatedColor = color;
        const updatedSize = size;
        return { ...item, color: updatedColor, size: updatedSize };
      }
      return item;
    });
  
    dispatch({ type: 'UPDATE_ITEM_COLOR_SIZE', payload: updatedCartItems });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  

  useEffect(() => {
    const initializeCart = async () => {
      const cartInfo = localStorage.getItem('cartItems');
      if (cartInfo) {
        const parsedCartInfo = JSON.parse(cartInfo);
        dispatch({ type: 'INITIALIZE_CART', payload: parsedCartInfo });
      }
    };
    initializeCart();
  }, []);

  const contextValue = {
    cartItems: state.cartItems,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    calculateSubtotal,
    calculateGrandTotal,
    calculateTotalItems,
    isItemInCart,
    getItemFromCart,
    updateColorAndSize,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvproduct_item_ider');
  }
  return context;
};

export { CartProvider, useCart };