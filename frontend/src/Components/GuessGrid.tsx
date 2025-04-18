import { useState } from "react"
import GuessRow from "./GuessRow"
import Color from "../Enums/Color";

const GuessGrid = () => {
  const [guesses, setGuesses] = useState<(string | null)[]>([null, null, null, null, null, null]);
  const [results, setResults] = useState<Color[][]>(Array.from({ length: 6 }, () => Array(5).fill(Color.Gray)));

  return (
    <div>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        return <GuessRow word={guesses[i]} colors={results[i]} />
      })}
    </div >
  )
}
