import { useEffect, useState } from 'react';
import './App.css'
import GuessGrid from './Components/GuessGrid'
import VirtualKeyboard from './Components/VirtualKeyboard'
import Color from './Enums/Color';


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
  // const [currentLine, setCurrentLine] = useState(guesses[0]);
  const [results, setResults] = useState<Color[][]>(Array(maxGuesses).fill(Array(wordLength).fill(Color.Black)));

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


          if (newResult.every((color) => color === Color.Green)) {
            console.error("Not implemented: Handle Winning");
            setCurrentLineNum((_) => maxGuesses);
          } else if (currentLineNum < maxGuesses - 1) {
            setCurrentLineNum((currentLineNum) => currentLineNum + 1);
          } else {
            console.error("Not implemented: Show message on losing");
            setCurrentLineNum((currentLineNum) => currentLineNum + 1);
            giveUp();
          }

          setResults(newResults);
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
          console.error("Not implmented: showing a popup for the correct answer");
          console.log(`Correct answer: ${data['results']}`);
          ;
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  const handleKeyPress = (keyName: string) => {
    if (currentLineNum >= maxGuesses) {
      return;
    }

    const currentLine = guesses[currentLineNum];

    if (keyName === "Enter") {
      if (currentLine === undefined || currentLine === null || currentLine.length !== wordLength) {
        console.error("Not implemented: Show an error message for too short");
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
    } else if (event.key === "Enter") {
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
    <>
      <h1>Wordle 2</h1>
      <GuessGrid currentLine={currentLineNum} guesses={guesses} results={results} />
      <VirtualKeyboard buttonClick={handleKeyPress} />
    </>
  )
}

export default App
