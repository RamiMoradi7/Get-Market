import { ProductModel } from "../Models/ProductModel";

export function calculateCartTotal(
  cartProducts: Record<number, { product: ProductModel; amount: number }>
) {
  let total = 0;
  Object.keys(cartProducts).forEach((key) => {
    total += cartProducts[+key].product.price * cartProducts[+key].amount;
  });
  return total;
}

export function calculateCartAmount(
  cartProducts: Record<number, { product: ProductModel; amount: number }>
) {
  let amount = 0;
  Object.keys(cartProducts).forEach((key) => {
    amount += cartProducts[+key].amount;
  });
  return amount;
}
