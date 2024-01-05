import { IpcRendererEvent } from "electron";
import SitePreview from "./SitePreview";
import { useEffect, useState } from "react";

interface siteData {
  name: string;
  URL: string;
  Blocked: boolean;
  logoUrl: string;
}

const SitePreviewContainer = () => {
  const [siteList, setSiteList] = useState({ websites: [] });
  const [writtenToBlockList, setWrittenToBlockList] = useState(false);

  useEffect(() => {
    window.electronAPI.readBlockList();
    setWrittenToBlockList(false);
  }, [writtenToBlockList]);

  ipcRenderer.on("blockListOutput", (e: IpcRendererEvent, data) => {
    setSiteList(data);
  });

  ipcRenderer.on("writtenToBlockList", (e: IpcRendererEvent, data: boolean) => {
    setWrittenToBlockList(data);
  });

  if (siteList.websites.length === 0) {
    return <p>add websites to list</p>;
  } else {
    return (
      <div className="suggested-sites-div">
        {siteList.websites.map((i: siteData) => {
          return (
            <SitePreview
              siteName={i.name}
              key={i.URL}
              URL={i.URL}
              logoUrl={i.logoUrl}
              isActive={true}
              siteList={siteList.websites}
            />
          );
        })}
      </div>
    );
  }
};

export default SitePreviewContainer;
