import uuidValidate from 'uuid-validate';
import userService from '../module/user/user.service.js';
import productService from '../module/product/product.service.js';
import eventService from '../module/event/event.service.js';
import exchangeService from '../module/exchange/exchange.service.js';

export const CheckId = (req, res, next) => {
    const id = req.params.id || req.user;

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    if (!uuidValidate(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    // If the ID is present and valid, proceed to the next middleware or route handler
    next();
};

export const checkUserId = async(req, res, next) => {
    const id = req.user || req.params.id;
    const user = await userService.getUserById(id);

    if (!user.length) {
        return res.status(404).json({ error: "User not found with this ID" });
    }

    next();
};

export const checkProductId = async(req, res, next) => {
    const id = req.params.id;
    const product = await productService.getProductById(id);

    if (!product.length) {
        return res.status(404).json({ error: "Product not found with this ID" });
    }

    next();
};

export const checkEventId = async(req, res, next) => {
    const id = req.params.id;
    const event = await eventService.getEventById(id);

    if (!event.length) {
        return res.status(404).json({ error: "Event not found with this ID" });
    }

    next();
};

export const checkExchangeId = (req, res, next) => {
    const id = req.params.id;
    const exchange = exchangeService.getExchangeById(id);

    if (!exchange) {
        return res.status(404).json({ error: "Order not found with this ID" });
    }

    next();
}