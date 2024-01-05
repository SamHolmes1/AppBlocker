import { useEffect, useState } from "react";
import ConfirmationButton from "./Form-Components/ConfirmationButton";
import SitesToBlock from "./Form-Components/SItesToBlock";
import SettingsButton from "./Form-Components/SettingsButton";
import UnblockAllSitesButton from "./Form-Components/UnblockAllSitesButton";
import { siteData } from "../interfaces/SiteData";

const Form = () => {
  const [sitesBlockedAtRunTime, setSitesBlockedAtRunTime] = useState([]);
  const [sitesClickedAtRunTime, setSitesClickedAtRunTime] = useState([]);
  const [sitesInActiveList, setSitesInActiveList] = useState([]);

  useEffect(() => {
    ipcRenderer.send("readBlockList");
    ipcRenderer.on(
      "blockListOutput",
      (e, data: { websites: Array<siteData> }) => {
        const tempArray: any = [];
        data.websites.forEach((element: siteData) => {
          tempArray.push(element.name);
        });
        setSitesInActiveList(tempArray);
      }
    );
  }, []);

  return (
    <>
      <div className="form-div">
        <SitesToBlock
          sitesInActiveList={sitesInActiveList}
          setSitesInActiveList={setSitesInActiveList}
        />
        <ConfirmationButton />
        <SettingsButton />
        <UnblockAllSitesButton />
      </div>
    </>
  );
};

export default Form;
