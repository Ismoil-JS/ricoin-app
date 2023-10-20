import { Router } from "express";
import { CheckId, checkEventId, checkUserId } from "../../middleware/id-check.middleware.js";
import { auth } from "../../middleware/auth.middleware.js";
import RegisterController from "./register.controller.js";

const router = Router();

export const registerRoutes = router
    .post("/:id", auth, CheckId, checkEventId, checkUserId, RegisterController.createRegister)      
    