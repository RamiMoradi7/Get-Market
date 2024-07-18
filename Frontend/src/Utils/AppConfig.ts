class AppConfig {
  // Backend urls:
  public readonly registerUrl = "http://localhost:4000/api/register/";
  public readonly loginUrl = "http://localhost:4000/api/login/";
  public readonly categoriesUrl = "http://localhost:4000/api/categories/";
  public readonly productsUrl = "http://localhost:4000/api/products/";
  public readonly productsByCategoryUrl =
    "http://localhost:4000/api/products-by-category/";

  //Axios options:
  public readonly axiosOptions = {
    headers: {
      // Tell axios to also send the image:
      "Content-Type": "multipart/form-data", // We're sending also files.
    },
  };
}

export const appConfig = new AppConfig();
