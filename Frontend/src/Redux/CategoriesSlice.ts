import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "../Models/CategoryModel";

function initAll(
  currentState: CategoryModel[],
  action: PayloadAction<CategoryModel[]>
): CategoryModel[] {
  const newState = action.payload;
  return newState;
}

function addCategory(
  currentState: CategoryModel[],
  action: PayloadAction<CategoryModel>
): CategoryModel[] {
  const newState = [...currentState, action.payload];
  return newState;
}
function updateCategory(
  currentState: CategoryModel[],
  action: PayloadAction<CategoryModel>
): CategoryModel[] {
  const newState = [...currentState];
  const index = newState.findIndex((c) => c.id === action.payload.id);
  if (index >= 0) newState[index] = action.payload;
  return newState;
}
function deleteCategory(
  currentState: CategoryModel[],
  action: PayloadAction<number>
): CategoryModel[] {
  const newState = [...currentState];
  const index = newState.findIndex((c) => c.id === action.payload);
  if (index >= 0) newState.splice(index, 1);
  return newState;
}
const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: { initAll, addCategory, updateCategory, deleteCategory },
});

export const categoriesActions = categoriesSlice.actions;
export const categoriesReducers = categoriesSlice.reducer;
