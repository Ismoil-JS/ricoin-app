import { ProductModel } from "./product.model.js";

class ProductService {
    #_productModel

    constructor() {
        this.#_productModel = new ProductModel();
    }

    async getProducts() {
        return await this.#_productModel.getProducts();
    }

    async getProductById(id) {
        return await this.#_productModel.getProductById(id);
    }

    async createProduct(payload) {
        return await this.#_productModel.createProduct(payload);
    }

    async updateProduct(payload) {
        return await this.#_productModel.updateProduct(payload);
    }

    async deleteProduct(id) {
        return await this.#_productModel.deleteProduct(id);
    }
}

export default new ProductService();