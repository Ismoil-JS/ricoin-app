import eventService from "../module/event/event.service.js";
import userService from "../module/user/user.service.js";


export const CalculateCoins = async (user_id, event_id) => {

    const user = await userService.getUserById(user_id);

    const event = await eventService.getEventById(event_id);

    const coins = user[0].coins + event[0].coins;

    await userService.updateCoins({ id: user_id, coins: coins });
}