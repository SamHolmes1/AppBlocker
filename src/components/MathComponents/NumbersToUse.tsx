import { useEffect, useState } from "react";
import Countdown from "./Countdown";

interface NumbersToUseInterface {
  count: number;
  setCount: Function;
  sixNumbers: Array<number>;
}

function NumbersToUse(props: NumbersToUseInterface) {
  
  const [isLoading, setIsLoading] = useState(false);
  const bigNumbers = [25, 50, 75, 100];
  const smallNumbers = [];
  for (let i = 1; i < 10; i++) {
    smallNumbers.push(i);
  }

  useEffect(() => {
    
  }, []);

  if (!isLoading) {
    return (
      <div>
        <h2>The Six Numbers are: {props.sixNumbers}</h2>
        <Countdown count={props.count} setCount={props.setCount} />
      </div>
    );
  }
}

export default NumbersToUse;
