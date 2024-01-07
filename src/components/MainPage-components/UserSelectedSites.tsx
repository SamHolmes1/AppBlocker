import SitePreview from "./SitePreview";
import { useEffect, useState } from "react";
import { siteData } from "../../interfaces/SiteData";
import { SitesInActiveListProps } from "../../interfaces/SitesInActiveList";
import InputBox from "./InputBox";

/**
 *
 * @param props
 * @returns JSX.Element
 */
const UserSelectedSites = (props: SitesInActiveListProps) => {
  const [siteList, setSiteList] = useState({ websites: [] });
  const [writtenToBlockList, setWrittenToBlockList] = useState(false);

  useEffect(() => {
    //@ts-ignore
    ipcRenderer.send("readBlockList");
    setWrittenToBlockList(false);
  }, [writtenToBlockList]);

  //@ts-ignore
  ipcRenderer.on("blockListOutput", (e, data) => {
    setSiteList(data);
    //@ts-ignore
    ipcRenderer.removeListener("blockListOutput", () => {});
  });

  //@ts-ignore
  ipcRenderer.on("writtenToBlockList", (e, data: boolean) => {
    setWrittenToBlockList(data);
    //@ts-ignore
    ipcRenderer.removeListener("writtenToBlockList", () => {});
  });

  if (siteList.websites.length === 0) {
    return <p>add websites to list</p>;
  } else {
    return (
      <div className="suggested-sites-div">
        <h2>Selected sites</h2>
        {siteList.websites.map((i: siteData) => {
          return (
            <SitePreview
              siteName={i.name}
              key={i.URL}
              URL={i.URL}
              logoUrl={i.logoUrl}
              isActive={true}
              Blocked={i.Blocked}
              siteList={siteList.websites}
            />
          );
        })}
        <InputBox />
      </div>
    );
  }
};

export default UserSelectedSites;
