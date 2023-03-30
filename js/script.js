const words = [
    new Word(['fine'], '¿Hi, how are you?'),
    new Word(['romantic'], 'You are in love whit a person'),
    new Word(['family'], 'You are related to this person by blood or marriage'),
    new Word(['friendship'], 'You enjoy spending time with this person'),
    new Word(['business', 'relationship'], 'you work together in the same company'),
    new Word(['long', 'distance'], 'You hardly ever see this person because he/she is so far'),
    new Word(['acquaintance'], 'You don\'t have any shared experiences or connections with this person'),
    new Word(['toxic'], 'it\'s one that makes you feel unsupported, misunderstood, demeaned, or attacked'),
    new Word(['wish'], 'What\'s the verb that means, \"Dreams\"?'),
    new Word(['would'], 'What verb do you need to say imaginary situations?'),
    new Word(['break', 'up'], 'when a relationship finished, you say that they...'),
    new Word(['who', 'that', 'which'], 'You use these verbs in relative clauses')
];

const clock = document.querySelector('.clock'),
    question = document.querySelector('.header .question'),
    lifePoints = document.querySelector('.header .lp'), 
    answer = document.querySelector('.right .answer'),
    trueAnswer = document.querySelector('.right .trueAnswer'),
    images = document.querySelectorAll('.left .imgContainer .image'),
    button = document.querySelector('.right .submit'),
    randomWords = random(1, words.length - 1, 6);
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
    clock.innerHTML = m + ":" + (segundo < 10 ? "0" + segundo : segundo);
    
    if(s <= 0) {
        alert("The time is over!!");
        disabledInputs();
        clearInterval(reloj);
    }
}, 1000);

function validateWord() {
    if(getInpusText() === null) {
        alert('Please, put something on the lines');
        return;
    } else if(i == 6) {
        return;
    } else if(isClicked) {
        return;
    }

    let lp = parseInt(lifePoints.innerHTML);
    changeInputBackground(words[randomWords[i]].getMatches(getInpusText()));
    lp -= (words[randomWords[i]].getMatches(getInpusText()) != words[randomWords[i]].getWord() ? 1 : 0);
    lifePoints.innerHTML = (lp > 0 ? lp : 0);
    switch(lp > 0 ? lp : 0) {
        case 0:
            segundos += 30;
        break;
        case 1:
            segundos += 10;
        break;
        case 2:
            segundos += 5;
        break;
    }
    
    if(words[randomWords[i]].getMatches(getInpusText()) == words[randomWords[i]].getWord() && i <= 5) {
        if(i == 5 && segundos > 0) {
            alert('Congratulations, you win!!! :DD');
            disabledInputs();
            clearInterval(reloj);
            isClicked = false;
            return;
        }
        
        isClicked = true;
        let delay = setInterval(() => {
            button.onclick = next;
            button.innerHTML = "Next";
            clearInterval(delay);
            isClicked = false;
        }, 100);
    } else if(lp <= 0) {
        alert('Sorry, you don\'t have any attempts :c');
        putTrueAnswer();
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
    setInputs();
    lifePoints.innerHTML = 3;
    button.onclick = validateWord;
    button.innerHTML = "Validate";
    trueAnswer.innerHTML = "";
    trueAnswer.style.display = "none";
    answer.style.display = "grid";
    letters[0].focus();
}

function disabledInputs() {
    lifePoints.value = 0;
    lifePoints.parentNode.style.background = "#2C3333";
    lifePoints.parentNode.style.color = "#CBE4DE";
    
    answer.querySelectorAll('input').forEach((tag) => {
        if(tag.value !== "\ ") {
            tag.style.borderBottomColor = "#CBE4DE";
            tag.style.background = "#2C3333";
            tag.disabled = true;
        }
    });

    button.style.background = "#2E4F4F";
    button.style.color = "#CBE4DE";
    button.disabled = true;

    button.addEventListener('focus', () => {
        button.blur();
    });
}

function putTrueAnswer() {
    trueAnswer.innerHTML = "<span class=\"title\">The answer is:</span> <span class=\"tA\">" + words[randomWords[i]].getWord() + "</span>";
    trueAnswer.style.display = "block";
    answer.style.display = "none";
}

function setInputs() {
    question.innerHTML = words[randomWords[i]].getQuestion();
    answer.innerHTML = '';
    
    for(let j = 0; j < words[randomWords[i]].word.length; j++) {
        answer.innerHTML += "<div class=\"word\"></div>";
        for (const letter of words[randomWords[i]].word[j].split('')) {
            answer.querySelectorAll('.word')[j].innerHTML += '<input type="text" onkeydown="onClickDown(event, this)" oninput="onInput(this)">';
        }
    }

    letters = document.querySelectorAll('.answer .word input[type="text"]');

    images.forEach((tag, index) => {
        tag.src = "img/" + randomWords[i] + "-" + (index + 1) + "img.png";
    });
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
    let stringArr = words[randomWords[i]].getMatch();
    
    letters.forEach((tag, i) => {
        if(tag.value == stringArr[i]) {
            tag.style.background = 'lightgreen';
        } else if(tag.value != ' ') {
            tag.style.background = 'lightsalmon'; 
        }
    });
}

function random(min, max, howMany) {
    let randoms = [];
    let temp = 0;

    for(let j = 0; j < howMany; j++) {
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