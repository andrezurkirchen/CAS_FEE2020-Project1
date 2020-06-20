/* Project 1 HSR CAS Frontend Engineering 2020
   André Zurkirchen
   June 2020
 */
import { httpService } from './http-service.js'

class NoteService {

    async newNote() {
        return await httpService.ajax("POST", `/notes/`);
    }

    async updateNote(id, note) {
        return await httpService.ajax("POST", `/notes/${id}`, note);
   }

    async getNotes(sortCriteria, note) {
        return await httpService.ajax("GET", `/notes/${sortCriteria}/${note}`, undefined);
    }

    async getNote(id) {
        return await httpService.ajax("GET", `/notes/${id}`, undefined);
    }
}

export const noteService = new NoteService();