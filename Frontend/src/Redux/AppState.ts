import { CategoryModel } from "../Models/CategoryModel";
import { ProductModel } from "../Models/ProductModel";
import { UserModel } from "../Models/UserModel";
import { CartSlice } from "./CartSlice";

export type AppState = {
  user: UserModel;
  products: ProductModel[];
  categories: CategoryModel[];
  cart: CartSlice;
};
