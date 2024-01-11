import { useState, useEffect, useContext } from "react";
import NumbersToUse from "./MathComponents/NumbersToUse";
import WorkBoard from "./MathComponents/WorkBoard";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { SettingsContext } from "../App";

interface MathsPuzzleInterface {
  setUnBlockMode: Function;
}

function MathsPuzzle(props: MathsPuzzleInterface) {
  //@ts-ignore
  const { settingsState } = useContext(SettingsContext);
  const difficultySettings = {
    1: { countdown: 90, bigNums: 2 },
    2: { countdown: 60, bigNums: 2 },
    3: { countdown: 60, bigNums: 1 },
    4: { countdown: 30, bigNums: 1 },
    5: { countdown: 30, bigNums: 0 },
  };
  //@ts-ignore
  const difficulty = difficultySettings[settingsState.difficulty];
  const [count, setCount] = useState(difficulty.countdown);
  const [sixNumbers, setSixNumbers] = useState([]);
  const [targetNumber, setTargetNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCalc, setCurrentCalc] = useState("");

  useEffect(() => {
    let smallNumbersArray: any[] = [];
    for (let i = 1; i < 10; i++) {
      smallNumbersArray.push(i);
    }
    let bigNumbersArray = [25, 50, 75, 100];
    for (let i = 0; i < difficulty.bigNums; i++) {
      const randomIndex = Math.floor(Math.random() * bigNumbersArray.length);
      const numberToAdd = bigNumbersArray[randomIndex];
      bigNumbersArray = bigNumbersArray.filter((number) => {
        return number !== numberToAdd;
      });
      // @ts-ignore
      setSixNumbers((prevArray) => {
        return [...prevArray, numberToAdd];
      });
    }
    for (let i = difficulty.bigNums + 1; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * smallNumbersArray.length);
      const numberToAdd = smallNumbersArray[randomIndex];
      console.log(numberToAdd);
      smallNumbersArray = smallNumbersArray.filter((number) => {
        return number !== numberToAdd;
      });
      //@ts-ignore
      setSixNumbers((prevArray) => {
        return [...prevArray, numberToAdd];
      });
    }
    setTargetNumber(Math.floor(Math.random() * 999));
    setIsLoading(false);
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  const clickHandler = () => {
    props.setUnBlockMode(true);
    // @ts-ignore
    ipcRenderer.invoke("updateSelectedToBlock");
  };

  if (isLoading) {
    return <h1>Your page is loading</h1>;
  } else if (
    count === 0 &&
    currentCalc.toString() !== targetNumber.toString()
  ) {
    return (
      <div className="quiz-end">
        <h1 className="time-run-out">Time Run Out!</h1>
        <Link
          to="/math"
          onClick={() => {
            reloadPage();
          }}
        >
          <button className="unlock-button">Try again</button>
        </Link>
        <Link to="/">
          <button className="unlock-button">Return to Home Page</button>
        </Link>
      </div>
    );
  } else if (!isLoading && currentCalc.toString() !== targetNumber.toString()) {
    return (
      <>
        <div className="mathsPuzzle">
          <NumbersToUse
            sixNumbers={sixNumbers}
            count={count}
            setCount={setCount}
          />
          <WorkBoard
            sixNumbers={sixNumbers}
            targetNumber={targetNumber}
            currentCalc={currentCalc}
            setCurrentCalc={setCurrentCalc}
          />
        </div>
        <Link to="/">
          <button className="home-button"> Home </button>
        </Link>
      </>
    );
  } else {
    return (
      <div className="quiz-end">
        <h1 className="well-done">Well done!</h1>
        <Link to="/" onClick={clickHandler}>
          <button className="unlock-button">UNBLOCK</button>
        </Link>
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    );
  }
}

export default MathsPuzzle;
