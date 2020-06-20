/* Project 1 HSR CAS Frontend Engineering 2020
   André Zurkirchen
   June 2020
 */

import {notesStorage} from '../services/notesStorage'

export class NotesController {

    async getNotes(req, res) {
        res.json((await notesStorage.all(req.params.sortCriteria, req.params.showFinished) || []));
    };

    async newNote(req, res) {
        res.json(await notesStorage.addEmpty(req.body));
    };

    async showNote(req, res) {
        res.json(await notesStorage.get(req.params.id));
    };

    async updateNote(req, res) {
        res.json(await notesStorage.update((req.body)));
    };
}

export const notesController = new NotesController();