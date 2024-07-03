// script.js

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
                <textarea disabled>${note}</textarea>
                <button onclick="editNote(${index})">Editar</button>
                <button onclick="deleteNote(${index})">Borrar</button>
                <button onclick="saveNote(${index})" style="display:none;">Guardar</button>
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
            console.log('Nota agregada. Estado actual de las notas:', notes);
            renderNotes();
        }
    });

    // Eliminar nota
    window.deleteNote = function(index) {
        console.log('Eliminar nota en el índice:', index);
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        console.log('Nota eliminada. Estado actual de las notas:', notes);
        renderNotes();
    };

    // Editar nota
    window.editNote = function(index) {
        const noteElement = notesList.children[index];
        const textArea = noteElement.querySelector('textarea');
        const saveButton = noteElement.querySelector('button[onclick^="saveNote"]');
        textArea.removeAttribute('disabled');
        saveButton.style.display = 'inline-block';
        console.log('Editando nota', index);
    };

    // Guardar nota editada
    window.saveNote = function(index) {
        const noteElement = notesList.children[index];
        const textArea = noteElement.querySelector('textarea');
        notes[index] = textArea.value;
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        console.log('Nota guardada:', notes);
    };

    // Renderizar las notas al cargar la página
    renderNotes();
});
