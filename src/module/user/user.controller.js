import { generateToken } from "../../utility/jwt.utility.js";
import userService from "./user.service.js";

class UserController {
    async getUsers(_, res) {
        const users = await userService.getUsers().catch((err) => {
            return res.status(404).json({ message: err.message});
        });

        const filteredUsers = users.map((user) => {
            const { password, ...rest } = user;
            return rest;
        });

        res.json(filteredUsers);
    }

    async getUserById(req, res) {
        const user = await userService.getUserById(req.params.id).catch((err) => {
            return res.status(404).json({ message: err.message });
        });

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...rest } = user[0];

        res.json(rest);
    }

    async signUp(req, res) {
        const user = await userService.checkEmail(req.body.email);

        if (user.length > 0) {
            return res.status(409).json({ message: "Email already exists" });
        }

        await userService.signUp(req.body).catch((err) => {
            return res.status(404).json({ message: err.message });  
        });
        res.status(204).json();
    }

    async signIn(req, res) {
        const user = await userService.signIn(req.body);

        if (user.length === 0) { 
            return res.status(404).json({ message: "User not found" });
        }


        const token = generateToken(user[0]);
        res.cookie("token", token);
        res.header("Authorization", token);

        res.status(201).json({ token: token});
    }

    async updateUser(req, res) {
        const id = req.user;

        const findUser = await userService.getUserById(id);

        if(findUser.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = await userService.updateUser({...req.body, id}).catch((err) => {
            return res.status(404).json({ message: err.message });
        });
        res.status(201).json(user);
    }

    async setAvatar(req, res) {
        const id = req.user;
        const user = await userService.setAvatar({...req.body, id}).catch((err) => {
            return res.status(404).json({ message: err.message });
        });
        res.json(user);
    }

    async createAdmin(req, res) {
        const chekUserEmail = await userService.checkEmail(req.body.email);

        if (chekUserEmail.length > 0) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const user = await userService.createAdmin(req.body).catch((err) => {
            return res.status(404).json({ message: err.message });
        });
        res.status(201).json(user);
    }

    async deleteUser(req, res) {
        const user = await userService.getUserById(req.params.id);

        if(user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        await userService.deleteUser(req.params.id).catch((err) => {
            return res.status(404).json({ message: err.message });
        });
        res.status(204).json();
    }

    async signOut(_, res) {
        res.clearCookie("token");
        res.header("Authorization", "");
        res.json({ message: "User signed out" });
    }

}

export default new UserController();