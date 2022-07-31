import React from "react";
import classNames from "classnames";

function Letter({
    guessResults,
    guesses,
    isCurrentRow,
    letterPosition,
    row,
}) {

    return (
        <div
            maxLength="1"
            className={
                classNames(
                    'letter-box',
                    guessResults?.[row]?.[letterPosition],
                    isCurrentRow && 'letter-box-transform'
                )
            }
        >
            {guesses[row][letterPosition]}
        </div>
    );
};

export default Letter;