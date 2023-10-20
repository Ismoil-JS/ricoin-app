import { Postgres } from "../../postgres/postgres.js";

export class EventModel {
    #_postgres 

    constructor() {
        this.#_postgres = new Postgres();
    }

    async getEvents() {
        const query = `SELECT * FROM events`;
        return await this.#_postgres.fetch(query);
    }

    async getEventById(id) {
        const query = `SELECT * FROM events WHERE id = $1`;
        return await this.#_postgres.fetch(query, id);
    }

    async createEvent(payload) {
        const query = `INSERT INTO events (name, date, coins, image, location) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        return await this.#_postgres.fetch(query, payload.name, payload.date, payload.coins, payload.image, payload.location);
    }

    async updateEvent(payload) {
        const product = await this.getEventById(payload.id);

        const { name, date, coins, image, location } = payload; // Destructure payload
    
        const query = `
            UPDATE events 
            SET 
                name = $1,
                date = $2,
                coins = $3,
                image = $4,
                location = $5
            WHERE id = $6
            RETURNING *
        `;

        if (product.length === 0) {
            return null;
        }
    
        return await this.#_postgres.fetch(
            query,
            name || product[0].name, // Use payload value if defined, otherwise use the existing value
            date || product[0].date,
            coins || product[0].coins,
            image || product[0].image,
            location || product[0].location,
            payload.id
        );
    }
    

    async deleteEvent(id) {
        const query = `DELETE FROM events WHERE id = $1`;
        return await this.#_postgres.fetch(query, id);
    }
}