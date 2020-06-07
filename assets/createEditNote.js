/* Projekt 1 HSR CAS Frontend Engineering 2020
   André Zurkirchen
   May 2020
 */

const impsymbol = "\u26A1"

/* init */
currentNote = 1;

initData();

function initData(){
    var node, text
    node = document.getElementById(title);
    text = document.createTextNode(noteObjArray[currentNote].noteDescription);
    console.log(text);
    node.appendChild(text);
}

function changeimportance() {
    var buttonvalue = document.getElementById("myBtn").value;
    buttonvalue = (buttonvalue==5) ? buttonvalue = 1 : ++buttonvalue;
    var buttonvalue;
    switch(buttonvalue) {
        case 1:
            buttontext = impsymbol;
            break;
        case 2:
            buttontext = impsymbol + impsymbol;
            break;
        case 3:
            buttontext = impsymbol +impsymbol +impsymbol;
            break;
        case 4:
            buttontext = impsymbol +impsymbol +impsymbol +impsymbol;
            break;
        case 5:
            buttontext = impsymbol +impsymbol +impsymbol +impsymbol +impsymbol;
            break;
        default:
            buttontext = " "
    }

    //console.log(buttontext);

    document.getElementById("myBtn").textContent = buttontext;
    document.getElementById("myBtn").value = buttonvalue;
}




/* Event listener buttons and selectors */
/* button save*/
document.getElementById("buttonsave").addEventListener("click", savenote);
let noteObjArray = [];
function savenote() {

    let noteTitle = document.getElementById("title").value;
    if (noteTitle === '') {
        alert("You must write something!");
        return;
    }
    let noteDescription = document.getElementById("description").value;
    let noteimportance = document.getElementById("importance").value;
    let noteDueDate = document.getElementById("duedate").value;

    noteObj = {
        noteTitle: noteTitle, noteDescription: noteDescription,
        noteimportance: noteimportance, noteDueDate: noteDueDate
    }

    noteObjArray.push(noteObj);

    console.log(noteObjArray);
    persistnotes();
}


function persistnotes() {
    //  speichern
    noteStorage = JSON.stringify(noteObjArray);
    localStorage.setItem("noteStorageJSON", noteStorage);
// laden
    noteStorageNew = localStorage.getItem("noteStorageJSON");
    storedNoteObj = JSON.parse(noteStorageNew);
    console.log(storedNoteObj);
}