const noteInput = document.getElementById('noteInput');
const reminderInput = document.getElementById('reminderInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const board = document.getElementById('board');

const colors = ["#FFEB3B", "#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFCC80", "#E1BEE7"];

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  board.innerHTML = "";
  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.style.background = colors[Math.floor(Math.random() * colors.length)];
    noteDiv.innerHTML = `
      <button class="delete-btn" onclick="deleteNote(${index})">✖</button>
      <p>${note.text}</p>
      ${note.reminder ? `<small>⏰ ${new Date(note.reminder).toLocaleString()}</small>` : ""}
    `;

    // If reminder time is reached, shake the note
    if (note.reminder && new Date(note.reminder) <= new Date()) {
      noteDiv.classList.add("reminder-alert");
    }

    board.appendChild(noteDiv);
  });
}

function addNote() {
  if (noteInput.value.trim() === "") return;

  const newNote = {
    text: noteInput.value,
    reminder: reminderInput.value || null
  };

  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));

  noteInput.value = "";
  reminderInput.value = "";

  renderNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

addNoteBtn.addEventListener("click", addNote);

renderNotes();
