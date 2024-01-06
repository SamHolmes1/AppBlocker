import { useState } from "react";
import { siteData } from "../../interfaces/SiteData";

interface siteProps {
  siteName: string;
  URL: string;
  logoUrl: string;
  isActive: boolean;
  Blocked?: boolean;
  siteList: Array<siteData>;
  setSitesInActiveList: Function;
  sitesInActiveList: Array<string>;
}

const SitePreview = (props: siteProps) => {
  const addToList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.electronAPI.writeToBlockList(
      props.siteName,
      props.URL,
      props.logoUrl
    );
    const tempArray: Array<any> = [];
    props.sitesInActiveList.forEach((element) => {
      if (element === props.siteName) {
        return;
      } else {
        tempArray.push(props.siteName);
      }
    });
    props.setSitesInActiveList([tempArray[0]]);
  };

  const changeBlockStatus = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    window.electronAPI.writeToBlockList(
      props.siteName,
      props.URL,
      props.logoUrl,
      true
    );
  };

  const deleteFromFile = () => {
    ipcRenderer.send("delete from file", props.siteName);
  };

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
