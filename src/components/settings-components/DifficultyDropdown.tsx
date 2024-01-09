import { useContext, useState } from "react";
import { SettingsContext } from "../../App";
import { settingsObjectInterface } from "../../interfaces/SettingsObject";

const DifficultyDropdown = () => {
  //@ts-ignore
  const { settingsState, setSettingsState } = useContext(SettingsContext);

  const [sliderData, setSliderData] = useState(settingsState.difficulty);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderData(event.target.value);
    setSettingsState((state: settingsObjectInterface) => {
      state.difficulty = +event.target.value;
      console.log(event.target.value);
      return state;
    });
  };

  return (
    <>
      <label htmlFor="difficulty-slider">
        Current difficulty: {sliderData}/5
      </label>
      <input
        type="range"
        min="1"
        max="5"
        id="difficulty-slider"
        onChange={(event) => {
          changeHandler(event);
        }}
      ></input>
    </>
  );
};

export default DifficultyDropdown;
