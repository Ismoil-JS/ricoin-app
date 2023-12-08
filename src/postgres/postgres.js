import pg from "pg";
import { config } from "dotenv";
config();

export class Postgres {
    #pg;

    constructor() {
        this.#pg = new pg.Pool({
            host: process.env.DB_HOST ?? 'localhost',
            port: process.env.DB_PORT ?? 5432,
            user: process.env.DB_USER ?? 'postgres',
            password: process.env.DB_PASSWORD ?? '1234',
            database: process.env.DB_DATABASE ?? 'eventregulation',
        });

        // this.#pg = new pg.Pool({
        //     connectionString: "postgres://ricoin_app_user:Ify5PdXrF7eXTERVEqp6vGtvZyfV20dA@dpg-cksi5v85vl2c738aeht0-a/ricoin_app",
        // })
    }

    async fetch(SQL, ...params) {
        const client = await this.#pg.connect();
        try {
            const { rows } = await client.query(SQL, params.length ? params : null);
            return rows;
        } catch (e) {
            console.log(e);
        } finally {
            client.release();
        }
    }
}
