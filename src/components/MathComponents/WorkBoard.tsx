import TargetNumber from "./TargetNumber";

interface WorkBoardInterface {
  sixNumbers: Array<number>;
  targetNumber: number;
  currentCalc: string;
  setCurrentCalc: Function;
}

function WorkBoard(props: WorkBoardInterface) {
  const calculatorKeys = ["+", "-", "*", "/", "="];
  for (let i = 0; i < props.sixNumbers.length; i++) {
    calculatorKeys.push(props.sixNumbers[i].toString());
  }

  const handleOnClick = (key: any) => {
    // lastCharacterOfCalc and nonRepeatableKeys both work as expected
    // A conditional is now required to check whether the last character is included in the non repeatables array. If it is, then the key should not be added to currentCalc
    const lastCharacterOfCalc = props.currentCalc[props.currentCalc.length - 1];
    const nonRepeatablekeys = ["+", "-", "*", "/", "="];
    const numbersArray = [];
    for (let i = 0; i < props.sixNumbers.length; i++) {
      numbersArray.push(props.sixNumbers[i].toString());
    }

    if (nonRepeatablekeys.includes(key) && props.currentCalc.length === 0) {
      return;
    }

    if (numbersArray.includes(key)) {
      props.setCurrentCalc(props.currentCalc + key);
    } else if (!nonRepeatablekeys.includes(lastCharacterOfCalc)) {
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
          className="calculator-button"
          onClick={() => {
            props.setCurrentCalc("");
          }}
        >
          delete
        </button>
        {calculatorKeys.map((key) => {
          if (key !== "=") {
            return (
              <button
                key={key}
                className="calculator-button"
                onClick={() => {
                  handleOnClick(key);
                }}
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
