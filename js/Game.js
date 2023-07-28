let wordDictionary, gameIndex = 0, ahorcadoIndex = 0;

function startGame() {
    wordDictionary = getRandomWords();
    setInputs();

    if (window.innerWidth < 500) {
        letter.setAttribute('title', letter.getAttribute('placeholder'));
        letter.removeAttribute('placeholder');
    }
}

function nextlevel() {
    gameIndex++;

    // Remove all about old clues
    while (cluesImages.firstChild) {
        cluesImages.removeChild(cluesImages.firstChild);
    }

    // Remove all about old word
    while (wordguess.firstChild) {
        wordguess.removeChild(wordguess.firstChild);
    }

    letter.value = '';
    letter.focus();

    changeButton();
    setInputs();
}

function validateAnswer() {
    const letterValue = letter.value;

    if (letterValue.length <= 0) return;
    else if (validator.getAttribute('nextlevel') === 'true') {
        nextlevel();
        return;
    } else if (validator.getAttribute('gamelost') === 'true') {
        location.reload();
        return;
    }

    const lettersInWord = wordKeyNameToUpperCase(wordDictionary[gameIndex]).split(' ').join('').split('');
    const tempInputs = getInputs();
    let error = 0, inputsDisabled = 0;

    tempInputs.forEach((input) => {
        if (input.getAttribute('disabled') === "true" && input.getAttribute('readonly') === "false") {
            inputsDisabled++;
        }
    });

    lettersInWord.forEach((element, index) => {
        if (element == letterValue && tempInputs[index].getAttribute('disabled') === "true" && tempInputs[index].getAttribute('readonly') === "false") {
            tempInputs[index].value = element;
            tempInputs[index].setAttribute('disabled', false);
            tempInputs[index].setAttribute('readonly', true);
        } else if (tempInputs[index].getAttribute('disabled') === "true" && tempInputs[index].getAttribute('readonly') === "false") {
            error++;
        }
    });

    if (error === inputsDisabled) {
        ahorcadoIndex++;
        changeAhorcadoImg();
    } else if (error === 0 && gameIndex < wordDictionary.length - 1) {
        changeButton();
        return;
    } else if (error === 0 && gameIndex === wordDictionary.length - 1) {
        alert('¡CONGRATULATIONS! You won 😎');
        return;
    }

    letter.focus();
    letter.setAttribute('focused', true);
}

function showClues() {
    if (cluesImages.getAttribute('clues') === 'true') {
        while (cluesImages.firstChild) {
            cluesImages.removeChild(cluesImages.firstChild);
        }

        cluesImages.setAttribute("clues", false);
        return;
    } else if (clue.getAttribute('readonly') === 'true') {
        alert("Reload to try again");
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
            helper.setAttribute('readonly', false);
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

function changeButton() {
    validator.setAttribute('nextlevel', validator.getAttribute('nextlevel') === 'false');
    validator.value  = validator.value === 'validate' ? 'Go to next level' : 'validate';
}

function changeAhorcadoImg() {
    ahorcado.src = ahorcadoImg[ahorcadoIndex];
    ahorcado.setAttribute('changed', true);
    
    let wait = setInterval(() => {
        ahorcado.setAttribute('changed', false);
        clearInterval(wait);
    }, 1);
}

function getRandomWords() {
    let arrayLength = 5;
    let helper = [];

    for (let i = 0; i < arrayLength; i++) {
        let isEqualNumber = false;
        const ajax = random(0, wordKey.length - 1);

        isEqualNumber = helper.some((number) => number === ajax);

        if (!isEqualNumber) {
            helper.push(ajax);
        } else {
            i--;
        }
    }

    let temp = [];
    temp = helper.map((number) => {
        return wordKey[number];
    });

    return temp;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", startGame);