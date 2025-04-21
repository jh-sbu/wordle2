import React from "react";
import Color from "../Enums/Color";
import './VirtualKey.css';

interface VirtualKeyProps {
  keyName: string;
  color: Color;
  buttonClick: (keyName: string) => void;
}

const VirtualKey: React.FC<VirtualKeyProps> = (props) => {
  const handleKeyPress = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    props.buttonClick(props.keyName);
  }

  const isActionKey = props.keyName === "Enter" || props.keyName === "Back";
  return (
    <button className={`virtual-key ${isActionKey ? "action-key" : ""}`} onClick={handleKeyPress}>
      {props.keyName}
    </button>
  );
};

export default VirtualKey;
