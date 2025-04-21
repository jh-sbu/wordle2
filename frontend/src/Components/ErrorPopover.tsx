import React from "react";
import { Overlay, Popover } from "react-bootstrap";
import './ErrorPopover.css'; // Import the CSS file

interface ErrorPopoverProps {
  show: boolean;
  message: string;
  title: string;
  target: React.RefObject<HTMLElement | null>; // Add target prop
  closePopup: () => void;
}

const ErrorPopover: React.FC<ErrorPopoverProps> = (props) => {
  return (
    <div>
      <Overlay
        show={props.show}
        target={props.target.current} // Use the target prop
        placement="bottom" // Or another suitable placement
        containerPadding={20}
      >
        <Popover id="error-popover"> {/* Use a unique ID */}
          <Popover.Header as="h3">{props.title}</Popover.Header>
          <Popover.Body>
            {props.message}
            <div className="close-button-container">
              <button className="close-button" onClick={props.closePopup}>
                Close
              </button>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  )
};

export default ErrorPopover;
