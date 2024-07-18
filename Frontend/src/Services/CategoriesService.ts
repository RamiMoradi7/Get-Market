import axios from "axios";
import { CategoryModel } from "../Models/CategoryModel";
import { appConfig } from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import { categoriesActions } from "../Redux/CategoriesSlice";

class CategoriesService {
  public async getCategories(): Promise<CategoryModel[]> {
    let categories = appStore.getState().categories;
    if (categories.length > 0) return categories;
    const response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl);
    categories = response.data;
    appStore.dispatch(categoriesActions.initAll(categories));
    return categories;
  }
  public async getCategory(id: number): Promise<CategoryModel> {
    const response = await axios.get<CategoryModel>(
      appConfig.categoriesUrl + id
    );
    const category = response.data;
    return category;
  }
  public async addCategory(category: CategoryModel): Promise<void> {
    const response = await axios.post<CategoryModel>(
      appConfig.categoriesUrl,
      category,
      appConfig.axiosOptions
    );
    const addedCategory = response.data;
    appStore.dispatch(categoriesActions.addCategory(addedCategory));
  }
  public async updateCategory(category: CategoryModel): Promise<void> {
    const response = await axios.put<CategoryModel>(
      appConfig.categoriesUrl + category.id,
      category,
      appConfig.axiosOptions
    );
    const updatedCategory = response.data;
    appStore.dispatch(categoriesActions.updateCategory(updatedCategory));
  }
  public async deleteCategory(id: number): Promise<void> {
    await axios.delete<CategoryModel>(appConfig.categoriesUrl + id);
    appStore.dispatch(categoriesActions.deleteCategory(id));
  }
}

export const categoriesService = new CategoriesService();
