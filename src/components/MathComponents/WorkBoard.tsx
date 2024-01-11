import TargetNumber from "./TargetNumber";
import { useState } from "react";

interface WorkBoardInterface {
  sixNumbers: Array<number>;
  targetNumber: number;
  currentCalc: string;
  setCurrentCalc: Function;
}

function WorkBoard(props: WorkBoardInterface) {
  const [lastEntry, setLastEntry] = useState("");
  const [sixNumberState, setSixNumberState] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const calculatorKeys = ["+", "-", "*", "/"];
  for (let i = 0; i < props.sixNumbers.length; i++) {
    calculatorKeys.push(props.sixNumbers[i].toString());
  }
  let keyCounter = 0;

  const handleOnClick = (key: any, _event: any) => {
    const nonRepeatablekeys = ["+", "-", "*", "/", "="];

    if (!nonRepeatablekeys.includes(key)) {
      setSixNumberState((prevArray) => {
        const indexOfKey = props.sixNumbers.indexOf(+key);
        prevArray[indexOfKey] = true;
        return prevArray;
      });
    }
    setLastEntry(key);

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
            setSixNumberState([false, false, false, false, false, false]);
          }}
        >
          C
        </button>
        {calculatorKeys.map((key) => {
          keyCounter++;
          const indexOfKey = props.sixNumbers.indexOf(+key);
          return (
            <button
              id={`button${key}`}
              key={keyCounter}
              className="calculator-button"
              onClick={(event) => {
                handleOnClick(key, event);
              }}
              disabled={sixNumberState[indexOfKey]}
            >
              {key}
            </button>
          );
        })}

        <button
          className="calculator-button"
          id="equals-button"
          onClick={() => {
            handleEquals();
          }}
        >
          =
        </button>
      </div>
      <div className="current-calculation">
        <p className="current-calculation-text">
          Current sum: <br /> {props.currentCalc}
        </p>
      </div>
    </div>
  );
}

export default WorkBoard;
