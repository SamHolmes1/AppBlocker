import TargetNumber from "./TargetNumber";
import { useEffect, useState } from "react";

interface WorkBoardInterface {
  sixNumbers: Array<number>;
  targetNumber: number;
  currentCalc: string;
  setCurrentCalc: Function;
}

function WorkBoard(props: WorkBoardInterface) {
  const [lastEntry, setLastEntry] = useState("");

  const calculatorKeys = ["+", "-", "*", "/", "="];
  for (let i = 0; i < props.sixNumbers.length; i++) {
    calculatorKeys.push(props.sixNumbers[i].toString());
  }
  let keyCounter = 0;

  const handleOnClick = (key: any, event: any) => {
    // lastCharacterOfCalc and nonRepeatableKeys both work as expected
    // A conditional is now required to check whether the last character is included in the non repeatables array. If it is, then the key should not be added to currentCalc

    // setDisabledButton(!disabledButton);
    setLastEntry(key);

    const nonRepeatablekeys = ["+", "-", "*", "/", "="];
    const numbersArray = [];
    for (let i = 0; i < props.sixNumbers.length; i++) {
      numbersArray.push(props.sixNumbers[i].toString());
    }

    if (nonRepeatablekeys.includes(key) && props.currentCalc.length === 0) {
      return;
    } else if (numbersArray.includes(key) && numbersArray.includes(lastEntry)) {
      return;
    } else if (
      numbersArray.includes(key) ||
      !nonRepeatablekeys.includes(lastEntry)
    ) {
      props.setCurrentCalc(props.currentCalc + key);
    }
  };

  const handleEquals = () => {
    if (props.currentCalc === props.targetNumber.toString()) {
      alert("Congrats!");
    }
    props.setCurrentCalc(eval(props.currentCalc));
    if (props.currentCalc === props.targetNumber.toString()) {
      alert("Congrats!");
    }
  };

  return (
    <div className="work-board">
      <TargetNumber targetNumber={props.targetNumber} />
      <div className="calculator-area">
        <button
          className="calculator-button delete"
          onClick={() => {
            props.setCurrentCalc("");
            setLastEntry("");
          }}
        >
          delete
        </button>
        {calculatorKeys.map((key) => {
          if (key !== "=") {
            keyCounter++;
            return (
              <button
                id={`button${keyCounter}`}
                key={keyCounter}
                className="calculator-button"
                onClick={(event) => {
                  handleOnClick(key, event);
                }}
                disabled={false}
              >
                {key}
              </button>
            );
          } else {
            return (
              <button
                key={key}
                className="calculator-button"
                onClick={() => {
                  handleEquals();
                }}
              >
                {key}
              </button>
            );
          }
        })}
      </div>
      <div className="current-calculation">
        <p>{props.currentCalc}</p>
      </div>
    </div>
  );
}

export default WorkBoard;
