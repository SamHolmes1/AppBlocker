import { useContext } from "react";
import { SettingsContext } from "../../App";
import { Link } from "react-router-dom";

const SettingsConfirmButton = () => {
  //@ts-ignore
  const { settingsState, setSettingsState } = useContext(SettingsContext);
  const handleOnClick = () => {
    //@ts-ignore
    ipcRenderer.invoke("writeToUserSettings", settingsState);
  };

  return (
    <Link
      to="/"
      onClick={() => {
        handleOnClick();
      }}
    >
      <button className="settings-confirmation-button">Confirm</button>
    </Link>
  );
};

export default SettingsConfirmButton;
