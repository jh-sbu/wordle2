import React from "react";
import Color from "../Enums/Color";
import './GuessLetter.css';

interface GuessLetterProps {
  letter: string | null;
  color: Color;
}

const GuessLetter: React.FC<GuessLetterProps> = (props) => {
  return (
    <div className={`guess-letter ${props.color}`}>
      {props.letter}
    </div>
  )
}

export default GuessLetter;
