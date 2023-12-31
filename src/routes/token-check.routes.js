import { Router } from "express";
import jwt from "jsonwebtoken";
import userService from "../module/user/user.service.js";

export const authCheckRouter = Router()
    .post("/", async (req, res) => {
        try {
            const token = req.header("x-auth-token");
            if (!token) return res.json(false);

            const verified = jwt.verify(token, "secret");
            if (!verified) return res.json(false);

            const user = await userService.getUserById(verified.id);
            if (!user) return res.json(false);

            res.json({ status: true, ...user[0] });
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })