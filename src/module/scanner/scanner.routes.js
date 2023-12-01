import { Router } from "express"
import { CheckId, checkEventId } from "../../middleware/id-check.middleware.js";
import { adminAuth, auth } from "../../middleware/auth.middleware.js";
import scannerController from "./scanner.controller.js";

const router = Router();

export const scannerRoutes = router
    .post("/:id", auth, CheckId, checkEventId, scannerController.scanQRCode);