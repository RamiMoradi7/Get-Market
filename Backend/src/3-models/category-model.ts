import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

export class CategoryModel {
  public id: number;
  public name: string;
  public description: string;
  public image: UploadedFile;

  public constructor(category: CategoryModel) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
    this.image = category.image;
  }
  private static insertValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    name: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(2).max(200),
    image: Joi.object().required(),
  });
  private static updateValidationSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(2).max(200),
    image: Joi.object().optional(),
  });
  public validateInsert(): void {
    const result = CategoryModel.insertValidationSchema.validate(this);
    if (result.error?.message) throw new ValidationError(result.error.message);
  }
  public validateUpdate(): void {
    const result = CategoryModel.updateValidationSchema.validate(this);
    if (result.error?.message) throw new ValidationError(result.error.message);
  }
}
