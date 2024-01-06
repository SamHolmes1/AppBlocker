import { siteProps } from "../../interfaces/SiteProps";

const SitePreview = (props: siteProps) => {
  function addToList(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault();
    //@ts-ignore
    ipcRenderer.send("writeToBlockList", props.siteName);
    const tempArray: Array<any> = [];

    //@ts-ignore
    props.sitesInActiveList.forEach((element) => {
      if (element === props.siteName) {
        return;
      } else {
        tempArray.push(props.siteName);
      }
    });

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
        className={`site-preview-div ${
          props.Blocked === true ? "blocked" : "not-blocked"
        }`}
      >
        <button className="site-button" onClick={changeBlockStatus}>
          {props.siteName}
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
          {props.siteName}
        </button>
      </div>
    );
  }
};

export default SitePreview;
