import { OkPacketParams } from "mysql2";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";
import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { ProductModel } from "../3-models/product-model";

class ProductsService {
  public async getProducts(): Promise<ProductModel[]> {
    const sql = `SELECT 
    products.*, 
    CONCAT('${appConfig.baseImageUrl}', products.imageName) AS imageUrl,
    categories.name AS categoryName,
    categories.description AS categoryDescription
FROM 
    get_market.products 
LEFT JOIN 
    categories ON products.categoryId = categories.id;`;
    const products = await dal.execute(sql);
    return products;
  }
  public async getProduct(id: number): Promise<ProductModel> {
    const sql = `SELECT products.*, CONCAT('${appConfig.baseImageUrl}', imageName) AS imageUrl FROM products WHERE id =?`;
    const products = await dal.execute(sql, [id]);
    const product = products[0];
    if (!product) throw new ResourceNotFoundError(id);
    return product;
  }
  public async getProductsByCategory(
    categoryId: number
  ): Promise<ProductModel[]> {
    const sql = `SELECT 
    products.*, 
    CONCAT('${appConfig.baseImageUrl}', products.imageName) AS imageUrl,
    categories.name AS categoryName,
    categories.description AS categoryDescription
FROM 
    get_market.products 
LEFT JOIN 
    categories ON products.categoryId = categories.id WHERE categoryId = ?;`;
    const products = await dal.execute(sql, [categoryId]);
    return products;
  }
  public async addProduct(product: ProductModel): Promise<ProductModel> {
    product.validateInsert();
    const imageName = await fileSaver.add(product.image);
    const sql = `INSERT INTO products (
        name,description,price,stock,categoryId,quantity,imageName)
      VALUES(?,?,?,?,?,?,?)
      `;
    const values = [
      product.name,
      product.description,
      product.price,
      product.stock,
      product.categoryId,
      product.quantity,
      imageName,
    ];
    const info: OkPacketParams = await dal.execute(sql, values);
    product = await this.getProduct(info.insertId);
    return product;
  }
  public async updateProduct(product: ProductModel): Promise<ProductModel> {
    product.validateUpdate();
    const oldImageName = await this.getImageName(product.id);
    const newImageName = product.image
      ? await fileSaver.update(oldImageName, product.image)
      : oldImageName;
    const sql = `UPDATE products SET name=? , description=? ,price=?,
      stock=?,categoryId=?,quantity=?, imageName=? WHERE id=?`;
    const values = [
      product.name,
      product.description,
      product.price,
      product.stock,
      product.categoryId,
      product.quantity,
      newImageName,
      product.id,
    ];

    const info: OkPacketParams = await dal.execute(sql, values);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(product.id);
    product = await this.getProduct(product.id);
    return product;
  }
  public async deleteProduct(id: number): Promise<void> {
    const sql = "DELETE FROM products WHERE id = ?";
    const imageName = await this.getImageName(id);
    const info: OkPacketParams = await dal.execute(sql, [id]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
    await fileSaver.delete(imageName);
  }
  private async getImageName(id: number): Promise<string> {
    const sql = "SELECT imageName from products where id = ?";
    const products = await dal.execute(sql, [id]);
    const product = products[0];
    const imageName = product.imageName;
    return imageName;
  }
}

export const productsService = new ProductsService();
