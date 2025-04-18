import Color from "../Enums/Color";
import './GuessLetter.css';

interface GuessLetterProps {
  letter: string | null;
  color: Color;
}

const GuessLetter = (props: GuessLetterProps) => {
  return (
    <div className={`guess-letter flex items-center justify-center font-bold text-white uppercase ${Color.Black}`}>
      {props.letter}
    </div>
  )
}

export default GuessLetter;
