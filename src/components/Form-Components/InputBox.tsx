import { useState } from "react";
import "fs";

function writeToFile() {}

const InputBox = () => {
  const [textInput, setTextInput] = useState("");
  return (
    <div className="input-box">
      <form>
        <input type="text"></input>
        <button className="add-button-div">Form Button</button>
      </form>
    </div>
  );
};

export default InputBox;
