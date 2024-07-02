// Este evento asegura que todo el código dentro de esta función se 
//ejecute solo después de que el contenido HTML haya sido completamente 
//cargado y parseado.

document.addEventListener('DOMContentLoaded', function() {
    // Aquí seleccionamos los elementos de entrada de texto, el botón 
    //de añadir nota y el contenedor de la lista de notas.
    const noteInput = document.getElementById('note-input');
    const addNoteButton = document.getElementById('add-note');
    const notesList = document.getElementById('notes-list');

    // Cargar notas desde localStorage
    // Se cargan las notas almacenadas en localStorage. Si no hay notas
    // almacenadas, se inicializa un array vacío.
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    console.log('Notas cargadas desde localStorage:', notes);

    // Función para renderizar las notas en la interfaz de usuario
    // Esta función limpia la lista de notas y vuelve a generar el HTML 
    //para cada nota. Cada nota incluye un área de texto (inicialmente 
    //deshabilitada) y botones para editar, borrar y guardar.
    
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
    // Al hacer clic en el botón de añadir nota, se toma el texto de 
    //entrada, se agrega al array de notas y se guarda en localStorage. 
    //Luego, se renderizan nuevamente las notas.
    
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
    // La función deleteNote elimina una nota del array y actualiza
    // localStorage y la interfaz de usuario.
    
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