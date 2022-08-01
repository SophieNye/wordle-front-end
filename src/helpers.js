export const checkWord = (letters, guessedWord, allLetters) => {

    let gameWon = true;
    const lettersUsed = { ...allLetters };

    const letterFrequency = letters.reduce((acc, letter) => {
        if (acc[letter]) acc[letter] += 1;
        else acc[letter] = 1;
        return acc;
    }, {});

    const firstPass = guessedWord.map((character, i) => {
        if (letters[i] === character) {
            letterFrequency[character] -= 1;
            lettersUsed[character] = 'correct-letter';
            return 'correct-letter';
        } else {
            gameWon = null;
        }
    })

    const result = guessedWord.map((character, i) => {
        if (firstPass[i] === 'correct-letter') return firstPass[i]
        else if (letterFrequency[character]) {
            letterFrequency[character] -= 1;
            gameWon = null;
            lettersUsed[character] = 'wrong-spot';
            return 'wrong-spot';
        } else {
            if (!lettersUsed[character]) lettersUsed[character] = 'not-found';
            gameWon = null;
            return 'not-found';
        }

    })

    return { result, gameWon, lettersUsed }

}