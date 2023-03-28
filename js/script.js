const words = [
    new Word(['fine'], '¿Hi, how are you?'),
    new Word(['romantic'], 'You are in love whit a person'),
    new Word(['family'], 'You are related to this person by blood or marriage'),
    new Word(['friendship'], 'You enjoy spending time with this person'),
    new Word(['professional'], 'you work together or have a business word'),
    new Word(['long', 'distance'], 'You hardly ever see this person because he/she is so far'),
    new Word(['acquaintance'], 'You don\'t have any shared experiences or connections with this person'),
    new Word(['toxic'], 'it\'s one that makes you feel unsupported, misunderstood, demeaned, or attacked')
];

const clock = document.querySelector('.clock'),
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

let segundos = 0;
let reloj = setInterval(() => {
    segundos++;
    let s = 360 - segundos;
    let segundo = s%60;
    let m = parseInt(s / 60);
    clock.innerHTML = m + ":" + segundo;
    
    if(s <= 0) {
        clearInterval(reloj);
    }
}, 1000);

function validateWord() {
    console.log(words[randomWords[i]].id);
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
    lp -= (words[randomWords[i]].getWord().length - words[randomWords[i]].countMatches(getInpusText()));
    lifePoints.innerHTML = (lp > 0 ? lp : 0);
    switch(lp > 0 ? lp : 0) {
        case 0:
            segundos += 20;
        break;
        case 1:
            segundos += 10;
        break;
        case 2:
            segundos += 5;
        break;
    }
    
    if(words[randomWords[i]].isItTheSame(getInpusText()) && words[randomWords[i]].isWasMatch(getInpusText()) && i < 4) {
        isClicked = true;
        let delay = setInterval(() => {
            button.onclick = next;
            button.innerHTML = "Next";
            isClicked = false;
            clearInterval(delay);
        }, 100);
    } else if(lp <= 0) {
        alert('Sorry, you don\'t have any attempts :c');
        let delay = setInterval(() => {
            button.onclick = next;
            button.innerHTML = "Next";
            isClicked = false;
            clearInterval(delay);
        }, 100);
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