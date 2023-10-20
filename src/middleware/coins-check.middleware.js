import productService from "../module/product/product.service.js";
import userService from "../module/user/user.service.js";


export const coinsCheck = async(req, res, next) => {
    const user_id = req.user;
    const product_id = req.params.id;

    const user = await userService.getUserById(user_id);

    const product = await productService.getProductById(product_id);

    if (user[0].coins < product[0].price) {
        return res.status(400).json({ error: "You don't have enough coins to buy this product" });
    }

    next();
};