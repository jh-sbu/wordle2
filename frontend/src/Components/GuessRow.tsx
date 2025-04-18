import Color from "../Enums/Color";
import GuessLetter from "./GuessLetter";

interface GuessRowProps {
  word: string | null;
  colors: Color[];
}

const GuessRow = (props: GuessRowProps) => {
  return (
    <div>
      {props.colors.map((color, i) => {
        return (
          <GuessLetter letter={props.word ? props.word[i] : null} color={color} />
        )
      })}
    </div>
  )
}

export default GuessRow;
