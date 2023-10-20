import { UserModel } from "./user.model.js";

class UserService {
    #_userModel

    constructor() {
        this.#_userModel = new UserModel();
    }

    async getUsers() {
        return await this.#_userModel.getUsers();
    }

    async getUserById(id) {
        return await this.#_userModel.getUserById(id);
    }

    async signUp(payload) {
        return await this.#_userModel.signUp(payload);
    }

    async signIn(payload) {
        return await this.#_userModel.signIn(payload);
    }

    async updateUser(payload) {
        return await this.#_userModel.updateUser(payload);
    }

    async setAvatar(payload) {
        return await this.#_userModel.setAvatar(payload);
    }

    async createAdmin(payload) {
        return await this.#_userModel.createAdmin(payload);
    }

    async deleteUser(id) {
        return await this.#_userModel.deleteUser(id);
    }

    async updateCoinsAndBoughtProducts(payload) {
        return await this.#_userModel.updateCoinsAndBoughtProducts(payload);
    }

    async updateCoins(payload) {
        return await this.#_userModel.updateCoins(payload);
    }

    async checkEmail(email) {
        return await this.#_userModel.checkEmail(email);
    }
}

export default new UserService();