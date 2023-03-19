class Relationship {
    constructor(relationship, question) {
        this.word = relationship;
        
        for (let i = 0; i < this.word.length; i++) {
            this.word[i] = this.word[i].toUpperCase();
        }

        this.question = question;
    }

    // Methods
    isItTheSame(string) {
        return string == this.word.join('');
    }

    countMatches(string) {
        let stringArr = string.split('');
        let wordArr = this.word;
        let matches = 0;
        let repeat = false;

        for (const letterWord of wordArr) {
            for (const letter of stringArr) {
                if(letter === letterWord && !repeat) {
                    matches++;
                    repeat = true;
                    break;
                }
            }
            repeat = false;
        }

        return matches;
    }

    // Getters
    getWord() {
        return this.word;
    }

    getQuestion() {
        return this.question;
    }

    getWordArray() {
        return this.word.join(' ').split('');
    }

    getMatches(string) {
        let stringArr = string.split('');
        let wordArr = this.word.join(' ').split('');
        let rightString = "";

        for (const letterWord of wordArr) {
            let isIt = false;

            for (const letter of stringArr) {
                if(letter == letterWord) {
                    rightString += letter;
                    isIt = true;
                    break;
                }
            }

            if(!isIt) {
                rightString += ' ';
            }
        }

        return rightString;
    }
}