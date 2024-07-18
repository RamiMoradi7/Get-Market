import {
  AddShoppingCartRounded,
  RemoveShoppingCart,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { ProductModel } from "../../../Models/ProductModel";

import { cartActions } from "../../../Redux/CartSlice";
import { appStore } from "../../../Redux/Store";
import { notify } from "../../../Utils/Notify";

interface RemoveFromCartButtonProps {
  product: ProductModel;
}
function RemoveFromCartButton({ product }: RemoveFromCartButtonProps) {
  async function RemoveFromCart(product: ProductModel) {
    try {
      appStore.dispatch(cartActions.deleteFromCart(product));
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <Button onClick={() => RemoveFromCart(product)}>
      <RemoveShoppingCart />
    </Button>
  );
}

export default RemoveFromCartButton;
