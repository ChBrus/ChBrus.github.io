let wordDictionary, gameIndex = 0;

function startGame() {
    wordDictionary = getRandomWords();
    setInputs();
}

function setInputs() {
    const words = wordDictionary[gameIndex].name.split(' ');
    let wordsInputs = [];
    let temp = [];

    words.forEach((word, index) => {
        word.split('').forEach(() => {
            let helper = document.createElement("input");
            helper.type = 'text';
            helper.oninput = inputFunction;
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