import { useContext } from "react";
import { SettingsContext } from "../../App";

const SettingsConfirmButton = () => {
  const { settingsState, setSettingsState } = useContext(SettingsContext);
  const handleOnClick = () => {
    ipcRenderer.send("writeToUserSettings", settingsState);
  };

  return (
    <button
      className="settings-confirmation-button"
      onClick={() => {
        handleOnClick();
      }}
    >
      Confirm Settings
    </button>
  );
};

export default SettingsConfirmButton;
