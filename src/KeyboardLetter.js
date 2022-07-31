import React from "react";
import classNames from "classnames";

function KeyboardLetter({ letter, letterUsed }) {

    return (
        <div
            className={classNames('keyboard-letter', letterUsed)}
        >
            {letter}
        </div>
    );
};

export default KeyboardLetter;