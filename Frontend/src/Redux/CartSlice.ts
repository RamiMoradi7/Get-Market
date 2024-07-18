import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel";

export interface CartSlice {
  products: Record<number, { product: ProductModel; amount: number }>;
}

const initialState: CartSlice = {
  products: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductModel>) {
      const productId = action.payload.id;
      if (state.products[productId]) {
        state.products[productId].amount += 1;
      } else {  
        state.products[productId] = {
          product: action.payload,
          amount: 1,
        };
      }
    },
    deleteFromCart(state, action: PayloadAction<ProductModel>) {
      const productId = action.payload.id;
      const cartItem = state.products[productId];
      if (cartItem) {
        if (cartItem.amount > 1) {
          cartItem.amount -= 1;
        } else {
          delete state.products[productId];
        }
      }
    },
    resetCart(state, action: PayloadAction<ProductModel>) {
      state.products = {};
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducers = cartSlice.reducer;
