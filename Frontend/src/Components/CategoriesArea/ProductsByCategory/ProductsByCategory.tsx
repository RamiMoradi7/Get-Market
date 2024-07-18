import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import { productsService } from "../../../Services/ProductsService";
import { notify } from "../../../Utils/Notify";
import ProductCard from "../../ProductsArea/ProductCard/ProductCard";
import { Box } from "@mui/material";
import useTitle from "../../../Hooks/UseTitle";

function ProductsByCategory(): JSX.Element {
  const params = useParams();
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    const categoryId = +params.categoryId;
    productsService
      .getProductsByCategory(categoryId)
      .then((products) => {
        setProducts(products);
        setCategoryName(products.length > 0 ? products[0].categoryName : '');
      })
      .catch((err: any) => notify.error(err));
  }, [params.categoryId]);
  useTitle(categoryName);

  return (
    <div className="category-list">
      <Box className="cards">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Box>
    </div>
  );
}

export default ProductsByCategory;
