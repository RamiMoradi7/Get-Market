import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel";

function initAll(
  currentState: ProductModel[],
  action: PayloadAction<ProductModel[]>
): ProductModel[] {
  const newState = action.payload;
  return newState;
}

function addProduct(
  currentState: ProductModel[],
  action: PayloadAction<ProductModel>
): ProductModel[] {
  const newState = [...currentState, action.payload];
  return newState;
}

function updateProduct(
  currentState: ProductModel[],
  action: PayloadAction<ProductModel>
): ProductModel[] {
  const newState = [...currentState];
  const index = newState.findIndex((p) => p.id === action.payload.id);
  if (index >= 0) newState[index] = action.payload;
  return newState;
}
function deleteProduct(
  currentState: ProductModel[],
  action: PayloadAction<number>
): ProductModel[] {
  const newState = [...currentState];
  const index = newState.findIndex((p) => p.id === action.payload);
  if (index >= 0) newState.splice(index, 1);
  return newState;
}

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    initAll,
    addProduct,
    updateProduct,
    deleteProduct,
  },
});

export const productActions = productsSlice.actions;
export const productReducers = productsSlice.reducer;
