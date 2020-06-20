/* Project 1 HSR CAS Frontend Engineering 2020
   André Zurkirchen
   June 2020
 */

import Datastore from 'nedb-promise'

export class SingleNote{
    constructor(noteId, createDate, noteFinished, noteTitle, noteDescription, noteImportance, noteDueDate, noteFinishedDate) {
        this.noteId = noteId; // option for later
        this.createDate = createDate; // when the note was created
        this.noteFinished = noteFinished; //checkbox
        this.noteTitle = noteTitle;
        this.noteDescription = noteDescription;
        this.noteImportance = noteImportance;
        this.noteDueDate = noteDueDate;
        this.noteFinishedDate = noteFinishedDate;
    }
}

class NotesStorage{
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    /* add empty note */
    async addEmpty() {
        let singleNote = new SingleNote("", "", "", "", "", "", "", "");
        return await this.db.insert(singleNote);
    }

    /* update note */
    async update(singleNote) {
        const _id = singleNote._id;
        return await this.db.update({_id: _id}, singleNote); // unfortunately the DB creates new docs:(
    }

    /* get note with a specific ID*/
    async get(id) {
        return await this.db.findOne({_id: id});
    }

    /* get all notes with with or without finished notes */
    async all(sortCriteria, showFinished) {
        let find;
        const sort = {[sortCriteria]: -1};

        showFinished == 1 ? showFinished = true : showFinished = false; //showFinished is string

        if (showFinished === true){
            find = {};
        }else{
            find = {noteFinished: false};
        }
       return await this.db.cfind(find).sort(sort).exec();

    }
}

export const notesStorage = new NotesStorage();
