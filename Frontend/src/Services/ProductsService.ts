import axios from "axios";
import { ProductModel } from "../Models/ProductModel";
import { appConfig } from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import { productActions } from "../Redux/ProductsSlice";
import { notify } from "../Utils/Notify";

class ProductsService {
  public async getProducts(): Promise<ProductModel[]> {
    let products = appStore.getState().products;
    if (products.length > 0) return products;
    const response = await axios.get<ProductModel[]>(appConfig.productsUrl);
    products = response.data;
    appStore.dispatch(productActions.initAll(products));
    return products;
  }
  public async getProduct(id: number): Promise<ProductModel> {
    let product = appStore.getState().products?.find((p) => p.id === id);
    if (product) return product;
    const response = await axios.get<ProductModel>(appConfig.productsUrl + id);
    product = response.data;
    return product;
  }
  public async getProductsByCategory(
    categoryId: number
  ): Promise<ProductModel[]> {
    const response = await axios.get<ProductModel[]>(
      appConfig.productsByCategoryUrl + categoryId
    );
    const products = response.data;
    return products;
  }
  public async addProduct(product: ProductModel): Promise<void> {
    const response = await axios.post<ProductModel>(
      appConfig.productsUrl,
      product,
      appConfig.axiosOptions
    );
    const addedProduct = response.data;
    appStore.dispatch(productActions.addProduct(addedProduct));
  }
  public async updateProduct(product: ProductModel): Promise<void> {
    const response = await axios.put<ProductModel>(
      appConfig.productsUrl + product.id,
      product,
      appConfig.axiosOptions
    );
    const updatedProduct = response.data;
    appStore.dispatch(productActions.updateProduct(updatedProduct));
  }
  public async deleteProduct(id: number): Promise<void> {
    await axios.delete<ProductModel>(appConfig.productsUrl + id);
    appStore.dispatch(productActions.deleteProduct(id));
  }

  public async searchProducts(
    searchValue: string,
    selectedCategories: number[]
  ): Promise<ProductModel[]> {
    try {
      const products = await this.getProducts();

      let filteredProducts = [...products];
      if (selectedCategories.length > 0) {
        filteredProducts = products.filter((p) =>
          selectedCategories.includes(p.categoryId)
        );
      }
      
      const productsBySearch = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      return productsBySearch;
    } catch (err: any) {
      notify.error(err);
      return [];
    }
  }
  public async filterProducts(
    products: ProductModel[],
    filterValues: string[]
  ): Promise<ProductModel[]> {
    try {
      let filteredProducts = [...products];

      for (const filterValue of filterValues) {
        switch (filterValue) {
          case "price-high-to-low":
            filteredProducts = this.sortByPriceDescending(filteredProducts);
            break;
          case "price-low-to-high":
            filteredProducts = this.sortByPriceAscending(filteredProducts);
            break;
          default:
            filteredProducts = this.filterByCategories(
              filteredProducts,
              filterValue
            );
        }
      }

      return filteredProducts;
    } catch (err: any) {
      notify.error(err);
      return products;
    }
  }

  public sortByPriceDescending(products: ProductModel[]): ProductModel[] {
    return [...products].sort((a, b) => b.price - a.price);
  }

  public sortByPriceAscending(products: ProductModel[]): ProductModel[] {
    return [...products].sort((a, b) => a.price - b.price);
  }

  public filterByCategories(
    products: ProductModel[],
    category: string
  ): ProductModel[] {
    return products.filter((p) => p.categoryName === category);
  }
}

export const productsService = new ProductsService();
