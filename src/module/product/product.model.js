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
        const query = `INSERT INTO product (name, price, description, image, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        return await this.#_postgres.fetch(query, payload.name, payload.price, payload.description, payload.image, payload.amount);
    }

    async updateProduct(payload) {
        const product = await this.getProductById(payload.id);

        const { name, price, description, image, amount } = payload; // Destructure payload

        const query = `
            UPDATE product 
            SET 
                name = $1,
                price = $2,
                description = $3,
                image = $4,
                amount = $5
            WHERE id = $6
            RETURNING *
        `;

        return await this.#_postgres.fetch(
            query,
            name || product[0].name, // Use payload value if defined, otherwise use the existing value
            price || product[0].price,
            description || product[0].description,
            image || product[0].image,
            amount || product[0].amount,
            payload.id
        );
    }

    async updateProductAmount(payload) {
        const product = await this.getProductById(payload.id);

        const { amount } = payload; // Destructure payload

        const query = `
            UPDATE product 
            SET 
                amount = $1
            WHERE id = $2
        `;

        return await this.#_postgres.fetch(
            query,
            amount || product[0].amount,
            payload.id
        );
    }


    async deleteProduct(id) {

        const Product = `Select * FROM orders WHERE product_id = $1;`
        const result = await this.#_postgres.fetch(Product, id);

        if (result.length && result[0].status ==='pending') {
            return "pending";
        }
        else {
            const Dquery = `DELETE FROM orders WHERE product_id = $1;`;
            await this.#_postgres.fetch(Dquery, id);


            const query = `
            DELETE FROM product WHERE id = $1`;
            return await this.#_postgres.fetch(query, id);
        }
    }
}