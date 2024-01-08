import { useState } from "react";
/**
 * Renders a controlled form component that contains an input field and a button.
 * When the input button is pressed, it trigges an ipcMain event to write to block-list.json
 * @returns JSX.Element
 */
const InputBox = () => {
  const [textInput, setTextInput] = useState("");

  function updateInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTextInput(event.target.value);
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    //@ts-ignore
    ipcRenderer.send("writeToBlockList", textInput);
    setTextInput("");
  }

  return (
    <div className="input-box">
      <form>
        <span className="example-site-text">
        Add the name of the site you'd like to block here.
        Example: To block www.facebook.com enter 'facebook'</span>
        <br></br>
        <input type="text" onChange={updateInput} value={textInput} placeholder="Add your own site here" />
        <button className="add-button-div" onClick={handleClick}>
          Form Button
        </button>
      </form>
    </div>
  );
};

export default InputBox;
