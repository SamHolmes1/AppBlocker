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
    <div className="difficulty-section">
      <label htmlFor="difficulty-slider">
        Difficulty: {sliderData}/5
      </label>
      <input
        value={sliderData}
        type="range"
        min="1"
        max="5"
        id="difficulty-slider"
        onChange={(event) => {
          changeHandler(event);
        }}
      ></input>
    </div>
  );
};

export default DifficultyDropdown;
