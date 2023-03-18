class Word {
    constructor(wordToUse) {
        this.word = wordToUse.toUpperCase();
    }

    // Methods
    isItTheSame(string) {
        return string == this.word;
    }

    countMatches(string) {
        let stringArr = string.split('');
        let wordArr = this.word.split('');
        let matches = 0;

        for (const letter of stringArr) {
            for (const letterWord of wordArr) {
                if(letter == letterWord) {
                    matches++;
                }
            }
        }

        return matches;
    }

    // Getters
    getWord() {
        return this.word;
    }
}