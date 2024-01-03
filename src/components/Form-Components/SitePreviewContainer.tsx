import SitePreview from "./SitePreview";
import { useEffect, useState } from "react";

interface siteData {
  name: string;
  URL: string;
  Blocked: boolean;
}

const SitePreviewContainer = () => {
  const [siteList, setSiteList] = useState({ websites: [] });
  const [writtenToBlockList, setWrittenToBlockList] = useState(false);

  useEffect(() => {
    window.electronAPI.readBlockList();
    setWrittenToBlockList(false);
  }, [writtenToBlockList]);

  ipcRenderer.on("blockListOutput", (e: Event, data: siteData) => {
    setSiteList(data);
  });

  ipcRenderer.on("writtenToBlockList", (e: Event, data: boolean) => {
    setWrittenToBlockList(data);
  });

  return (
    <div className="suggested-sites-div">
      {siteList.websites.map((i: siteData) => {
        return <SitePreview siteName={i.name} key={i.URL} />;
      })}
    </div>
  );
};

export default SitePreviewContainer;
