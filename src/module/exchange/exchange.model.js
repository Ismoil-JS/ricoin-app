import { Postgres } from "../../postgres/postgres.js";

export class ExchangeModel {
    #_postgres

    constructor() {
        this.#_postgres = new Postgres();
    }

    async getExchanges() {
        const query = `SELECT
            o.id AS order_id,
            CONCAT(u.name, ' ', u.surname) AS user_full_name,
            p.name AS product_name,
            o.status AS order_status
        FROM
            orders o
        JOIN
            users u ON o.user_id = u.id
        JOIN
            product p ON o.product_id = p.id;`;
        return await this.#_postgres.fetch(query);
    }

    async getPendingExchanges() {
        const query = `SELECT
            o.id AS order_id,
            u.name || ' ' || u.surname AS user_full_name,
            p.name AS product_name,
            o.status AS order_status
        FROM
            orders o
        JOIN
            users u ON o.user_id = u.id
        JOIN
            product p ON o.product_id = p.id
        WHERE
            o.status = 'pending';
        `;
        return await this.#_postgres.fetch(query);
    }

    async getFinishedExchanges() {
        const query = `SELECT
            o.id AS order_id,
            u.name || ' ' || u.surname AS user_full_name,
            p.name AS product_name,
            o.status AS order_status
        FROM
            orders o
        JOIN
            users u ON o.user_id = u.id
        JOIN
            product p ON o.product_id = p.id
        WHERE
            o.status = 'done';
        `;
        return await this.#_postgres.fetch(query);
    }

    async getExchangeById(id) {
        const query = `SELECT
            o.id AS order_id,
            u.name || ' ' || u.surname AS user_full_name,
            p.name AS product_name,
            o.status AS order_status
        FROM
            orders o
        JOIN
            users u ON o.user_id = u.id
        JOIN
            product p ON o.product_id = p.id
        WHERE
            o.id = $1;
        `;
        return await this.#_postgres.fetch(query, id);
    }

    async createExchange(payload) {
        const query = `INSERT INTO orders (user_id, product_id) VALUES ($1, $2) RETURNING *`;
        return await this.#_postgres.fetch(query, payload.user_id, payload.product_id);
    }

    async finishExchange(id) {
        const query = `UPDATE orders SET status = 'done' WHERE id = $1 RETURNING *`;
        return await this.#_postgres.fetch(query, id);
    }

}