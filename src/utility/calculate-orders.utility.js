import exchangeService from "../module/exchange/exchange.service.js";
import productService from "../module/product/product.service.js";
import userService from "../module/user/user.service.js";



export const CalculateOrders = async (user_id, product_id) => {

    const user = await userService.getUserById(user_id);

    const product = await productService.getProductById(product_id);

    const coins = user[0].coins - product[0].price;

    await userService.updateCoinsAndBoughtProducts({ id: user_id, coins: coins, product_id: product_id });
}

export const CancelOrders = async (order_id) => {

        const order = await exchangeService.getExchangeByIdNotChanged(order_id);

        const user = await userService.getUserById(order[0].user_id);

        const product = await productService.getProductById(order[0].product_id);

        const coins = user[0].coins + product[0].price - 2;

        await userService.updateCoins({ id: user[0].id, coins: coins });
}