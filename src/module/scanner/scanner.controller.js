import { CalculateCoins } from "../../utility/calculate-coins.utility.js";
import eventService from "../event/event.service.js";
import scannerService from "./scanner.service.js";

class ScannerController {

    async scanQRCode(req, res) {
        try {
            const event_id = req.params.id;
            const user_id = req.user;

            const event = await eventService.getEventById(event_id);

            // console.log(event[0].participants);

            if (!event[0].participants.includes(user_id)) {
                return res.status(400).json({
                    message: "Siz bu tadbirda qatnashmagansiz"
                });
            }

            const check = await scannerService.checkEarned({ user_id: user_id, event_id: event_id });

            if (check.length > 0) {
                return res.status(400).json({
                    message: "Siz bu tadbir uchun coinlarni allaqachon olgansiz"
                });
            }

            CalculateCoins(user_id, event_id);

            scannerService.createEarned({ user_id: user_id, event_id: event_id });

            res.status(201).json({
                message: "Coinlaringiz muvaffaqiyatli qo'shildi"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default new ScannerController();