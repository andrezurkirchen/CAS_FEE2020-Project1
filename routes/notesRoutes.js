/* Project 1 HSR CAS Frontend Engineering 2020
   André Zurkirchen
   June 2020
 */

import express from 'express';
const router = express.Router();
import {notesController} from '../controller/notesController'; //ToDo rename to notesController

router.get("/:sortCriteria/:showFinished/", notesController.getNotes.bind(notesController));
router.post("/", notesController.newNote.bind(notesController));
router.get("/:id/", notesController.showNote.bind(notesController));
router.post("/:id/", notesController.updateNote.bind(notesController));



export const notesRoutes = router;