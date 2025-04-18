import VirtualKey from "./VirtualKey";
import Color from "../Enums/Color";
import './VirtualKeyboard.css';

interface VirtualKeyboardProps {

}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = (props) => {
  const row1 = "QWERTYUIOP".split("");
  const row2 = "ASDFGHJKL".split("");
  const row3 = "ZXCVBNM".split("");

  return (
    <div className="virtual-keyboard">
      <div className="keyboard-row">
        {row1.map((key) => (
          <VirtualKey key={key} key={key} color={Color.DarkGray} />
        ))}
      </div>
      <div className="keyboard-row">
        {row2.map((key) => (
          <VirtualKey key={key} key={key} color={Color.DarkGray} />
        ))}
      </div>
      <div className="keyboard-row">
        {row3.map((key) => (
          <VirtualKey key={key} key={key} color={Color.DarkGray} />
        ))}
        <VirtualKey key="Enter" key="Enter" color={Color.DarkGray} />
        <VirtualKey key="Delete" key="Delete" color={Color.DarkGray} />
      </div>
    </div>
  );
}

export default VirtualKeyboard;
