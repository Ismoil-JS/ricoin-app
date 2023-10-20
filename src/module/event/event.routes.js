import { Router } from "express"
import  EventController  from "./event.controller.js"
import { CheckId } from "../../middleware/id-check.middleware.js";
import { auth, adminAuth } from "../../middleware/auth.middleware.js";

const router = Router();

export const eventRoutes = router
    .get("/", EventController.getEvents)
    .get("/:id", CheckId, EventController.getEventById)
    .post("/", auth, adminAuth, EventController.createEvent)
    .patch("/:id", auth, adminAuth, CheckId, EventController.updateEvent)
    .delete("/:id", auth, adminAuth, CheckId, EventController.deleteEvent)