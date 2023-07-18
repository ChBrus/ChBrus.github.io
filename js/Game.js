let wordDictionary, gameIndex = 0, ahorcadoIndex = 0;

function startGame() {
    wordDictionary = getRandomWords();
    setInputs();
}

function validateAnswer() {
    const letterValue = letter.value;

    if (letterValue.length <= 0) return

    const lettersInWord = wordKeyNameToUpperCase(wordDictionary[gameIndex]).split(' ').join('').split('');
    const tempInputs = getInputs();
    let error = 0, inputsDisabled = 0;
    
    tempInputs.forEach((input) => {
        if (input.disabled && !input.readonly) {
            inputsDisabled++;
        }
    });

    lettersInWord.forEach((element, index) => {
        if (element == letterValue && tempInputs[index].disabled) {
            tempInputs[index].value = element;
            tempInputs[index].readonly = true;
            tempInputs[index].disabled = false;
        } else {
            error++;
        }
    });

    if (error === inputsDisabled) {
        ahorcadoIndex++;
        changeAhorcadoImg();
    }

    console.log(error, inputsDisabled);
}

function showClues() {
    if (cluesImages.getAttribute('clues') === 'true') {
        while (cluesImages.firstChild) {
            cluesImages.removeChild(cluesImages.firstChild);
        }

        cluesImages.setAttribute("clues", false);
        return;
    }

    const h1 = document.createElement("h1");
    const ajax = document.createElement("div");
    ajax.className = "images";
    h1.innerHTML = "Clues";
    cluesImages.appendChild(h1);
    cluesImages.appendChild(ajax);

    wordDictionary[gameIndex].images.map((image) => {
        const temp = document.createElement("img");
        temp.src = image;

        ajax.appendChild(temp);
    });

    cluesImages.setAttribute("clues", true);
}

function setInputs() {
    const words = wordDictionary[gameIndex].name.split(' ');
    let wordsInputs = [];
    let temp = [];

    words.forEach((word, index) => {
        word.split('').forEach(() => {
            let helper = document.createElement("input");
            helper.type = 'text';
            helper.setAttribute('disabled', true);
            temp.push(helper);
        })

        wordsInputs.push(temp);
        temp = []
        const ajax = document.createElement("div");
        ajax.className = "word";
        wordsInputs[index].map((letter) => { ajax.appendChild(letter) });
        wordguess.appendChild(ajax);
    })
}

function getInputs() {
    const words = document.querySelectorAll('.wordguess .word');

    const temp = []
    words.forEach((tag) => {
        Array.from(tag.children).forEach((input) => {
            temp.push(input);
        });
    });

    return temp;
}

function changeAhorcadoImg() {
    ahorcado.src = ahorcadoImg[ahorcadoIndex]
}

function getRandomWords() {
    let arrayIndexes = Math.floor(wordKey.length / 2);
    let temp = [];

    for (let i = 0; i < arrayIndexes; i++) {
        temp.push(wordKey[random(0, wordKey.length - 1)]);
    }

    return temp;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", startGame);