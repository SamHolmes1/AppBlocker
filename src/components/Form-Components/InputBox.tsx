import { useState } from "react";
// import { ipcRenderer } from "electron";
// import { ipcRenderer } from "electron/renderer";
// import WriteToBlockList from "../../utils/WriteToBlockList";

const InputBox = () => {
  const [textInput, setTextInput] = useState("");

  function updateInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTextInput(event.target.value);
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    window.electronAPI.writeToBlockList(textInput)
    setTextInput("");
  }

  return (
    <div className="input-box">
      <form>
        <input type="text" onChange={updateInput} value={textInput} />
        <button className="add-button-div" onClick={handleClick}>
          Form Button
        </button>
      </form>
    </div>
  );
};

export default InputBox;
