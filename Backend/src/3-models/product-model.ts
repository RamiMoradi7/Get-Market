import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

export class ProductModel {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public stock: number;
  public categoryId: number;
  public quantity: string;
  public image: UploadedFile;

  public constructor(product: ProductModel) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.categoryId = product.categoryId;
    this.quantity = product.quantity;
    this.image = product.image;
  }
  private static insertValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    name: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(5).max(250),
    price: Joi.number().required().positive(),
    stock: Joi.number().integer().required().positive(),
    categoryId: Joi.number().integer().required(),
    quantity: Joi.string().required().min(1).max(100),
    image: Joi.object().required(),
  });
  private static updateValidationSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(5).max(250),
    price: Joi.number().required().positive(),
    stock: Joi.number().integer().required().positive(),
    categoryId: Joi.number().integer().required(),
    quantity: Joi.string().required().min(1).max(100),
    image: Joi.object().optional(),
  });
  public validateInsert(): void {
    const result = ProductModel.insertValidationSchema.validate(this);
    if (result.error?.message) throw new ValidationError(result.error.message);
  }
  public validateUpdate(): void {
    const result = ProductModel.updateValidationSchema.validate(this);
    if (result.error?.message) throw new ValidationError(result.error.message);
  }
}
