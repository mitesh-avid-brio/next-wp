import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Updated CartItem interface to include all product details
export interface CartItem {
  id: number; // or string if it's a string ID
  name: string;
  price: number; // Current price of the product
  description?: string; // Optional property
  images: { src: string; alt: string }[]; // Array of images
  short_description: string; // Short description of the product
  quantity: number; // Quantity of the product
}

// Define the structure of the cart state
export interface ICartState {
  items: CartItem[];
}

const initialState: ICartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add a product to the cart
    addProduct: (state, action: PayloadAction<CartItem>) => {
      // Always add a new product to the cart
      state.items.push(action.payload);
    },
    // Action to remove a product from the cart
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Action to clear the cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Export the actions
export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
// Export the reducer
export const cartReducer = cartSlice.reducer;
