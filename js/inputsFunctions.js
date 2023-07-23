letter.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && letter.getAttribute('focused') === 'false') {
        validator.focus()
    } else if(letter.getAttribute('focused') === 'true') {
        letter.setAttribute('focused', false);
    }

    const inputElement = event.target;
    const inputValue = inputElement.value;

    // Eliminar números y convertir a mayúsculas
    const processedValue = inputValue.toUpperCase().replace(/[^A-Z]/g, '');

    // Obtener solo el primer carácter
    const firstCharacter = processedValue.charAt(0);

    if (processedValue.length === 1) {
        inputElement.value = firstCharacter;
        return;
    }

    inputElement.value = inputValue.length > 1 ? processedValue.charAt(1) : firstCharacter;
});

validator.addEventListener('click', validateAnswer);
clue.addEventListener('click', showClues);

const ahorcadoListener = setInterval(() => {
    if (ahorcado.getAttribute('changed') === 'true') {
        // Something...
    } else return;
}, 1);