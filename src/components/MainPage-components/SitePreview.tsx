import { siteProps } from "../../interfaces/SiteProps";

/**
 * Renders a component conditionally based on whether it exists in block-list.json.
 * If it does, it renders the site text with two buttons.
 * If it does not, it renders a single button to add it to the block-list.json.
 * @param props
 * @returns JSX.Element
 */

const SitePreview = (props: siteProps) => {
  function addToList(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault();
    //@ts-ignore
    ipcRenderer.send("writeToBlockList", props.siteName);
    //@ts-ignore
    props.setSitesInActiveList(tempArray);
  }

  function changeBlockStatus(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    //@ts-ignore
    ipcRenderer.send("writeToBlockList", props.siteName);
  }

  function deleteFromFile(): void {
    //@ts-ignore
    ipcRenderer.send("delete from file", props.siteName);
  }

  if (props.isActive) {
    return (
      <div
        className={`site-preview-div`}
      >
        <button className="site-button" id={`${
          props.Blocked === true ? "blocked" : "not-blocked"
        }`} onClick={changeBlockStatus}>
          {/* <img className="logo-image" src={`src/assets/${props.siteName}.ico`}></img> */}
          <img className="logo-image" id={`${
          props.Blocked === true ? "blocked-logo" : "not-blocked-logo"
          }`} src={`src/assets/steam.ico`}></img>
          <span className="site-text">{props.siteName}</span>
        </button>
        <button onClick={deleteFromFile}>delete</button>
      </div>
    );
  }
  //@ts-ignore
  if (!props.isActive && !props.sitesInActiveList.includes(props.siteName)) {
    return (
      <div className="site-preview-div">
        <button className="site-button" onClick={addToList}>
          {/* <img className="logo-image" src={`src/assets/${props.siteName}.ico`}></img> */}
          <img className="logo-image" src={`src/assets/steam.ico`}></img>
          {props.siteName}
        </button>
      </div>
    );
  }
};

export default SitePreview;
