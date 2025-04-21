import React from "react";
import { Overlay, Popover } from "react-bootstrap";
import './GameOverPopover.css';

interface GameOverPopoverProps {
  show: boolean;
  target: React.RefObject<HTMLElement | null>;
  won: boolean;
  tries: number;
  correct: string | null;
  closePopup: () => void;
}

const GameOverPopover: React.FC<GameOverPopoverProps> = (props) => {

  return (
    <div>
      <Overlay
        show={props.show}
        target={props.target.current}
        placement="bottom"
        containerPadding={20}
      >
        <Popover id="game-result-popover">
          <Popover.Header as="h3">{props.won ? 'You got it!' : 'Better luck tomorrow!'}</Popover.Header>
          <Popover.Body>
            {props.won ? `You guessed the word in ${props.tries} guess${props.tries > 1 ? 'es' : ''}!` : (
              props.correct ? `The correct word was: ${props.correct}` : `Could not retrieve the correct word from the server`)
            }
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

export default GameOverPopover;
