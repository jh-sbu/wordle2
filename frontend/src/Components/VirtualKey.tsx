import Color from "../Enums/Color";
import './VirtualKey.css';

interface VirtualKeyProps {
  keyName: string;
  color: Color;
}

const VirtualKey: React.FC<VirtualKeyProps> = (props) => {
  const isActionKey = props.keyName === "Enter" || props.keyName === "Back";
  return (
    <div className={`virtual-key ${isActionKey ? "action-key" : ""}`}>
      {props.keyName}
    </div>
  );
};

export default VirtualKey;
