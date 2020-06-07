/* Projekt 1 HSR CAS Frontend Engineering 2020
   André Zurkirchen
   May 2020
 */

/* init */
var currentNote; // storage place to be used for the edit button
var noteObjArray = [];
var noteObj;


/* init */
createTestData();
fillNotesUL();

/* create today's date */
function createDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    dd < 10 ? dd = '0' + dd : dd;
    mm < 10 ? mm = '0' + mm : mm;
    today = dd + '.' + mm + '.' + yyyy;
    return today
}

/* create test data */
function createTestData() {
    noteObj = {
        noteId: 1, noteFinished: true, noteTitle: "Issue 1", noteDescription: "Description Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1Issue 1 Description Issue 1 Description Issue 1",
        noteImportance: 1, noteDueDate: "01.06.2020", noteFinishedDate: "03.06.2020"
    }
    noteObjArray.push(noteObj);
    noteObj = {
        noteId: 2, noteFinished: false, noteTitle: "Issue 2 bbbbbbb", noteDescription: "Description Issue 2",
        noteImportance: 2, noteDueDate: "02.02.1902", noteFinishedDate: ""
    }
    noteObjArray.push(noteObj);
    noteObj = {
        noteId: 3, noteFinished: false, noteTitle: "Issue 3", noteDescription: "Description Issue 3",
        noteImportance: 3, noteDueDate: "03.03.1903", noteFinishedDate: ""
    }
    noteObjArray.push(noteObj);
    noteObj = {
        noteId: 4, noteFinished: false, noteTitle: "Issue 4", noteDescription: "Description Issue 4",
        noteImportance: 4, noteDueDate: "04.04.1904", noteFinishedDate: ""
    }
    noteObjArray.push(noteObj);
    noteObj = {
        noteId: 5, noteFinished: false, noteTitle: "Issue 5", noteDescription: "Description Issue 5",
        noteImportance: 5, noteDueDate: "05.05.1905", noteFinishedDate: ""
    }
    noteObjArray.push(noteObj);
    noteObj = {
        noteId: 6, noteFinished: false, noteTitle: "Issue 6", noteDescription: "Description Issue 6",
        noteImportance: 1, noteDueDate: "06.06.1906", noteFinishedDate: ""
    }
    noteObjArray.push(noteObj);
    noteObj = {
        noteId: 7, noteFinished: true, noteTitle: "Issue 7", noteDescription: "Description Issue 7 ddddddddddd",
        noteImportance: 2, noteDueDate: "06.06.1906", noteFinishedDate: "01.06.2020"
    }
    noteObjArray.push(noteObj);
}

/* create special symbol for importance */
function createImportanceSymbol(impvalue) {
    const symbol = "\u26A1"  //todo 2 times declared!!!
    var text;
    switch(impvalue) {
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

// add notes to the list
function fillNotesUL() {
    var i, noteId;
    var li, node, span, text, br, importance;
    for (i = 0; i < noteObjArray.length; i++) {
        nodeid = i+1;
        li = document.createElement("li");

        // add due data
        node = document.createTextNode(noteObjArray[i].noteDueDate);
        li.appendChild(node);
        document.getElementById("notesUL").appendChild(li);

        // add tile
        node = document.createTextNode(noteObjArray[i].noteTitle);
        span = document.createElement("SPAN");
        span.setAttribute("class", "noteTitle");
        span.appendChild(node);
        li.appendChild(span);

        // add importance
        text = createImportanceSymbol(noteObjArray[i].noteImportance);
        importance = document.createTextNode(text);
        span = document.createElement("SPAN");
        span.appendChild(importance);
        li.appendChild(span);

        // add checkbox
        br = document.createElement("BR")
        li.appendChild(br);
        node = document.createElement("INPUT");
        node.setAttribute("type", "checkbox");
        node.setAttribute("id", "checkboxNoteFinished");
        node.setAttribute("name", noteId); //store nodeId in name
        //node.setAttribute("checked", noteObjArray[i].noteFinished); //todo marks all checkboxes not working :( --> see workaround below
        node.setAttribute("value", noteObjArray[i].noteFinished);
        //span = document.createElement("SPAN");
        //span.appendChild(node);
        li.appendChild(node);

        // add text after checkbox
        noteObjArray[i].noteFinished === true ? text = "Finished [" + noteObjArray[i].noteFinishedDate +"]" : text = "Finished";
        node = document.createTextNode(text);
        span = document.createElement("SPAN");
        span.setAttribute("class", "checkboxText");
        span.appendChild(node);
        li.appendChild(span);

        // add description
        node = document.createElement("textarea");
        text = document.createTextNode(noteObjArray[i].noteDescription);
        node.appendChild(text);
        //span = document.createElement("SPAN");
        node.setAttribute("id", "noteDescription");
        node.setAttribute("class", "noteDescription colapsed");
        node.setAttribute("disabled", "true");
        //span.appendChild(node);
        li.appendChild(node);

        //add button after description for expand
        node = document.createElement("button");
        node.setAttribute("id", "buttonExpand");
        node.innerHTML = '\u2207';
        li.appendChild(node);

        //add edit button
        node = document.createElement("button");
        node.setAttribute("id", "buttonEdit");
        node.setAttribute("class", "button type1 right");
        node.setAttribute("name", nodeid); //store nodeid in name
        node.innerHTML = 'Edit';
        li.appendChild(node);
    }

    // workaround for the not working - marks all checkboxes :(
    var allcheckbox, checkbox, checkboxlist;
    checkboxlist = document.getElementsByTagName('input');
    //console.log(checkboxlist);
    //console.log(checkboxlist.length);
    for (i = 0; i < checkboxlist.length; i++) {
        checkbox = document.getElementsByTagName('input')[i];
        checkbox.value == "true" ? checkbox.checked = true : checkbox.checked = false;
    }
}

/* Scroll area */
/*var elmnt = document.getElementById("scrollarea");
elmnt.scrollIntoView();
*/



/*------------------------------------------*/
/* Event listener for buttons and selectors */
/*------------------------------------------*/

/* UI selector */
const selectedElement = document.querySelector('#selectoruistyle');
selectedElement.addEventListener('change', (event) => {
    const result = document.querySelector('.result');
    console.log(event.target.value);
});

/* button sort by finished date */
document.getElementById("buttonsortbyfinishdate").addEventListener("click", sortByFinishDate);
function sortByFinishDate() {
    console.log("buttonsortbyfinishdate pressed"); //ToDo
}

/* button sort by created date */
document.getElementById("buttonsortbycreateddate").addEventListener("click", sortByCreatedDate);
function sortByCreatedDate() {
    console.log("buttonsortbycreateddate pressed"); //ToDo
}

/* button sort by importance */
document.getElementById("buttonsortbyimportance").addEventListener("click", sortByImportance);
function sortByImportance() {
    console.log("buttonsortbyimportance pressed"); //ToDo
}

/* checkbox pressed in a note */
document.querySelectorAll('#checkboxNoteFinished').forEach(item => {
    item.addEventListener("click", function(e){
        //todo write new values into the DB - checked and finihed date
        console.log(e.target.checked);
        console.log(e.target.name);
        //e.target.name; // Issue ID
        //e.target.checked;  // current value of notFinished

       // add current date if checkbox true
        e.target.checked === false ? text = "Finished" : text = "Finished [" + createDate() +"]";
        var node = e.target.nextSibling.innerHTML = text;
    });
});

/* Click on expand button in description */
document.querySelectorAll('#buttonExpand').forEach(item => {
    item.addEventListener("click", function(e){

        var node = e.target.previousSibling;
        node.className === "noteDescription expanded" ? node.className = "noteDescription colapsed" : node.className = "noteDescription expanded";
        // Todo dynamic height based on text
    });
});

/* Click on edit button next to a note */
document.querySelectorAll('#buttonEdit').forEach(item => {
    item.addEventListener("click", function(e){

        console.log(e.target.name);
        currentNote = e.target.name; // store current issue ID
        location.href = "./createEditNote.html";
        // Todo call edit page
    });
});
