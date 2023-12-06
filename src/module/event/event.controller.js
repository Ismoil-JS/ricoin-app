import EventService from "./event.service.js"

class EventController {
    
    async getEvents(_, res) {
        try {
            const event = await EventService.getEvents();

            res.status(200).json(event);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async getEventById(req, res) {
        try {
            const event = await EventService.getEventById(req.params.id);

            if (event.length === 0) {
                return res.status(404).json({ message: "Event not found" });
            }

            res.status(200).json(event);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async createEvent(req, res) {
        try {
            await EventService.createEvent(req.body);
            res.status(204).json();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async updateEvent(req, res) {
        try {
            const event = await EventService.updateEvent({
                id: req.params.id,
                ...req.body
            });

            if(!event){
                return res.status(404).json({ message: "Event deleted" });
            }

            if (event.length === 0) {
                return res.status(404).json({ message: "Event not found" });
            }

            res.status(204).json();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async deleteEvent(req, res) {
        try {
            await EventService.deleteEvent(req.params.id);

            res.status(204).json();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }
}

export default new EventController();