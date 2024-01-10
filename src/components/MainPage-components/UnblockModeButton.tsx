import { useState } from "react";
import { Link } from "react-router-dom";
/**
 * Renders a button component that when pressed, Uses a <Link> tag to send the user to the quiz page.
 * @returns JSX.Element
 */

interface unBlockProps {
  unBlockMode: boolean;
  setUnBlockMode: Function;
}




const UnblockModeButton = (props: unBlockProps) => {
  const [anyBlocked, setAnyBlocked] = useState(false)
  ipcRenderer.on("blockListOutput", (event, data) => {

    let blockedSitesArr = []

     data.websites.map((website) => {
      if (website.Blocked) {
        blockedSitesArr.push(website)
      }
    })
    if (blockedSitesArr.length) {
      setAnyBlocked(true)
    } else {
      setAnyBlocked(false)
    }
  })
  if (!props.unBlockMode) {
  return (
    <Link to="/quiz">
      <button  disabled={props.unBlockMode || !anyBlocked} className="unblock-all-button">Unblock Mode</button>
    </Link>
  );
  } else {
    return (
        <button  className="unblock-all-button" onClick={() => {props.setUnBlockMode(false)}}>Home</button>
    );
  }
};

export default UnblockModeButton;
