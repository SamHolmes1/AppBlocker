import { ipcRenderer } from "electron";
import SitePreview from "./SitePreview";
import { useEffect, useState } from "react";

const SuggestedSites = () => {
const [siteList, setSiteList] = useState({name: "hello", URL: "no", blocked: false})
console.log(window.electronAPI.blockListOutput())
  return (
    <div className="suggested-sites-div">
      {siteList.websites.map((i) => {
        return <SitePreview siteName={i.name} key={i.URL} />;
      })}
    </div>
  );
};

export default SuggestedSites;
