import { useContext } from "react";
import PuzzleSelector from "./settings-components/PuzzleSelector";
import SettingsConfirmButton from "./settings-components/SettingsConfirmButton";
import { SettingsContext } from "../App";

const Settings = () => {
  const { settingsState, setSettingsState } = useContext(SettingsContext);
  return (
    <>
      <div className="settings-div">
        <h2>settings</h2>
        <PuzzleSelector />
        <SettingsConfirmButton />
      </div>
    </>
  );
};

export default Settings;
