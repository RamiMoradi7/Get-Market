import express, { NextFunction, Request, Response } from "express";
import { fileSaver } from "uploaded-file-saver";
import { StatusCode } from "../3-models/enums";
import { ProductModel } from "../3-models/product-model";
import { productsService } from "../5-services/products-service";
import { securityMiddleware } from "../4-middleware/security-middleware";

class ProductsController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get("/products", this.getProducts);
    this.router.get("/products/:id", this.getProduct);
    this.router.get(
      "/products-by-category/:categoryId",
      this.getProductsByCategory
    );
    this.router.post(
      "/products",
      securityMiddleware.verifyAdmin,
      this.addProduct
    );
    this.router.put(
      "/products/:id",
      securityMiddleware.verifyAdmin,
      this.updateProduct
    );
    this.router.delete(
      "/products/:id",
      securityMiddleware.verifyAdmin,
      this.deleteProduct
    );
    this.router.get("/products/images/:imageName", this.getImageFile);
  }

  private async getProducts(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await productsService.getProducts();
      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }
  private async getProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      const product = await productsService.getProduct(id);
      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }
  private async getProductsByCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categoryId = +request.params.categoryId;
      const products = await productsService.getProductsByCategory(categoryId);
      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }
  private async addProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.image = request.files?.image;
      const product = new ProductModel(request.body);
      const addedProduct = await productsService.addProduct(product);
      response.status(StatusCode.Created).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.image = request.files?.image;
      request.body.id = +request.params.id;
      const product = new ProductModel(request.body);
      const updatedProduct = await productsService.updateProduct(product);
      response.json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      await productsService.deleteProduct(id);
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

const productsController = new ProductsController();
export const productsRouter = productsController.router;
