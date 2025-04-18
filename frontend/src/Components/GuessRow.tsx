import Color from "../Enums/Color";
import GuessLetter from "./GuessLetter";
import './GuessRow.css';

interface GuessRowProps {
  word: string | null;
  colors: Color[];
}

const GuessRow = (props: GuessRowProps) => {
  return (
    <div className="guess-row">
      {props.colors.map((color, i) => {
        return (
          <GuessLetter key={i} letter={props.word ? props.word[i] : null} color={color} />
        )
      })}
    </div>
  )
}

export default GuessRow;
