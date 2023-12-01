import { Router } from "express"
import userController from "./user.controller.js";
import { CheckId } from "../../middleware/id-check.middleware.js";
import { auth, adminAuth } from "../../middleware/auth.middleware.js";

const router = Router();

export const userRoutes = router
    .get("/", userController.getUsers)
    .get("/:id", CheckId, userController.getUserById)
    .post("/sign-up", userController.signUp)
    .post("/sign-in", userController.signIn)
    .post("/sign-out", userController.signOut)
    .post("/admin", auth, adminAuth, userController.createAdmin)
    .patch("/", auth, CheckId, userController.updateUser)
    .patch("/avatar", auth, CheckId, userController.setAvatar)
    .delete("/:id", auth, adminAuth, CheckId, userController.deleteUser)
    