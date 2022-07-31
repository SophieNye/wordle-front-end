import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useReducer
} from 'react';
import './App.css';
import WordRow from './WordRow';
import Keyboard from './Keyboard';
import validLetters from './validLetters';
import { checkWord, setGuesses } from './helpers';

function App() {

  let word = useRef('');
  let correctLetters = useRef(null);
  const [currentRow, setCurrentRow] = useState(0);
  const [guessResults, setGuessResults] = useState([]);
  const [guesses, dispatch] = useReducer(setGuesses,
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
        word.current = result[0];
        console.log(word.current);
        correctLetters.current = word.current.split('');
      });
  }, []);


  const handler = useCallback(({ key }) => {
    if (key === "Enter" && guessIndex === 5) {
      const { result, gameWon, lettersUsed } = checkWord(correctLetters.current, guesses[currentRow]);
      setAllLetters({ ...allLetters, ...lettersUsed });
      setGuessResults([...guessResults, [...result]]);
      setGameWon(gameWon);
      setCurrentRow(currentRow + 1);
      if (currentRow === 5 && !gameWon) {
        setGameWon(false)
      };
      setGuessIndex(0);
      setCurrentGuess(currentGuess + 1);
    }

    if (key === "Backspace" && guessIndex >= 0) {
      dispatch({ type: 'deleteGuess', payload: { key, guessIndex, setGuessIndex, currentRow } });
    }

    if (
      validLetters[key]
      && guessIndex <= 4
      && currentRow <= 5
      && !gameWon
    ) {
      dispatch({ type: 'addGuess', payload: { key, guessIndex, setGuessIndex, currentRow } });
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
      {gameWon === false && "Game Lost"}
      <Keyboard allLetters={allLetters} />
    </div>
  );
};

const useEventListener = (event, handler) => {
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
    [event] // Re-run if eventName or element changes
  );
}

export default App;
