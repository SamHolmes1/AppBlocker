import { useState } from "react";
import { Link } from "react-router-dom";
import { siteData } from "../../interfaces/SiteData";
/**
 * Renders a button component that when pressed, Uses a <Link> tag to send the user to the quiz page.
 * @returns JSX.Element
 */

interface unBlockProps {
  unBlockMode: boolean;
  setUnBlockMode: Function;
}

const UnblockModeButton = (props: unBlockProps) => {
  const [anyBlocked, setAnyBlocked] = useState(false);
  //@ts-ignore
  ipcRenderer.once("blockListOutput", (event, data) => {
    //@ts-ignore
    ipcRenderer.removeAllListeners("blockListOutput");
    let blockedSitesArr = [];

    data.websites.map((website: siteData) => {
      if (website.Blocked) {
        blockedSitesArr.push(website);
      }
    });
    if (blockedSitesArr.length) {
      setAnyBlocked(true);
    } else {
      setAnyBlocked(false);
    }
  });

  const clickHandler = () => {
    ipcRenderer.invoke("updateSelectedToBlock");
    ipcRenderer.removeAllListeners("userSettingsOutput");
    ipcRenderer.removeAllListeners("blockListOutput");
    ipcRenderer.removeAllListeners("writtenToBlockList");
  }

  if (!props.unBlockMode) {
    return (
      <Link to="/quiz">
        <button
        onClick={clickHandler}
          disabled={props.unBlockMode || !anyBlocked}
          className="unblock-all-button"
        >
          Unblock Mode
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className="unblock-all-button"
        onClick={() => {
          props.setUnBlockMode(false);
        }}
      >
        Home
      </button>
    );
  }
};

export default UnblockModeButton;
