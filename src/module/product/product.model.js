import { Postgres } from "../../postgres/postgres.js";

export class ProductModel {
    #_postgres

    constructor() {
        this.#_postgres = new Postgres();
    }

    async getProducts() {
        const query = `SELECT * FROM product`;
        return await this.#_postgres.fetch(query);
    }

    async getProductById(id) {
        const query = `SELECT * FROM product WHERE id = $1`;
        return await this.#_postgres.fetch(query, id);
    }

    async createProduct(payload) {
        const query = `INSERT INTO product (name, price, description, image) VALUES ($1, $2, $3, $4) RETURNING *`;
        return await this.#_postgres.fetch(query, payload.name, payload.price, payload.description, payload.image);
    }

    async updateProduct(payload) {
        const product = await this.getProductById(payload.id);

        const { name, price, image } = payload; // Destructure payload

        const query = `
            UPDATE product 
            SET 
                name = $1,
                price = $2,
                description = $3,
                image = $4
            WHERE id = $5
            RETURNING *
        `;

        return await this.#_postgres.fetch(
            query,
            name || product[0].name, // Use payload value if defined, otherwise use the existing value
            price || product[0].price,
            payload.description || product[0].description,
            image || product[0].image,
            payload.id
        );
    }


    async deleteProduct(id) {

        const Product = `Select * FROM orders WHERE product_id = $1;`
        const result = await this.#_postgres.fetch(Product, id);

        if (result[0].status ==='pending') {
            return "pending";
        }
        else {
            const Dquery = `DELETE FROM orders WHERE product_id = $1;`;
            await this.#_postgres.fetch(Dquery, id);

            const query = `
            DELETE FROM product WHERE id = $1`;
            await this.#_postgres.fetch(query, id);
        }
    }
}