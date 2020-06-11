import Datastore from 'nedb-promise'

export class SingleNote{
    constructor(noteId, noteFinished, noteTitle, noteDescription, noteImportance, noteDueDate, noteFinishedDate) {
        this.noteId = noteId;
        this.noteFinished = noteFinished;
        this.noteTitle = noteTitle;
        this.noteDescription = noteDescription;
        this.noteImportance = noteImportance;
        this.noteDueDate = noteDueDate;
        this.noteFinishedDate = noteFinishedDate;
    }
}

class Notes{

    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(noteId, noteFinished, noteTitle, noteDescription, noteImportance, noteDueDate, noteFinishedDate) {
        let singleNote = new SingleNote(noteId, noteFinished, noteTitle, noteDescription, noteImportance, noteDueDate, noteFinishedDate);
        return await this.db.insert(singleNote);
    }

    async update(noteId, noteFinished, noteTitle, noteDescription, noteImportance, noteDueDate, noteFinishedDate) {
        //await this.db.update({_id: id, orderedBy: currentUser}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    //async get(id, currentUser) {
    //    return await this.db.findOne({_id: id, orderedBy : currentUser});
    //}
}

export const notes = new Notes();


//createTestData(notes);

function createTestData(notes) {
    notes.add(1,true, "Issue 1",
        "Description Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1 Description Issue 1 Description Issue 1",
        1, "01.06.2020", "01.07.2020");
    notes.add(2,true, "Issue 2",
        "Description Issue 2",
        2, "02.06.2020", "02.07.2020");

    notes.add(3,true, "Issue 3",
        "Description Issue 3",
       2, "03.06.2020", "03.07.2020");

    notes.add(3,true, "Issue 3",
       "Description Issue 3",
        2, "03.06.2020", "03.07.2020");

    notes.add(4,true, "Issue 4",
       "Description Issue 4",
       4, "04.06.2020", "04.07.2020");

    notes.add(5,true, "Issue 5",
        "Description Issue 5",
        5, "05.06.2020", "05.07.2020");

    notes.add(6,true, "Issue 6",
        "Description Issue 3",
        1, "06.06.2020", "06.07.2020");
}
