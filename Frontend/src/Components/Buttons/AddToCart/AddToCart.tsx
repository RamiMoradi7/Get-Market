import { AddShoppingCartRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ProductModel } from "../../../Models/ProductModel";

import { cartActions } from "../../../Redux/CartSlice";
import { appStore } from "../../../Redux/Store";
import { notify } from "../../../Utils/Notify";

interface AddToCartButtonProps {
  product: ProductModel;
}
function AddToCartButton({ product }: AddToCartButtonProps) {
  async function addToCart(product: ProductModel) {
    try {
      appStore.dispatch(cartActions.addToCart(product));
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <Button onClick={() => addToCart(product)}>
      <AddShoppingCartRounded />
    </Button>
  );
}

export default AddToCartButton;
