import { Router } from "express"
import { CheckId, checkExchangeId, checkProductId } from "../../middleware/id-check.middleware.js";
import { auth, adminAuth } from "../../middleware/auth.middleware.js";
import exchangeController from "./exchange.controller.js";
import { coinsCheck } from "../../middleware/coins-check.middleware.js";

const router = Router();

export const exchangeRoutes = router
    .get("/", auth, adminAuth, exchangeController.getExchanges)
    .get("/pending", auth, adminAuth, exchangeController.getPendingExchanges)
    .get("/finished", auth, adminAuth, exchangeController.getFinishedExchanges)
    .get("/:id", CheckId, checkExchangeId, exchangeController.getExchangeById)
    .post("/:id", auth, CheckId, checkProductId, coinsCheck, exchangeController.createExchange)
    .patch("/:id", auth, adminAuth, CheckId, checkExchangeId, exchangeController.finishExchange);
