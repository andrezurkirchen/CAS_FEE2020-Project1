import express from 'express';
const router = express.Router();

import {notesController} from '../controller/notesController';


router.get("/", notesController.getOrders.bind(notesController));
router.post("/", notesController.createPizza.bind(notesController));
router.get("/:id/", notesController.showOrder.bind(notesController));
router.delete("/:id/", notesController.deleteOrder.bind(notesController));

export const notesRoutes = router;
