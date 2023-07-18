letter.addEventListener('keyup', (event) => {
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

    if (event.keyCode === 13) {
        letter.blur()
    }
});

validator.addEventListener('click', validateAnswer);
clue.addEventListener('click', showClues);