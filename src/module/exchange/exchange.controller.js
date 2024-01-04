import { CalculateOrders, CancelOrders } from "../../utility/calculate-orders.utility.js";
import exchangeService from "./exchange.service.js";
import jwt from "jsonwebtoken";

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
                res.status(404).json({ status: 404, message: "Exchange does not exist with this ID" });
            }
            else{
                res.status(200).json(exchange);
            }

        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async getExchangeByUserId(req, res) {
        try {
            const exchange = await exchangeService.getExchangeByUserId(req.user);

            res.status(200).json(exchange);

        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async createExchange(req, res) {
        try {
            const user_id = req.user;
            const product_id = req.params.id;
            const { amount } = req.body;

            CalculateOrders(user_id, product_id, amount || 1);

            await exchangeService.createExchange({ user_id, product_id, amount });

            res.status(204).json();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async finishExchange(req, res) {
        try {
            const id = req.params.id;
            const explanation = req.body.explanation;

            await exchangeService.finishExchange({ id, explanation });

            res.status(204).json();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async cancelExchange(req, res) {
        try {
            const exchange = await exchangeService.getExchangeById(req.params.id);

            const userInfo = await exchangeService.getExchangeByIdNotChanged(req.params.id);

            const token = req.header("x-auth-token");
            
            const user = jwt.verify(token, "secret");

            if (user.id !== userInfo[0].user_id) {
                return res.status(400).json({ status: 400, message: "You are not allowed to cancel this exchange" });
            }
            
            if (!exchange.length ) {
                return res.status(404).json({ status: 404, message: "Exchange does not exist with this ID" });
            }
            else if (exchange[0].order_status === "done") {
                return res.status(400).json({ status: 400, message: "Exchange is already finished" });
            }
            else{
                CancelOrders(req.params.id);
    
                await exchangeService.cancelExchange(req.params.id);
    
                res.status(204).json();
            }
            
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }


}

export default new ExchangeController();