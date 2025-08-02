import React, { createContext, useContext, useReducer, useEffect } from 'react';

// ------------------- Reducer -------------------
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);

      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateCount(updatedItems),
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.productId !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateCount(updatedItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0); // Remove zero quantities

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateCount(updatedItems),
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        total: calculateTotal(action.payload),
        itemCount: calculateCount(action.payload),
      };

    default:
      return state;
  }
};

// ------------------- Helpers -------------------
const calculateTotal = items =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const calculateCount = items =>
  items.reduce((sum, item) => sum + item.quantity, 0);

// ------------------- Initial State -------------------
const initialState = {
   items: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  total: 0,
  itemCount: 0,
};

const CartFunction = createContext(undefined);

// ------------------- Provider -------------------
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  //  Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_CART', payload: parsed });
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = product => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = id => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartFunction.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartFunction.Provider>
  );
};

// ------------------- Hook -------------------
export const useCart = () => {
  const context = useContext(CartFunction);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
