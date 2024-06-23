document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('note-input');
    const addNoteButton = document.getElementById('add-note');
    const notesList = document.getElementById('notes-list');

    // Cargar notas 
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <p>${note}</p>
            `;
            notesList.appendChild(noteElement);
        });
    }

    // Agregar nueva nota
    addNoteButton.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            notes.push(noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            renderNotes();
        }
    });

    // Renderizar las notas al cargar la página
    renderNotes();
});
