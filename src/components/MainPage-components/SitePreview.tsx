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
    // props.setSitesInActiveList();
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
      <div className={`site-preview-div`}>
        <button
          className={`site-button ${
            props.Blocked !== props.selectedToBlock ? "selected" : ""
          }`}
          onClick={changeBlockStatus}
          
          disabled={
            (props.Blocked === true && props.unBlockMode === false) ||
            (props.Blocked === false && props.unBlockMode === true)
          }
          id={`${
            props.Blocked !== props.selectedToBlock ? "blocked" : "not-blocked"
          }`}
        >
          <img
            className="logo-image"
            id={`${
              props.Blocked === true ? "blocked-logo" : "not-blocked-logo"
            }`}
            // get someone on linux to test tomorrow - need to change line13 in writetoblocklist too
            // src = {`${props.logoUrl} === "src/assets/added.ico"` ? "src/assets/added.ico" : `src/assets/${props.siteName.toLowerCase()}.ico` }
            src={`src/assets/${props.siteName.toLowerCase()}.ico`}
          ></img>
          <span className="site-text">{props.siteName}</span>
        </button>
        <button
          onClick={deleteFromFile}
          style={
            (props.Blocked === true)?{display:"none"}:{}
          }
        >
          delete
        </button>
      </div>
    );
  }
  //@ts-ignore
  if (!props.isActive && !props.sitesInActiveList.includes(props.siteName)) {
    return (
      <div className="site-preview-div">
        <button className="site-button" onClick={addToList}>
          <img className="logo-image" src={`src/assets/${props.siteName.toLowerCase().replace(" ","")}.ico`}></img>
          {props.siteName}
        </button>
      </div>
    );
  }
};

export default SitePreview;
