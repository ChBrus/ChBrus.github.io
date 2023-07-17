function inputFunction(event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;

    // Eliminar números y convertir a mayúsculas
    const processedValue = inputValue.toUpperCase().replace(/[0-9]/g, '');

    // Obtener solo el primer carácter
    const firstCharacter = processedValue.charAt(0);

    // Asignar el primer carácter como el valor del input
    inputElement.value = firstCharacter;
}  