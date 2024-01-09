import { useContext } from "react";
import { SettingsContext } from "../../App";

const SettingsConfirmButton = () => {
  //@ts-ignore
  const { settingsState, setSettingsState } = useContext(SettingsContext);
  const handleOnClick = () => {
    //@ts-ignore
    ipcRenderer.send("writeToUserSettings", settingsState);
  };

  return (
    <button
      className="settings-confirmation-button"
      onClick={() => {
        handleOnClick();
      }}
    >
      Confirm
    </button>
  );
};

export default SettingsConfirmButton;
