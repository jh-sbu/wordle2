import Color from "../Enums/Color";
import './VirtualKey.css';

interface VirtualKeyProps {
  key: string,
  color: Color,
}

const VirtualKey: React.FC<VirtualKeyProps> = (props) => {
  return (
    <div className="virtual-key">
      {props.key}
    </div>
  )
}

export default VirtualKey;
