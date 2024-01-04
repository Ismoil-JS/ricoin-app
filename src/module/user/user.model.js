import { Postgres } from "../../postgres/postgres.js";

export class UserModel {
    #_postgres

    constructor() {
        this.#_postgres = new Postgres();
    }

    async getUsers() {
        const query = `SELECT * FROM users ORDER BY coins DESC`;
        return await this.#_postgres.fetch(query);
    }

    async getUserById(id) {
        const query = `SELECT * FROM users WHERE id = $1`;
        return await this.#_postgres.fetch(query, id);
    }

    async signUp(payload) {
        const { name, surname, email, password } = payload;

        const query = `INSERT INTO users(name, surname, email, password, avatar) VALUES($1, $2, $3, crypt($4, gen_salt('bf', 4)), 'https://res.cloudinary.com/xurshidbey/image/upload/v1703793751/avatar/g8hk9ea0eiuw2ayxipsd.png') RETURNING *`;
        await this.#_postgres.fetch(query, name, surname, email, password);
    }

    async signIn(payload) {
        const { email, password } = payload;

        const query = `SELECT * from users WHERE email = $1 AND password = crypt($2, password)`;
        const user = await this.#_postgres.fetch(query, email, password);
        return user;
    }

    async updateUser(payload) {
        const user = await this.getUserById(payload.id);

        const { name, surname, email, password } = payload; // Destructure payload

        const query = `
            UPDATE users 
            SET 
                name = $1,
                surname = $2,
                email = $3,
                password = $4
            WHERE id = $5
            RETURNING *
        `;

        return await this.#_postgres.fetch(
            query,
            name || user[0].name, // Use payload value if defined, otherwise use the existing value
            surname || user[0].surname,
            email || user[0].email,
            password || user[0].password,
            payload.id
        );
    }

    async setAvatar(payload) {
        const user = await this.getUserById(payload.id);

        const { avatar } = payload; // Destructure payload

        const query = `
            UPDATE users 
            SET 
                avatar = $1
            WHERE id = $2
            RETURNING *
        `;

        return await this.#_postgres.fetch(
            query,
            avatar || user[0].avatar, // Use payload value if defined, otherwise use the existing value
            payload.id
        );
    }

    async createAdmin(payload) {
        const { email } = payload;

        const query = `UPDATE users
        SET role = 'admin'
        WHERE email = $1
        `;
        await this.#_postgres.fetch(query, email);
    }

    async deleteUser(id) {
        const query = `DELETE FROM users WHERE id = $1`;
        return await this.#_postgres.fetch(query, id);
    }

    async updateCoinsAndBoughtProducts({ id, coins, product_id }) {
        const query = 'UPDATE users SET coins = $1, bought_products = array_append(bought_products, $2) WHERE id = $3 RETURNING *';
        return await this.#_postgres.fetch(query, coins, product_id, id);
    }

    async updateCoins({ id, coins }) {
        const query = 'UPDATE users SET coins = $1 WHERE id = $2 RETURNING *';
        return await this.#_postgres.fetch(query, coins, id);
    }


    async checkEmail(email) {
        const query = `SELECT * FROM users WHERE email = $1`;
        return await this.#_postgres.fetch(query, email);
    }
}