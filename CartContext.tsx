import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product, Size, ColorOption } from '../constants/data';

// State
interface CartState {
  items: CartItem[];
  wishlist: string[];
}

// Actions
type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; size: Size; color: ColorOption } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; size: Size; colorName: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: Size; colorName: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISHLIST'; payload: string };

// Initial State
const initialState: CartState = {
  items: [],
  wishlist: [],
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, color } = action.payload;
      const existingIndex = state.items.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name,
      );

      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity: 1, selectedSize: size, selectedColor: color }],
      };
    }

    case 'REMOVE_FROM_CART': {
      const { productId, size, colorName } = action.payload;
      return {
        ...state,
        items: state.items.filter(
          item =>
            !(
              item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor.name === colorName
            ),
        ),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, size, colorName, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            item =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor.name === colorName
              ),
          ),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor.name === colorName
            ? { ...item, quantity }
            : item,
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'TOGGLE_WISHLIST': {
      const productId = action.payload;
      const isInWishlist = state.wishlist.includes(productId);
      return {
        ...state,
        wishlist: isInWishlist
          ? state.wishlist.filter(id => id !== productId)
          : [...state.wishlist, productId],
      };
    }

    default:
      return state;
  }
}

// Context
interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  cartTotal: number;
  cartItemCount: number;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const cartTotal = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const cartItemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  const isInWishlist = (productId: string) => state.wishlist.includes(productId);

  return (
    <CartContext.Provider value={{ state, dispatch, cartTotal, cartItemCount, isInWishlist }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
