import React from "react";
import { Overlay, Popover } from "react-bootstrap";

interface GameOverPopoverProps {
  show: boolean;
  target: React.RefObject<HTMLElement | null>;
  won: boolean;
  tries: number;
  correct: string;
  closePopup: () => void;
}

const GameOverPopover: React.FC<GameOverPopoverProps> = (props) => {
  return (
    <Overlay
      show={props.show}
      target={props.target.current}
      placement="top"
      containerPadding={20}
    >
      <Popover id="game-result-popover">
        <Popover.Header as="h3">{props.won ? 'You got it!' : 'Better luck tomorrow!'}</Popover.Header>
        <Popover.Body>
          {props.won
            ? `You guessed the word in ${props.tries} guesses!`
            : `The correct word was: ${props.correct}`
          }
          <div className="close-button-container">
            <button className="close-button" onClick={props.closePopup}>
              Close
            </button>
          </div>
        </Popover.Body>
      </Popover>
    </Overlay>
  )
};

export default GameOverPopover;
