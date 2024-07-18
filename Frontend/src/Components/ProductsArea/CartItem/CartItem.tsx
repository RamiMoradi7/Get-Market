import {
  AddCircleSharp,
  RemoveCircleSharp
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { ProductModel } from "../../../Models/ProductModel";
import "./CartItem.css";
interface CartItemProps {
  cartItem: { product: ProductModel; amount: number };
  addToCart: (product: ProductModel) => void;
  removeFromCart: (product: ProductModel) => void;
}

function CartItem({
  cartItem,
  addToCart,
  removeFromCart,
}: CartItemProps): JSX.Element {
  return (
    <div className="CartItem">
      <div className="information">
        <strong>{cartItem.product.name}</strong>
        <div>Price: ${cartItem.product.price}</div>
        <div>
          Total: ${(cartItem.amount * cartItem.product.price).toFixed(2)}
        </div>
      </div>
      <div>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(cartItem.product)}
        >
          <RemoveCircleSharp />
        </Button>
        <p>({cartItem.amount})</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(cartItem.product)}
        >
          <AddCircleSharp />
        </Button>
      </div>
      <img
        className="CartImage"
        src={cartItem.product.imageUrl}
        alt={cartItem.product.name}
      />
    </div>
  );
}

export default CartItem;
