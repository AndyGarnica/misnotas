document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('note-input');
    const addNoteButton = document.getElementById('add-note');
    const notesList = document.getElementById('notes-list');

    // Cargar notas desde localStorage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    console.log('Notas cargadas desde localStorage:', notes);

    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <p>${note}</p>
                <button onclick="deleteNote(${index})">Borrar</button>
            `;
            notesList.appendChild(noteElement);
        });
        console.log('Notas renderizadas:', notes);
    }

    // Agregar nueva nota
    addNoteButton.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        console.log('Texto de la nota:', noteText);
        if (noteText !== '') {
            notes.push(noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            console.log('Nota agregada.', notes);
            renderNotes();
        }
    });

    // Eliminar nota
    window.deleteNote = function(index) {
        console.log('Eliminar nota en el índice:', index);
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        console.log('Nota eliminada', notes);
        renderNotes();
    };

    // Renderizar las notas al cargar la página
    renderNotes();
});
