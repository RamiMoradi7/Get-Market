import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import { productsService } from "../../../Services/ProductsService";
import { CurrentUser } from "../../../Utils/CurrentUser";
import EditButton from "../../Buttons/EditButton/EditButton";
import "./ProductCard.css";
import DeleteButton from "../../Buttons/DeleteButton/DeleteButton";
import AddToCartButton from "../../Buttons/AddToCart/AddToCart";
import RemoveFromCartButton from "../../Buttons/RemoveFromCart/RemoveFromCart";
import { Button } from "@mui/material";
interface ProductCardProps {
  product: ProductModel;
}
function ProductCard({ product }: ProductCardProps): JSX.Element {
  const {
    id,
    name,
    description,
    price,
    stock,
    quantity,
    imageUrl,
    categoryName,
  } = product;
  const { isAdmin } = CurrentUser();
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <div id="make-3D-space">
      <div
        id="product-card"
        className={hovered ? "animate" : ""}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div id="product-front">
          <div className="shadow" />
          <div className="image_overlay" />
          <div id="view_details">
            {!isAdmin && (
              <>
                <AddToCartButton product={product} />
                <RemoveFromCartButton product={product} />
              </>
            )}
            {isAdmin && (
              <>
                <EditButton id={id} identifier="products" />
                <DeleteButton
                  id={id}
                  name={name}
                  fnQuery={productsService.deleteProduct}
                />
              </>
            )}
          </div>
          <div className="stats">
            <div className="stats-container">
              <span className="product_name">{name}</span>
              <span className="product_price"> {+price} $</span>
              <p>{categoryName}</p>
              <div className="product-options">
                <strong>
                  {stock} left , {quantity}
                </strong>
              </div>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
