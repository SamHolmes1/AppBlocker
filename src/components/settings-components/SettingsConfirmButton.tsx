import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../App";
import { Link } from "react-router-dom";
import { ConfirmationContext } from "../Settings";

const SettingsConfirmButton = () => {
  //@ts-ignore
  const { canConfirm, setCanConfirm } = useContext(ConfirmationContext);
  //@ts-ignore
  const { settingsState, setSettingsState } = useContext(SettingsContext);
  const handleOnClick = () => {
    //@ts-ignore
    ipcRenderer.invoke("writeToUserSettings", settingsState);
    ipcRenderer.removeAllListeners("userSettingsOutput");
    ipcRenderer.removeAllListeners("blockListOutput");
    ipcRenderer.removeAllListeners("writtenToBlockList");
  };
  const handleCannotConfirm = () => {
    alert("Must select at least one puzzle to confirm");
  };

  useEffect(() => {}, [canConfirm]);

  if (canConfirm === true) {
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
  } else {
    return (
      <button
        className="settings-confirmation-button"
        onClick={() => {
          handleCannotConfirm();
        }}
      >
        Confirm
      </button>
    );
  }
};

export default SettingsConfirmButton;
