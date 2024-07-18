import { dal } from "../2-utils/dal";
import { OkPacketParams } from "mysql2";
import { CategoryModel } from "../3-models/category-model";
import { appConfig } from "../2-utils/app-config";
import { fileSaver } from "uploaded-file-saver";
import { ResourceNotFoundError } from "../3-models/client-errors";

class CategoriesService {
  public async getCategories(): Promise<CategoryModel[]> {
    const sql = `SELECT *, CONCAT('${appConfig.baseImageUrl}', imageName) AS imageUrl FROM categories`;

    const categories = await dal.execute(sql);
    return categories;
  }
  public async getCategory(id: number): Promise<CategoryModel> {
    const sql = `SELECT *, CONCAT('${appConfig.baseImageUrl}', imageName) AS imageUrl FROM categories WHERE id = ?`;
    const categories = await dal.execute(sql, [id]);
    const category = categories[0];
    return category;
  }
  public async addCategory(category: CategoryModel): Promise<CategoryModel> {
    category.validateInsert();
    const imageName = await fileSaver.add(category.image);
    const sql = `INSERT INTO categories (
        name,description,imageName)
      VALUES(?,?,?)
      `;
    const values = [category.name, category.description, imageName];
    const info: OkPacketParams = await dal.execute(sql, values);
    category = await this.getCategory(info.insertId);
    return category;
  }
  public async updateCategory(category: CategoryModel): Promise<CategoryModel> {
    category.validateUpdate();
    const oldImageName = await this.getImageName(category.id);
    const newImageName = category.image
      ? await fileSaver.update(oldImageName, category.image)
      : oldImageName;
    const sql =
      "UPDATE categories SET name=?, description=?, imageName=? WHERE id=?";
    const values = [
      category.name,
      category.description,
      newImageName,
      category.id,
    ];

    const info: OkPacketParams = await dal.execute(sql, values);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(category.id);
    category = await this.getCategory(category.id);
    return category;
  }
  public async deleteCategory(id: number): Promise<void> {
    const sql = "DELETE FROM categories WHERE id = ?";
    const imageName = await this.getImageName(id);
    const info: OkPacketParams = await dal.execute(sql, [id]);
    console.log(imageName);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
    await fileSaver.delete(imageName);
  }
  private async getImageName(id: number): Promise<string> {
    const sql = "SELECT imageName from categories where id = ?";
    const categories = await dal.execute(sql, [id]);
    const category = categories[0];
    const imageName = category.imageName;
    return imageName;
  }
}

export const categoriesService = new CategoriesService();
