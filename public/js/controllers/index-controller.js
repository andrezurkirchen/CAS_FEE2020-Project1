/* Project 1 HSR CAS Frontend Engineering 2020
   André Zurkirchen
   June 2020
 */

import { noteService } from '../services/note-service.js'

const selectorUiStyle = document.querySelector("#selectorUiStyle");
const btnSortByDueDate = document.querySelector("#buttonSortByDueDate");
const btnSortByCreateDate = document.querySelector("#buttonSortByCreateDate");
const btnSortByImportance = document.querySelector("#buttonSortByImportance");
const btnShowFinished = document.querySelector("#buttonShowFinished");

/* Retrieve from storage */

/* UI scheme */
const currentTheme = localStorage.getItem("noteTheme");
if (currentTheme) {
    if (currentTheme === 'Dark-mode') {
        flipUiStyle("Dark-mode");
    }
}else {
    document.documentElement.setAttribute('noteTheme', "Light-mode");
}

/* active sort button */
let sortCriteria, showFinished, activeButton

if (localStorage.getItem("notesSortCriteria")) {
    sortCriteria = localStorage.getItem("notesSortCriteria");
}else{
    localStorage.setItem("notesSortCriteria", "createDate");
    sortCriteria = "createDate";
}

if (localStorage.getItem("showFinished")) {
    showFinished = (localStorage.getItem("showFinished"));
}else{
    localStorage.setItem("showFinished", "0");
    showFinished = "0";
}

if (localStorage.getItem("notesActiveButton")) {
    activeButton = localStorage.getItem("notesActiveButton");
}else{
    localStorage.setItem("notesActiveButton", "buttonSortByCreateDate");
    activeButton = "buttonSortByCreateDate";
}
const notesContainer = document.querySelector("#notesContainer");
const notesRenderer = Handlebars.compile(document.querySelector("#notes-template").innerHTML);


/* button UI style pressed */
selectorUiStyle.addEventListener("click", async function (event) {

    if (event.target.value === "Light-mode"){
        flipUiStyle('Dark-mode');
    }else {
        flipUiStyle('Light-mode');
    }
});

/* button sortByFinishDate style pressed */
btnSortByDueDate.addEventListener("click", async function (event) {
    pressButton("buttonSortByDueDate", "noteDueDate");
});

/* button sortByCreateDate style pressed */
btnSortByCreateDate.addEventListener("click", async function (event) {
    pressButton("buttonSortByCreateDate", "createDate");
});

/* button sortByImportance style pressed */
btnSortByImportance.addEventListener("click", async function (event) {
    pressButton("buttonSortByImportance", "noteImportance");
});

/* button showFinished style pressed */
btnShowFinished.addEventListener("click", async function (event) {

    event.target.classList.toggle("selected");

    if (event.target.classList.contains("selected")){
        localStorage.setItem("showFinished", "1");
        showFinished = "1";
    }else{
        localStorage.setItem("showFinished", "0");
        showFinished = "0";
    }
    renderNotes();
});

/* create today's date */
function createDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    dd < 10 ? dd = '0' + dd : dd;
    mm < 10 ? mm = '0' + mm : mm;
    today = yyyy + '-' + mm + '-' + dd;
    return today
}

/* deselect all sort buttons and select new sort button */
function pressButton(button, sort) {
    unpressButton("buttonSortByDueDate");
    unpressButton("buttonSortByCreateDate");
    unpressButton("buttonSortByImportance");

    /* save in storage */
    localStorage.setItem("notesSortCriteria", sort);
    localStorage.setItem("notesActiveButton", button);

    activeButton = button;
    sortCriteria = sort;

    document.getElementById(button).classList.toggle("selected");

    if (showFinished == 1) {
        if (btnShowFinished.classList.contains("selected") === false) {
            btnShowFinished.classList.add("selected");
        }
    }
    renderNotes()

    function unpressButton(button){
        let element = document.getElementById(button);

        if (element.classList.contains("selected")) {
            document.getElementById(button).classList.toggle("selected");
        }
    }
}

/* flip UI style */
function flipUiStyle(mode){
    document.documentElement.setAttribute('noteTheme', mode);
    localStorage.setItem('noteTheme', mode);
    selectorUiStyle.value = mode;
    selectorUiStyle.innerHTML = mode;
}

async function renderNotes() {
    notesContainer.innerHTML = notesRenderer({notes: await noteService.getNotes(sortCriteria, showFinished)});
}

notesContainer.addEventListener("click", async function (event) {

    /* Checkbox pressed */
    if(event.target.id === "checkboxFinished") {
        let singleNote = await noteService.getNote(event.target.dataset.id);
        singleNote.noteFinished = event.target.checked;

        /* if checkbox = true then set today's date */
        if (event.target.checked === true){

            singleNote.noteFinishedDate = createDate();
        }
        await noteService.updateNote(event.target.dataset.id, singleNote);
        await renderNotes();
    }

    /* Button expand pressed */
    if(event.target.id === "buttonExpand") {
        event.target.previousElementSibling.classList.toggle("expanded");
    }
});

pressButton(activeButton, sortCriteria);