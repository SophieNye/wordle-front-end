import React from "react";
import KeyboardLetter from "./KeyboardLetter";

function Keyboard({ allLetters }) {

    const topRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
        .map((letter, i) => <KeyboardLetter letter={letter} letterUsed={allLetters[letter]} key={letter + i} />);
    const midRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
        .map((letter, i) => <KeyboardLetter letter={letter} letterUsed={allLetters[letter]} key={letter + i} />);
    const bottomRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
        .map((letter, i) => <KeyboardLetter letter={letter} letterUsed={allLetters[letter]} key={letter + i} />);

    return (
        <div id="keyboard">
            <div className="keyboard-row">
                {topRow}
            </div>
            <div className="keyboard-row">
                {midRow}
            </div>
            <div className="keyboard-row">
                {bottomRow}
            </div>
        </div>
    );
};

export default Keyboard;