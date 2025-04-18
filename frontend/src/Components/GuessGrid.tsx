import { useState } from "react"
import GuessRow from "./GuessRow"
import Color from "../Enums/Color";

const testGuess = 'hello';

const GuessGrid = () => {
  // const [guesses, setGuesses] = useState<(string | null)[]>([null, null, null, null, null, null]);
  const [guesses, setGuesses] = useState<(string | null)[]>([testGuess, testGuess, testGuess, testGuess, testGuess, testGuess]);
  const [results, setResults] = useState<Color[][]>(Array.from({ length: 6 }, () => Array(5).fill(Color.Gray)));

  return (
    <div className="guess-grid">
      {[0, 1, 2, 3, 4, 5].map((i) => {
        return <GuessRow word={guesses[i]} colors={results[i]} />
      })}
    </div >
  )
}

export default GuessGrid;
