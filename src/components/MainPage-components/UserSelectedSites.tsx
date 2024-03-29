import SitePreview from "./SitePreview";
import { useEffect, useState } from "react";
import { siteData } from "../../interfaces/SiteData";
import { SitesInActiveListProps } from "../../interfaces/SitesInActiveList";
import InputBox from "./InputBox";
import sortWebsiteByName from "../../utils/SortWebsite";

/**
 *
 * @param props
 * @returns JSX.Element
 */
const UserSelectedSites = (props: SitesInActiveListProps) => {
  const [siteList, setSiteList] = useState({ websites: [] });

  useEffect(() => {
    //@ts-ignore
    ipcRenderer.invoke("readBlockList");
    props.setWrittenToBlockList(false);
  }, [props.writtenToBlockList]);

  //@ts-ignore
  ipcRenderer.once("blockListOutput", (e, data) => {
    //@ts-ignore
    ipcRenderer.removeAllListeners("blockListOutput");
    const newData = structuredClone(data);
    newData.websites.sort(sortWebsiteByName);
    setSiteList(newData);
  });

  //@ts-ignore
  ipcRenderer.once("writtenToBlockList", (e, data: boolean) => {
    props.setWrittenToBlockList(data);
    //@ts-ignore
    ipcRenderer.removeAllListeners("writtenToBlockList");
  });

  if (siteList.websites.length === 0) {
    return (
      <div className="suggested-sites-div">
        <h2>My Sites</h2>
        <p>Click a site on the right-hand side or add your own!</p>
        <InputBox />
      </div>
    );
  } else {
    return (
      <div className="suggested-sites-div">
        <h2 className={props.unBlockMode ? "warning" : ""}>
          {props.unBlockMode ? "!! My Sites: Unblock Mode !!" : "My Sites"}
        </h2>
        <p className={props.unBlockMode ? "warning" : ""}>
          {props.unBlockMode
            ? "Select sites to unblock"
            : "Select sites to block"}
        </p>
        <div className="list-of-my-buttons">
          {siteList.websites.map((i: siteData) => {
            return (
              <SitePreview
                siteName={i.name}
                key={i.URL}
                URL={i.URL}
                logoUrl={i.logoUrl}
                isActive={true}
                Blocked={i.Blocked}
                selectedToBlock={i.selectedToBlock}
                siteList={siteList.websites}
                unBlockMode={props.unBlockMode}
              />
            );
          })}
        </div>
        {!props.unBlockMode ? <InputBox /> : ""}
      </div>
    );
  }
};

export default UserSelectedSites;
