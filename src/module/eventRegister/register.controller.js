import eventService from "../event/event.service.js";
import RegisterService from "./register.service.js";

class RegisterController {

    async createRegister(req, res) {
        const  user_id  = req.user;
        const  event_id  = req.params.id;

        const event = await eventService.getEventById(event_id);

        if (event[0].participants.includes(user_id)) {
            return res.status(400).json({ error: "User already registered for this event" });
        }

        await RegisterService.createRegisterEvent({ user_id, event_id });
        await RegisterService.createRegisterUser({ user_id, event_id });

        res.status(204).json();
    }

}

export default new RegisterController();