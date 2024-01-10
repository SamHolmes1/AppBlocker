import { useState, useEffect } from "react";
import NumbersToUse from "./MathComponents/NumbersToUse";
import WorkBoard from "./MathComponents/WorkBoard";

function App() {
  // Will update difficulty based on context
  // If difficulty is 1, count is 90 and bigNums is 2
  // If difficulty is 2, count is 60 and bigNums is 2
  // If difficulty is 3, count is 60 and bigNums is 1
  // If difficulty is 4, count is 30 and bigNums is 1
  // If difficulty is 5, count is 60 and bigNums is 0
  const difficulty = { countdown: 30, bigNums: 2 };
  const [count, setCount] = useState(difficulty.countdown);
  const [sixNumbers, setSixNumbers] = useState([]);
  const [targetNumber, setTargetNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCalc, setCurrentCalc] = useState("");

  useEffect(() => {
    const smallNumbersArray: any[] = [];
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
      //@ts-ignore
      setSixNumbers((prevArray) => {
        return [...prevArray, smallNumbersArray[randomIndex]];
      });
    }
    setTargetNumber(Math.floor(Math.random() * 999));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <h1>Your page is laoding</h1>;
  } else {
    return (
      <>
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
      </>
    );
  }
}

export default App;
