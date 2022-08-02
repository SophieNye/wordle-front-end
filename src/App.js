import React, {
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react';
import './App.css';
import WordRow from './WordRow';
import Keyboard from './Keyboard';
import validLetters from './validLetters';
import { checkWord } from './helpers';

function App() {

  let [word, setWord] = useState('');
  let [correctLetters, setCorrectLetters] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [guessResults, setGuessResults] = useState([]);
  const [guesses, setGuesses] = useState(
    [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]);
  const [guessIndex, setGuessIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [gameWon, setGameWon] = useState(null);
  const [allLetters, setAllLetters] = useState({});

  useEffect(() => {
    fetch('https://random-word-api.herokuapp.com/word?length=5')
      .then((data) => data.json())
      .then((result) => {
        setWord(result[0]);
        console.log(result[0]);
      });
  }, []);

  useEffect(() => {
    setCorrectLetters(word.split(''))
  }, [word])

  useEffect(() => {
    if (currentRow > 5 && !gameWon) {
      setGameWon(false)
    };
  }, [gameWon, currentRow])


  const handler = useCallback(({ key }) => {

    // if user wants to submit word with enter key, check that all spaces are filled
    if (key === "Enter" && guessIndex === 5) {
      const { result, gameWon, lettersUsed } = checkWord(correctLetters, guesses[currentRow]);
      setAllLetters({ ...allLetters, ...lettersUsed });
      setGuessResults([...guessResults, [...result]]);
      setGameWon(gameWon);
      setCurrentRow(currentRow => currentRow + 1);
      setGuessIndex(0);
      setCurrentGuess(currentGuess + 1);
    }

    // remove letter inside of guess as long as it's not the first guess
    if (key === "Backspace" && guessIndex >= 0) {
      const newGuessState = [...guesses];
      newGuessState[currentRow][guessIndex - 1] = '';
      setGuesses(newGuessState);
      setGuessIndex(guessIndex => guessIndex - 1);
    }

    /* 
    check key stroke against valid keys (all letters), 
    check it's not the last index, 
    check it's not the last row and 
    check that the game has not been won.
    */
    if (
      validLetters[key]
      && guessIndex <= 4
      && currentRow <= 5
      && !gameWon
    ) {
      const newGuessState = [...guesses];
      newGuessState[currentRow][guessIndex] = key;
      setGuesses(newGuessState);
      setGuessIndex(guessIndex => guessIndex + 1);
    }
  },
    [
      setCurrentRow,
      guessIndex,
      currentRow,
      guesses,
      correctLetters,
      currentGuess,
      guessResults,
      gameWon,
      allLetters
    ]
  );

  useEventListener('keydown', handler, gameWon);

  const rows = [];
  for (let i = 0; i <= 5; i += 1) {
    rows.push(
      <WordRow
        row={i}
        currentRow={currentRow}
        guessResults={guessResults}
        guesses={guesses}
        guessIndex={guessIndex}
        key={currentRow + i}
      />
    );
  };

  return (
    <div id="gameBoard">
      <header>
        Wordle
      </header>
      {rows}
      {gameWon && "Game Won!"}
      {gameWon === false && `Correct Word: ${word.toUpperCase()}`}
      <Keyboard allLetters={allLetters} />
    </div>
  );
};

const useEventListener = (event, handler) => {
  // save instance of handler so that an eventListener isn't added every time one of the depenencies on handler is updated
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {

      const eventListener = (event) => savedHandler.current(event);
      // Add event listener
      document.addEventListener(event, eventListener);
      // Remove event listener on cleanup
      return () => {
        document.removeEventListener(event, eventListener);
      };
    },
    [event]
  );
}

export default App;
