import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { authReducers } from "./AuthSlice";
import { categoriesReducers } from "./CategoriesSlice";
import { productReducers } from "./ProductsSlice";
import { cartReducers } from "./CartSlice";

export const appStore = configureStore<AppState>({
  reducer: {
    user: authReducers,
    products: productReducers,
    categories: categoriesReducers,
    cart: cartReducers,
  },
});
