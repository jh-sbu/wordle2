import VirtualKey from "./VirtualKey";
import Color from "../Enums/Color";
import './VirtualKeyboard.css';

interface VirtualKeyboardProps {
  buttonClick: (keyName: string) => void;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = (props) => {
  const row1 = "QWERTYUIOP".split("");
  const row2 = "ASDFGHJKL".split("");
  const row3 = "ZXCVBNM".split("");

  return (
    <div className="virtual-keyboard">
      <div className="letter-keys">
        <div className="keyboard-row">
          {row1.map((key) => (
            <VirtualKey key={key} keyName={key} color={Color.DarkGray} buttonClick={props.buttonClick} />
          ))}
        </div>
        <div className="keyboard-row">
          {row2.map((key) => (
            <VirtualKey key={key} keyName={key} color={Color.DarkGray} buttonClick={props.buttonClick} />
          ))}
        </div>
        <div className="keyboard-row">
          {row3.map((key) => (
            <VirtualKey key={key} keyName={key} color={Color.DarkGray} buttonClick={props.buttonClick} />
          ))}
        </div>
      </div>
      <div className="action-keys">
        <VirtualKey key="Enter" keyName="Enter" color={Color.DarkGray} buttonClick={props.buttonClick} />
        <VirtualKey key="Back" keyName="Back" color={Color.DarkGray} buttonClick={props.buttonClick} />
      </div>
    </div>
  );
}

export default VirtualKeyboard;
