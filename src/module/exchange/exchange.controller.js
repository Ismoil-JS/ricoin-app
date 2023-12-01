import { CalculateOrders } from "../../utility/calculate-orders.utility.js";
import exchangeService from "./exchange.service.js";

class ExchangeController {

    async getExchanges(_, res) {
        try {
            const exchange = await exchangeService.getExchanges();

            res.status(200).json(exchange);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async getPendingExchanges(_, res) {
        try {
            const exchange = await exchangeService.getPendingExchanges();

            res.status(200).json(exchange);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async getFinishedExchanges(_, res) {
        try {
            const exchange = await exchangeService.getFinishedExchanges();

            res.status(200).json(exchange);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async getExchangeById(req, res) {
        try {
            const exchange = await exchangeService.getExchangeById(req.params.id);

            if (!exchange.length) {
                throw { status: 404, message: "Exchange does not exist with this ID" };
            }

            res.status(200).json(exchange);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async createExchange(req, res) {
        try {
            const user_id = req.user;
            const product_id = req.params.id;

            CalculateOrders(user_id, product_id);

            const exchange = await exchangeService.createExchange({ user_id, product_id });

            res.status(200).json(exchange);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async finishExchange(req, res) {
        try {
            const exchange = await exchangeService.finishExchange(req.params.id);

            res.status(200).json(exchange);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }


}

export default new ExchangeController();