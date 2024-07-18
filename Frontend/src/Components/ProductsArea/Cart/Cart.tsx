import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { ProductModel } from "../../../Models/ProductModel";
import { appStore } from "../../../Redux/Store";
import { cartActions } from "../../../Redux/CartSlice";
import "./Cart.css";
import CartItem from "../CartItem/CartItem";
import { calculateCartTotal } from "../../../Utils/CalculateCart";

function Cart(): JSX.Element {
  const cartProducts = useSelector(
    (appState: AppState) => appState.cart?.products
  );
  const handleAddToCart = (product: ProductModel) => {
    appStore.dispatch(cartActions.addToCart(product));
  };
  const handleRemoveFromCart = (product: ProductModel) => {
    appStore.dispatch(cartActions.deleteFromCart(product));
  };

  return (
    <div className="Cart z-50">
      <h5>Your Shopping Cart:</h5>
      {Object.keys(cartProducts).length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        Object.keys(cartProducts).map((key) => (
          <CartItem
            key={cartProducts[+key].product.id}
            cartItem={cartProducts[+key]}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        ))
      )}
      <h5>Subtotal: ${calculateCartTotal(cartProducts).toFixed(2)}</h5>
    </div>
  );
}

export default Cart;
