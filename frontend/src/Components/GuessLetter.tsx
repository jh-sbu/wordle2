import Color from "../Enums/Color";

interface GuessLetterProps {
  letter: string | null;
  color: Color;
}

const GuessLetter = (props: GuessLetterProps) => {
  const backgroundColor = () => {
    switch (props.color) {
      case Color.Green:
        return "bg-green-500";
      case Color.Yellow:
        return "bg-yellow-500";
      case Color.DarkGray:
        return "bg-zinc-700";
      default:
        return "bg-zinc-500";
    }
  }

  return (
    <div className={`flex items-center justify-center w-12 h-12 border-2 border-zinc-800 font-bold text-white uppercase ${backgroundColor()}`}>
      {props.letter}
    </div>
  )
}

export default GuessLetter;
