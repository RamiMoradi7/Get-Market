import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "./2-utils/app-config";
import { errorsMiddleware } from "./4-middleware/errors-middleware";
import { loggerMiddleware } from "./4-middleware/logger-middleware";
import { categoriesRouter } from "./6-controllers/categories-controller";
import { productsRouter } from "./6-controllers/products-controller";
import { authRouter } from "./6-controllers/auth-controller";

// Main application class:
class App {
  private server = express();
  public start(): void {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(expressFileUpload());
    fileSaver.config(path.join(__dirname, "1-assets", "images"));
    this.server.use(loggerMiddleware.logToConsole);
    this.server.use("/api", categoriesRouter, productsRouter, authRouter);
    this.server.use(errorsMiddleware.routeNotFound);
    this.server.use(errorsMiddleware.catchAll);

    this.server.listen(appConfig.port, () =>
      console.log("Listening on http://localhost:" + appConfig.port, appConfig.mysqlDatabase + " DB.")
    );
  }
}

const app = new App();
app.start();
