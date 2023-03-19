const words = [
    new Relationship(['fine'], '¿Hi, how are you?'),
    new Relationship(['romantic'], 'A'),
    new Relationship(['family'], 'E'),
    new Relationship(['friendship'], 'I'),
    new Relationship(['business'], 'O'),
    new Relationship(['long', 'distance'], 'U')
];

const crossword = document.querySelector('.crossword'),
    question = document.querySelector('.question'), 
    answer = document.querySelector('.right .answer'),
    button = document.querySelector('.right button'),
    randomWords = random(1, words.length - 1);
var letters = null;
var i = 0;

const letterCode = {
    ENTER: 13,
    BACKSPACE: 8,
    TAB: 9
};

window.addEventListener('load', setInputs(i));

function validateWord() {
    if(words[randomWords[i]].isItTheSame(getInpusText())) {
        changeInputBackground(words[randomWords[i]].getMatches(getInpusText()));
        button.onclick = "next()";
        button.value = "Next";
    } else if(getInpusText() === null) {
        alert('Please, put something on the lines');
    } else {
        changeInputBackground(words[randomWords[i]].getMatches(getInpusText()));
    }
}

function next() {
    i++;
    setInputs(i);
}

function setInputs(index) {
    question.innerHTML = words[randomWords[index]].getQuestion();
    answer.innerHTML = '';

    for (const letter of words[randomWords[index]].getWordArray()) {

        if(letter != ' ') {
            answer.innerHTML += '<input type="text" onkeydown="onClickDown(event, this)" oninput="onInput(this)">';
        } else {
            // answer.innerHTML += '<div class="enter"></div>';
            answer.innerHTML += '<input type="text" value=" " readonly>';
        }
    }

    letters = document.querySelectorAll('.answer input[type="text"]');
}

function onClickDown(e, tag) {
    let index = 0;
    
    letters.forEach((element, i) => {
        if(element === tag) {
            index = i;
        }
    });

    if(e.keyCode === letterCode.ENTER && e.keyCode !== letterCode.BACKSPACE) {
        const nextIndex = (index + 1) % letters.length;
        const nextInput = letters[nextIndex];
        nextInput.focus();

        if(index === letters.length - 1) {
            nextInput.blur();
        }
    } else if(tag.value.length > 0 && e.keyCode !== letterCode.TAB) {
        tag.value = tag.value.slice(0, 0);
    } else if(e.keyCode === letterCode.BACKSPACE && index > 0) {
        const lastIndex = (index - 1) % letters.length;
        const lastInput = letters[lastIndex];
        lastInput.focus();
    }
}

function onInput(tag) {
    tag.value = tag.value.toUpperCase();
}

function getInpusText() {
    if(letters === null) {
        return null;
    }

    let string = "";

    for (const element of letters) {
        string += element.value;
        
    }

    return string;
}

function changeInputBackground(string) {
    let stringArr = string.split('');
    
    letters.forEach((tag, i) => {
        if(tag.value == stringArr[i]) {
            tag.style.background = 'lightgreen';
        } else {
            tag.style.background = 'lightsalmon'; 
        }
    });
}

function random(min, max) {
    let randoms = [];
    let temp = 0;

    for(let i = 0; i < 5; i++) {
        temp = Math.floor(Math.random() * (max - min + 1) + min);
        let good = 0;

        randoms.forEach((value) => {
            if(value != temp) {
                good++;
            }
        });

        if(good == randoms.length) {
            randoms.push(temp);

        } else if(i == 0) {
            randoms.push(Math.floor(Math.random() * (max - min + 1) + min));
        } else {
            i--;
        }
    }

    return randoms;
}