import { useState } from "react";
import { siteData } from "../../interfaces/SiteData";

/**
 * Renders a button that when pressed, triggers an ipcMain Event to update the hosts file.
 * This will ask the user for admin privileges
 * @returns JSX.Element
 */
interface confirmationButtonProps {
  setUnBlockMode: Function;
  setWrittenToBlocklist: Function;
  unBlockMode: boolean;
}

const ConfirmationButton = (props: confirmationButtonProps) => {
  const [anySelected, setAnySelected] = useState(false);
  const [anyBlocked, setAnyBlocked] = useState(false);
  //@ts-ignore
  ipcRenderer.once("blockListOutput", (event, data) => {
    //@ts-ignore
    ipcRenderer.removeAllListeners("blockListOutput");
    let selectedSitesArr = [];
    let blockedSitesArr = [];
    data.websites.map((website: siteData) => {
      if (website.selectedToBlock && !website.Blocked && !props.unBlockMode) {
        selectedSitesArr.push(website);
      }
      if (!website.selectedToBlock && website.Blocked && props.unBlockMode) {
        selectedSitesArr.push(website);
      }
      if (website.Blocked) {
        blockedSitesArr.push(website);
      }
    });
    if (selectedSitesArr.length) {
      setAnySelected(true);
    } else {
      setAnySelected(false);
    }
    if (blockedSitesArr.length) {
      setAnyBlocked(true);
    } else {
      setAnyBlocked(false);
    }
  });

  const clickHandler = () => {
    //@ts-ignore
    ipcRenderer.invoke("updateHosts");
    props.setUnBlockMode(false);
  };

  //@ts-ignore
  ipcRenderer.once("writtenToBlockList", () => {
    props.setWrittenToBlocklist(true);
    //@ts-ignore
    ipcRenderer.removeAllListeners("writtenToBlockList");
  });

  return (
    <button
      className="confirmation-button-div"
      onClick={clickHandler}
      disabled={
        (!anySelected && !props.unBlockMode) ||
        (props.unBlockMode && !anySelected)
      }
    >
      {props.unBlockMode ? "Unblock!" : "Block!"}
    </button>
  );
};

export default ConfirmationButton;
