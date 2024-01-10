import { useEffect, useState } from "react";
import Countdown from "./Countdown";

interface NumbersToUseInterface {
  count: number;
  setCount: Function;
  sixNumbers: Array<number>;
}

function NumbersToUse(props: NumbersToUseInterface) {
  
  
    return (
      <div>
        {/* <h2>The Six Numbers are: {props.sixNumbers}</h2> */}
        <Countdown count={props.count} setCount={props.setCount} />
      </div>
    );
  }


export default NumbersToUse;
