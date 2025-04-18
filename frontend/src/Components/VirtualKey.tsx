import Color from "../Enums/Color";
import './VirtualKey.css';

interface VirtualKeyProps {
  keyName: string;
  color: Color;
}

const VirtualKey: React.FC<VirtualKeyProps> = (props) => {
  const isActionKey = props.keyName === "Enter" || props.keyName === "Back";
  return (
    <button className={`virtual-key ${isActionKey ? "action-key" : ""}`}>
      {props.keyName}
    </button>
  );
};

export default VirtualKey;
