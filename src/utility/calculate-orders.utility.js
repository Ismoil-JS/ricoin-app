import exchangeService from "../module/exchange/exchange.service.js";
import productService from "../module/product/product.service.js";
import userService from "../module/user/user.service.js";



export const CalculateOrders = async (user_id, product_id, amount) => {

    const user = await userService.getUserById(user_id);

    const product = await productService.getProductById(product_id);

    if(product[0].amount < amount) {return res.status(400).send("Not enough products")}
    else{
        const coins = user[0].coins - (product[0].price * amount);

        if(coins < 0) {return res.status(400).send("Not enough coins")}
        else{
            await userService.updateCoinsAndBoughtProducts({ id: user_id, coins: coins, product_id: product_id });

            const amountOfProducts = product[0].amount - amount;

            await productService.updateProductAmount({ id: product_id, amount: amountOfProducts });
        }
    }
}

export const CancelOrders = async (order_id) => {

        const order = await exchangeService.getExchangeByIdNotChanged(order_id);

        if(order[0].status === "finished" || order.length === 0 ) {return res.status(400).send("Order is already finished or does not exist")}
        else{
            const user = await userService.getUserById(order[0].user_id);

            const product = await productService.getProductById(order[0].product_id);
        
            const coins = user[0].coins + ((product[0].price - 2 ) * order[0].amount);

            await userService.updateCoins({ id: user[0].id, coins: coins });

            const amountOfProducts = product[0].amount + order[0].amount;

            await productService.updateProductAmount({ id: product[0].id, amount: amountOfProducts });

            await exchangeService.cancelExchange(order_id);
        }
        
}