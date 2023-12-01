import productService from "../module/product/product.service.js";
import userService from "../module/user/user.service.js";


export const CalculateOrders = async (user_id, product_id) => {

    const user = await userService.getUserById(user_id);



    const product = await productService.getProductById(product_id);



    const coins = user[0].coins - product[0].price;

    await userService.updateCoinsAndBoughtProducts({ id: user_id, coins: coins, product_id: product_id });
}