import React from "react"
import GuessRow from "./GuessRow"
import Color from "../Enums/Color";
import "./GuessGrid.css";

// const testGuess = 'hello';

interface GuessGridProps {
  currentLine: number,
  guesses: (string | null)[],
  results: Color[][],
}

const GuessGrid: React.FC<GuessGridProps> = (props) => {

  return (
    <div className="guess-grid">
      {props.guesses.map((_, i) => {
        return <GuessRow key={i} word={props.guesses[i]} colors={props.results[i]} />
      })}
    </div >
  )
}

export default GuessGrid;
