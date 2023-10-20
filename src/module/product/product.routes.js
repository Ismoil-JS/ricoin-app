import { Router } from "express"
import ProductController from "./product.controller.js"
import { CheckId, checkProductId } from "../../middleware/id-check.middleware.js";
import { adminAuth, auth } from "../../middleware/auth.middleware.js";

const router = Router();

export const productRoutes = router
    .get("/", ProductController.getProducts)
    .get("/:id", CheckId, checkProductId, ProductController.getProductById)
    .post("/", auth, adminAuth, ProductController.createProduct)
    .patch("/:id", auth, adminAuth, CheckId, checkProductId, ProductController.updateProduct)
    .delete("/:id", auth, adminAuth, CheckId, checkProductId, ProductController.deleteProduct);
