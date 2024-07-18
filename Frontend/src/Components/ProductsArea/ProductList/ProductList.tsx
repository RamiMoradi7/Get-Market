import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import useTitle from "../../../Hooks/UseTitle";
import useFetch from "../../../Hooks/useFetch";
import { ProductModel } from "../../../Models/ProductModel";
import { AppState } from "../../../Redux/AppState";
import { productsService } from "../../../Services/ProductsService";
import { notify } from "../../../Utils/Notify";
import ProductCard from "../ProductCard/ProductCard";
import SearchProducts from "../Search/Search";
import "./ProductList.css";
import CheckboxFilter from "../../Buttons/CheckboxFilter/CheckboxFilter";

function ProductList(): JSX.Element {
  useTitle("Products");
  const { result: products, isLoading} = useFetch(
    productsService.getProducts,
    (appState: AppState) => appState?.products
  );
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleCategoryChange = (selectedCategories: number[]) => {
    setSelectedCategories(selectedCategories);
    filterProducts(selectedCategories);
  };

  const filterProducts = (selectedCategories: number[]) => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = async (searchValue: string) => {
    try {
      setFilteredProducts(
        await productsService.searchProducts(searchValue, selectedCategories)
      );
    } catch (error) {
      notify.error("Failed to search products.");
    }
  };

  return (
    <div className="product-list">
      <SearchProducts onSearch={handleSearch} />
      <CheckboxFilter
        onCategoryChange={handleCategoryChange}
        selectedCategories={selectedCategories}
      />
      <Box className="cards">
        {isLoading ? (
          <>Loading products...</>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <>Oops, no results match your search value or selected categories.</>
        )}
      </Box>
    </div>
  );
}

export default ProductList;
