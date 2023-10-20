import { CalculateCoins } from "../../utility/calculate-coins.utility.js";
import eventService from "../event/event.service.js";
import scannerService from "./scanner.service.js";

class ScannerController {

    async scanQRCode(req, res) {
        try {
            const event_id = req.params.id;
            const user_id = req.user;

            const event = await eventService.getEventById(event_id);

            console.log(event[0].participants);

            if (!event[0].participants.includes(user_id)) {
                return res.status(401).json({
                    message: "You are not a participant of this event"
                });
            }

            const check = await scannerService.checkEarned({ user_id: user_id, event_id: event_id });

            if (check.length > 0) {
                return res.status(401).json({
                    message: "You have already earned with this QR code"
                });
            }

            CalculateCoins(user_id, event_id);

            scannerService.createEarned({ user_id: user_id, event_id: event_id });

            res.status(200).json({
                message: "Coins added successfully"
            });
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

}

export default new ScannerController();