import { createContext, useContext, useState } from "react";
import PuzzleSelector from "./settings-components/PuzzleSelector";
import SettingsConfirmButton from "./settings-components/SettingsConfirmButton";
import { SettingsContext } from "../App";

export const ConfirmationContext = createContext({});

const Settings = () => {
  const [canConfirm, setCanConfirm] = useState(true);
  const { settingsState, setSettingsState } = useContext(SettingsContext);
  return (
    <>
      <ConfirmationContext.Provider value={{canConfirm, setCanConfirm}}>
        <div className="settings-div">
          <h2>settings</h2>
          <div className="settings-options">
            <PuzzleSelector />
          </div>
        </div>
        <SettingsConfirmButton />
      </ConfirmationContext.Provider>
    </>
  );
};

export default Settings;
