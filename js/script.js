const words = [
    new Relationship(['fine'], '¿Hi, how are you?'),
    new Relationship(['romantic'], 'You are in love whit a person'),
    new Relationship(['family'], 'You are related to this person by blood or marriage'),
    new Relationship(['friendship'], 'You enjoy spending time with this person'),
    new Relationship(['professional'], 'you work together or have a business relationship'),
    new Relationship(['long', 'distance'], 'You hardly ever see this person because he/she is so far'),
    new Relationship(['acquaintance'], 'You don\'t have any shared experiences or connections with this person'),
    new Relationship(['toxic relationship'], 'it\'s one that makes you feel unsupported, misunderstood, demeaned, or attacked')
];

const crossword = document.querySelector('.crossword'),
    question = document.querySelector('.header .question'),
    lifePoints = document.querySelector('.header .lp'), 
    answer = document.querySelector('.right .answer'),
    button = document.querySelector('.right .submit'),
    randomWords = random(1, words.length - 1);
var letters = null, i = 0, isClicked = false;

const letterCode = {
    ENTER: 13,
    BACKSPACE: 8,
    TAB: 9
};

window.addEventListener('load', setInputs(i));

function validateWord() {
    if(getInpusText() === null) {
        alert('Please, put something on the lines');
        return;
    } else if(i >= 5) {
        return;
    } else if(isClicked) {
        return;
    }

    let lp = parseInt(lifePoints.innerHTML);
    changeInputBackground(words[randomWords[i]].getMatches(getInpusText()));
    
    if(words[randomWords[i]].isItTheSame(getInpusText()) && words[randomWords[i]].isWasMatch(getInpusText()) && i < 4) {
        isClicked = true;
        let delay = setInterval(() => {
            button.onclick = next;
            button.innerHTML = "Next";
            isClicked = false;
            clearInterval(delay);
        }, 1000);
    } else if(lp == 0 && i < 4) {
        alert('Sorry, you don\'t have any attempts :c');
        next();
    } else if(i < 4) {
        lp -= (words[randomWords[i]].getWord().length - words[randomWords[i]].countMatches(getInpusText()));
        lifePoints.innerHTML = (lp > 0 ? lp : 0);
    } else {
        i++
    }
}

function next() {
    i++;
    setInputs(i);
    lifePoints.innerHTML = 3;
    button.onclick = validateWord;
    button.innerHTML = "Validate";
    letters[0].focus();
}

function setInputs(index) {
    question.innerHTML = words[randomWords[index]].getQuestion();
    answer.innerHTML = '';

    for (const letter of words[randomWords[index]].getWordArray()) {

        if(letter != ' ') {
            answer.innerHTML += '<input type="text" onkeydown="onClickDown(event, this)" oninput="onInput(this)">';
        } else {
            // answer.innerHTML += '<div class="enter"></div>';
            answer.innerHTML += '<input type="text" value=" " readonly tabindex="-1">';
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

    const nextIndex = (index + 1) % letters.length;
    const nextInput = letters[nextIndex];
    const lastIndex = (index - 1) % letters.length;
    const lastInput = letters[lastIndex];

    if(e.keyCode === letterCode.ENTER && e.keyCode !== letterCode.BACKSPACE) {
        if(index === letters.length - 1) {
            nextInput.blur();
        } else if(nextInput.value != ' ') {
            nextInput.focus();
        } else {
            letters[nextIndex + 1].focus();
        }
    } else if(tag.value.length > 0 && e.keyCode !== letterCode.TAB) {
        tag.value = tag.value.slice(0, 0);
    } else if(e.keyCode === letterCode.BACKSPACE && index > 0) {
        if(index === 0) {
            lastInput.blur();
        } else if(lastInput.value != ' ') {
            lastInput.focus();
        } else {
            letters[lastIndex - 1].focus();
        }
    }
}

function onInput(tag) {
    tag.value = tag.value.toUpperCase();

    let index = 0;
    
    letters.forEach((element, i) => {
        if(element === tag) {
            index = i;
        }
    });

    const nextIndex = (index + 1) % letters.length;
    const nextInput = letters[nextIndex];

    if(tag.value.match(/[a-z]/i)) {
        if(index === letters.length - 1) {
            nextInput.blur();
        } else if(nextInput.value != ' ') {
            nextInput.focus();
        } else {
            letters[nextIndex + 1].focus();
        }
    }
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
        if(tag.value == stringArr[i] && tag.value != ' ') {
            tag.style.background = 'lightgreen';
        } else if(tag.value != ' ') {
            tag.style.background = 'lightsalmon'; 
        }
    });
}

function random(min, max) {
    let randoms = [];
    let temp = 0;

    for(let j = 0; j < 5; j++) {
        temp = Math.floor(Math.random() * (max - min + 1) + min);
        let good = 0;

        randoms.forEach((value) => {
            if(value != temp) {
                good++;
            }
        });

        if(good == randoms.length) {
            randoms.push(temp);

        } else if(j == 0) {
            randoms.push(Math.floor(Math.random() * (max - min + 1) + min));
        } else {
            j--;
        }
    }

    return randoms;
}