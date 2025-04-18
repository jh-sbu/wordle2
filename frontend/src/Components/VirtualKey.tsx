import Color from "../Enums/Color";
import './VirtualKey.css';

interface VirtualKeyProps {
  keyName: string,
  color: Color,
}

const VirtualKey: React.FC<VirtualKeyProps> = (props) => {
  return (
    <div className="virtual-key">
      {props.keyName}
    </div>
  )
}

export default VirtualKey;
