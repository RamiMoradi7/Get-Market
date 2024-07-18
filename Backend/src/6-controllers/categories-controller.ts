import express, { NextFunction, Request, Response } from "express";
import { categoriesService } from "../5-services/categories-service";
import { CategoryModel } from "../3-models/category-model";
import { StatusCode } from "../3-models/enums";
import { fileSaver } from "uploaded-file-saver";

class CategoriesController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get("/categories", this.getCategories);
    this.router.get("/categories/:id", this.getCategory);
    this.router.post("/categories", this.addCategory);
    this.router.put("/categories/:id", this.updateCategory);
    this.router.delete("/categories/:id", this.deleteCategory);
    this.router.get("/products/images/:imageName", this.getImageFile);
  }

  private async getCategories(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await categoriesService.getCategories();
      response.json(categories);
    } catch (err: any) {
      next(err);
    }
  }
  private async getCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      const category = await categoriesService.getCategory(id);
      response.json(category);
    } catch (err: any) {
      next(err);
    }
  }
  private async addCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.image = request.files.image;
      console.log(request.files);
      const category = new CategoryModel(request.body);
      const addedCategory = await categoriesService.addCategory(category);
      response.status(StatusCode.Created).json(addedCategory);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.image = request.files?.image;
      request.body.id = +request.params.id;
      const category = new CategoryModel(request.body);
      const updatedCategory = await categoriesService.updateCategory(category);
      response.json(updatedCategory);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      await categoriesService.deleteCategory(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
  private async getImageFile(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const imageName = request.params.imageName;
      const imagePath = await fileSaver.getFilePath(imageName);
      response.sendFile(imagePath);
    } catch (err: any) {
      next(err);
    }
  }
}

const categoriesController = new CategoriesController();
export const categoriesRouter = categoriesController.router;
