import { useEffect, useState } from "react";

interface MathsProps {
  count: number;
  setCount: Function;
}

function Countdown(props: MathsProps) {
  const [canContinue, setCanContinue] = useState(true);

  useEffect(() => {
    if (props.count === 0) {
      setCanContinue(false);
    } else {
      setTimeout(() => {
        props.setCount(props.count - 1);
      }, 1000);
    }
  }, [props.count]);
  if (canContinue) {
    return <h2>Time Remaining: {props.count}</h2>;
  } else {
    return <h2>You're out of time!</h2>;
  }
}

export default Countdown;
