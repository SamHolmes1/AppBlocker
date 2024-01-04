import { useEffect, useState } from "react";

interface siteProps {
  siteName: string;
  URL: string;
  logoUrl: string;
  isActive: boolean;
  siteList: Array<siteData>;
}
interface siteData {
  name: string;
  URL: string;
  Blocked: boolean;
  logoUrl: string;
}


const SitePreview = (props: siteProps) => {

  const [doesExist, setDoesExist] = useState(false)
 
  const addToList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.electronAPI.writeToBlockList(props.siteName, props.URL, props.logoUrl)
  }

  const changeBlockStatus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.electronAPI.writeToBlockList(props.siteName, props.URL, props.logoUrl, true);
    for(let site of props.siteList) { 
      if(site.name === props.siteName){
        setDoesExist(true)
      }
  }}

  const deleteFromFile = () => {
    ipcRenderer.send("delete from file", props.siteName)


  }

  if(props.isActive){
  return (
    <div className="site-preview-div">
      <button onClick={changeBlockStatus}><h1>{props.siteName}</h1></button>
      <button onClick={deleteFromFile}>delete</button>
    </div>
  );
  } 
  if(doesExist) {
    return (
      <div className="site-preview-div" id="notClickable">
        <h1>{props.siteName}</h1>
      </div>
    );
  }
  else {
    return (
      <div className="site-preview-div">
        <button onClick={addToList}><h1>{props.siteName}</h1></button>
      </div>
    );
  }
};

export default SitePreview;
