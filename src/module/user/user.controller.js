import { generateToken } from "../../utility/jwt.utility.js";
import userService from "./user.service.js";

class UserController {
    async getUsers(_, res) {
        const users = await userService.getUsers().catch((err) => {
            return res.status(400).json({ message: err.message });
        });

        const filteredUsers = users.map((user) => {
            const { password, ...rest } = user;
            return rest;
        });

        res.json(filteredUsers);
    }

    async getUserById(req, res) {
        const user = await userService.getUserById(req.params.id).catch((err) => {
            return res.status(400).json({ message: err.message });
        });

        const token = req.header("x-auth-token");

        if (user.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }



        res.json({ token, ...user[0] });
    }

    async signUp(req, res) {

        const user = await userService.checkEmail(req.body.email);

        if (user.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        await userService.signUp(req.body).catch((err) => {
            return res.status(400).json({ message: err.message });
        });
        res.status(200).json({ message: "User created" });
    }

    async signIn(req, res) {
        const user = await userService.signIn(req.body);


        if (user.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }


        const token = generateToken(user[0]);
        res.cookie("token", token);
        res.header("Authorization", token);

        res.status(200).json({ token, ...user[0] });
    }

    async updateUser(req, res) {
        const id = req.user;

        const findUser = await userService.getUserById(id);

        if (findUser.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = await userService.updateUser({ ...req.body, id }).catch((err) => {
            return res.status(400).json({ message: err.message });
        });
        res.status(200).json(user);
    }

    async setAvatar(req, res) {
        const id = req.user;
        const user = await userService.setAvatar({ ...req.body, id }).catch((err) => {
            return res.status(400).json({ message: err.message });
        });
        res.json(user);
    }

    async createAdmin(req, res) {
        const chekUserEmail = await userService.checkEmail(req.body.email);

        if (chekUserEmail.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = await userService.createAdmin(req.body).catch((err) => {
            return res.status(400).json({ message: err.message });
        });
        res.status(200).json(user);
    }

    async deleteUser(req, res) {
        const user = await userService.getUserById(req.params.id);

        if (user.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        await userService.deleteUser(req.params.id).catch((err) => {
            return res.status(400).json({ message: err.message });
        });
        res.status(200).json();
    }

    async signOut(_, res) {
        res.clearCookie("token");
        res.header("Authorization", "");
        res.json({ message: "User signed out" });
    }

}

export default new UserController();