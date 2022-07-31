import React from "react";
import Letter from "./Letter";

function WordRow({
    currentRow,
    guessResults,
    guesses,
    row
}) {

    const letters = [];

    for (let i = 0; i <= 4; i += 1) {
        letters.push(
            <Letter
                guessResults={guessResults}
                guesses={guesses}
                row={row}
                letterPosition={i}
                key={i}
                isCurrentRow={currentRow-1 === row}
            />
        );
    };

    return (
        <div className="word-row">
            {letters}
        </div>
    );

};



export default WordRow;