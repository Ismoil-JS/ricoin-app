import eventService from "../event/event.service.js";
import RegisterService from "./register.service.js";

class RegisterController {

    async createRegister(req, res) {
        try {
            const user_id = req.user;
            const event_id = req.params.id;

            const event = await eventService.getEventById(event_id);

            if (event[0].participants.includes(user_id)) {
                return res.status(400).json({ message: "Siz allaqachon bu tadbirga kirgansiz" });
            }

            await RegisterService.createRegisterEvent({ user_id, event_id });
            await RegisterService.createRegisterUser({ user_id, event_id });

            res.status(201).json({ message: "Siz tadbirga kirdingiz" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default new RegisterController();