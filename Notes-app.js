function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

/* ============================
   BUILD: Notes App
   ============================ */

const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

function renderNotes() {
    const notes = getFromStorage('notes', []); // if none saved yet, default to empty array

    notesList.innerHTML = ''; // clear the list before redrawing it

    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            deleteNote(index);
        });

        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText === '') return; // ignore empty notes

    const notes = getFromStorage('notes', []);
    notes.push(noteText);
    saveToStorage('notes', notes);

    noteInput.value = ''; // clear the input box
    renderNotes(); // redraw the list with the new note included
}

function deleteNote(index) {
    const notes = getFromStorage('notes', []);
    notes.splice(index, 1); // remove 1 item at that position
    saveToStorage('notes', notes);
    renderNotes();
}

addNoteBtn.addEventListener('click', addNote);
renderNotes(); // show any previously saved notes as soon as the page loads