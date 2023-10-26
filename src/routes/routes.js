import { Router } from "express"
import { productRoutes } from "../module/product/product.routes.js";
import { userRoutes } from "../module/user/user.routes.js";
import { eventRoutes } from "../module/event/event.routes.js";
import { exchangeRoutes } from "../module/exchange/exchange.routes.js";
import { registerRoutes } from "../module/eventRegister/register.routes.js";
import { scannerRoutes } from "../module/scanner/scanner.routes.js";
import { authCheckRouter } from "./token-check.routes.js";

export const router = Router()
    .use("/products", productRoutes)
    .use("/users", userRoutes)
    .use("/events", eventRoutes)
    .use("/exchanges", exchangeRoutes)
    .use("/register", registerRoutes)
    .use("/scan", scannerRoutes)
    .use("/tokenIsValid", authCheckRouter)

    .use("/*", (_, res) => {
        res.status(404).json({ error: "Such a directory not found" })
    })
    