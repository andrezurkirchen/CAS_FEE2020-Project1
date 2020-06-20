/* Project 1 HSR CAS Frontend Engineering 2020
   André Zurkirchen
   June 2020
 */

import { noteService } from '../services/note-service.js'
const orderContainer = document.querySelector("#orderContainer");
const orderRenderer = Handlebars.compile(document.querySelector("#order-template").innerHTML);

let noteId = window.location.hash.substring(1);

/* load UI style */
const currentTheme = localStorage.getItem("noteTheme");
if (currentTheme) {
    document.documentElement.setAttribute('noteTheme', currentTheme);
}

async function renderNote() {
    orderContainer.innerHTML = orderRenderer(await noteService.getNote(noteId));

    if (noteId === "new"){
        document.getElementById("importance").value = 1; // set initial value of importance
        document.getElementById("importance").innerText =createImportanceSymbol(1);
    }
}

function createImportanceSymbol(importance) {
    const symbol = "\u26A1"
    let text;
    switch(importance) {
        case 1:
            text = symbol;
            break;
        case 2:
            text = symbol + symbol;
            break;
        case 3:
            text = symbol +symbol +symbol;
            break;
        case 4:
            text = symbol +symbol +symbol +symbol;
            break;
        case 5:
            text = symbol +symbol +symbol +symbol +symbol;
            break;
        default:
            text = " "
    }
    return text;
}

orderContainer.addEventListener("click", async event => {
    let singleNote;

    /* save button pressed */
    if (event.target.id === "buttonSave") {

        if (noteId === "new"){
            singleNote = await noteService.newNote();
            noteId = singleNote._id;
            singleNote = await noteService.getNote(noteId);
            singleNote.createDate = new Date();
            singleNote.noteFinished = false;
        }else{
            singleNote = await noteService.getNote(noteId);
        }

        singleNote.noteTitle = document.getElementById("title").value;
        singleNote.noteDescription = document.getElementById("description").value;
        singleNote.noteImportance = parseInt(document.getElementById("importance").value);
        singleNote.noteDueDate = document.getElementById("duedate").value;

        await noteService.updateNote(noteId, singleNote);

        location.replace("index.html");
    }
    /* importance button pressed */
    if (event.target.id === "importance") {
        let importance = document.getElementById("importance").value;
        importance = (importance>=5) ? importance = 1 : ++importance;
        event.target.value = importance;
        event.target.innerHTML = createImportanceSymbol(importance);
    }
});

renderNote();