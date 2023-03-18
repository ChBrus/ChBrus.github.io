const crossword = document.querySelector('.crossword'),
    question = document.querySelector('.question');
var letters = null;

const letterCode = {
    ENTER: 13,
    BACKSPACE: 8,
    TAB: 9
};

const words = [
    new Word('fine')
];

function validateWord() {
    if(words[0].isItTheSame(getInpusText())) {
        alert('OMG!!! :OO');
    } else {
        alert('You match: ' + words[0].countMatches(getInpusText()) + ' letters');
    }
}

function onClickDown(e, tag) {
    let index = 0;
    letters = document.querySelectorAll('.answer input[type="text"]');
    
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
            // document.querySelector('.right button').focus();
            // document.querySelector('.right button').blur();
            nextInput.blur();
        }
    } else if(tag.value.length > 0 && e.keyCode !== letterCode.TAB) {
        tag.value = tag.value.slice(0, 0);
    }
}

function onInput(tag) {
    tag.value = tag.value.toUpperCase();
}

function getInpusText() {
    if(letters === null) {
        alert('Please, put something on the lines');
        return;
    }

    let string = "";

    for (const element of letters) {
        string += element.value;
        
    }

    return string;
}