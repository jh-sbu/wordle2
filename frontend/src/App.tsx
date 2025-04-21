import { useEffect, useRef, useState } from 'react';
import './App.css'
import GuessGrid from './Components/GuessGrid'
import VirtualKeyboard from './Components/VirtualKeyboard'
import Color from './Enums/Color';
import GameOverPopover from './Components/GameOverPopover';
import ErrorPopover from './Components/ErrorPopover';


const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5000"

function App() {
  // May want to add a "move to longer word" feature after a correct guess
  // so leave this as state for now
  const [wordLength, _setWordLength] = useState<number>(5);
  // Max guesses may vary by word length so again, for future proofing,
  // make this state
  const [maxGuesses, _setMaxGuesses] = useState<number>(6);

  const [currentLineNum, setCurrentLineNum] = useState<number>(0);
  const [guesses, setGuesses] = useState<(string | null)[]>(Array(maxGuesses).fill(null));
  const [results, setResults] = useState<Color[][]>(Array(maxGuesses).fill(Array(wordLength).fill(Color.Black)));

  // For the error message popup
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTitle, setErrorTitle] = useState("");

  // For the popup at the end of the game
  const [showPopup, setShowPopup] = useState(false);
  const [won, setWon] = useState(false);
  const [tries, setTries] = useState(0);
  const [correctWord, setCorrectWord] = useState<string | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  /**
   *
   * Send the guess off to the server
   *
   * @param {string} guess - The user's guess
   */
  const sendGuess = (guess: string) => {
    if (currentLineNum >= maxGuesses) {
      return;
    }
    fetch(`${baseUrl}/api/guess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guess: guess
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data['results']) {
          const newResults = [...results];

          const newResult: Color[] = data['results'].map((s: string) => {
            if (s === 'r') {
              return Color.DarkGray;
            } else if (s === 'p') {
              return Color.Yellow;
            } else {
              return Color.Green;
            }
          })

          newResults[currentLineNum] = newResult;

          // You won!
          if (newResult.every((color) => color === Color.Green)) {
            const totalTries = currentLineNum + 1;
            setTries(totalTries);
            setWon(true);
            setShowPopup(true);
            setCurrentLineNum((_) => maxGuesses);
          } else if (currentLineNum < maxGuesses - 1) {
            setCurrentLineNum((currentLineNum) => currentLineNum + 1);
          } else {
            setCurrentLineNum((currentLineNum) => currentLineNum + 1);
            giveUp();
          }

          setResults(newResults);
        } else if (data['badWord']) {
          setErrorMessage(`Word ${guess} not found in dictionary.`);
          setErrorTitle("Not Found");
          setShowError(true);
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  /**
   * Give up and get the answer
   */
  const giveUp = () => {
    console.log("Here");
    fetch(`${baseUrl}/api/answer`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data['results']) {
          // console.error("Not implmented: showing a popup for the correct answer");
          console.log(`Correct answer: ${data['results']}`);
          setCorrectWord(data['results']);
          setWon(false);
          setShowPopup(true);
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  const handleKeyPress = (keyName: string) => {
    if (((showError || showPopup) && keyName === "Enter") || keyName === "Escape") {
      setShowPopup(false);
      setShowError(false);
      return;
    }
    if (currentLineNum >= maxGuesses) {
      return;
    }

    const currentLine = guesses[currentLineNum];

    if (keyName === "Enter") {
      if (currentLine === undefined || currentLine === null || currentLine.length !== wordLength) {
        // console.error("Not implemented: Show an error message for too short");
        setErrorMessage("Fill in all the letters!");
        setErrorTitle("Too Short");
        setShowError(true);
        return;
      }

      sendGuess(currentLine);
      // console.error("Not Implemented: Enter Key");
    } else if (keyName === "Back") {
      if (currentLine !== null) {
        const newLine = currentLine.slice(0, -1);
        const newGuesses = [...guesses];
        newGuesses[currentLineNum] = newLine;
        setGuesses(newGuesses);
      }
    } else {
      if (currentLine !== undefined && currentLine !== null) {
        if (currentLine.length >= wordLength) {
          return;
        }
        const newLine = currentLine + keyName;

        const newGuesses = [...guesses];
        newGuesses[currentLineNum] = newLine;
        setGuesses(newGuesses);
      } else {
        const newGuesses = [...guesses];
        newGuesses[currentLineNum] = keyName;
        setGuesses(newGuesses);
      }
    }
  }

  const handleKeyDown = ((event: KeyboardEvent) => {
    // console.log(`Keyboard key pressed: ${event.key}`);

    if (event.key === "Backspace") {
      handleKeyPress("Back");
    } else if (event.key === "Enter" || event.key === "Escape") {
      handleKeyPress(event.key);
    } else {
      const upper = event.key.toUpperCase();

      if (/^[A-Z]$/.test(upper)) {
        handleKeyPress(upper);
      }
    }
  });

  // Activate keyboard shortcuts
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]);

  // Activate the selected row
  useEffect(() => {
    const newActiveRow = Array(wordLength).fill(Color.Gray);

    const newColors = [...results];

    newColors[currentLineNum] = newActiveRow;

    setResults(newColors);
  }, [currentLineNum]);

  return (
    <div>
      <div ref={targetRef}>
        <h1>Wordle 2</h1>
      </div>
      <GuessGrid currentLine={currentLineNum} guesses={guesses} results={results} />
      <VirtualKeyboard buttonClick={handleKeyPress} />


      <ErrorPopover
        show={showError}
        title={errorTitle}
        message={errorMessage}
        target={targetRef}
        closePopup={() => setShowError(false)}
      />

      <GameOverPopover
        show={showPopup}
        target={targetRef}
        won={won}
        tries={tries}
        correct={correctWord}
        closePopup={() => setShowPopup(false)}
      />
    </div>
  )
}

export default App
