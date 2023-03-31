class Word {
    static ultimoId = 0;

    constructor(wordToUse, question) {
        this.word = wordToUse;
        
        for (let i = 0; i < this.word.length; i++) {
            this.word[i] = this.word[i].toUpperCase();
        }

        this.question = question;
        Word.ultimoId++;
        this.id = Word.ultimoId;
    }

    // Methods
    isItTheSame(string) {
        return string == this.getWord();
    }

    countMatches(string) {
        let stringArr = string.split('');
        let matches = 0, i = 0;

        for (const letterWord of this.getWordArray()) {
            if(letterWord === stringArr[i]) {
                matches++;
            }
            i++;
        }

        return matches;
    }

    isWasMatch(string) {
        let matches = this.countMatches(string);
        return this.getWord().length === matches;
    }

    // Getters
    getWord(isJoin) {
        return isJoin ? this.word.join(' ') : this.word.join('');
    }

    getQuestion() {
        return this.question;
    }

    getWordArray() {
        return this.word.join(' ').split('');
    }

    getMatches(string) {
        let stringArr = string.split('');
        let wordArr = this.getMatch();
        let rightString = "";

        for(let i = 0; i < wordArr.length; i++) {
            if(stringArr[i] == wordArr[i]) {
                rightString += wordArr[i];
            } else {
                rightString += ' ';
            }
        }

        return rightString;
    }

    getMatch() {
        return this.word.join('').split('');;
    }
}