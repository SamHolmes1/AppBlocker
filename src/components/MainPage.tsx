import { useEffect, useState } from "react";
import ConfirmationButton from "./MainPage-components/ConfirmationButton";
import SuggestedAndSelectedSitesContainer from "./MainPage-components/SuggestedAndSelectedSitesContainer";
import SettingsButton from "./MainPage-components/SettingsButton";
import UnblockAllSitesButton from "./MainPage-components/UnblockAllSitesButton";
import { siteData } from "../interfaces/SiteData";

const MainPage = () => {
  const [sitesInActiveList, setSitesInActiveList] = useState([""]);
  const [writtenToBlockList, setWrittenToBlockList] = useState(false);
  const [unBlockMode, setUnBlockMode] = useState(false);

  //Sends the signal to the electron main process to read the JSON file
  useEffect(() => {
    //@ts-ignore
    ipcRenderer.send("readBlockList");
  }, []);

  //@ts-ignore
  //Executes the below code when the main process triggers this event.
  //Populates the sitesInActiveList state with a list of sites from the JSON file at runtime.
  ipcRenderer.on(
    "blockListOutput",
    (_e: any, data: { websites: Array<siteData> }) => {
      const tempArray: Array<string> = [];
      data.websites.forEach((element: siteData) => {
        tempArray.push(element.name);
      });
      setSitesInActiveList(tempArray);
      //@ts-ignore
      //Removes the listener
      ipcRenderer.removeListener("blockListOutput", () => {});
    }
  );

  return (
    <>
      <div className="form-div">
        <SuggestedAndSelectedSitesContainer
          writtenToBlockList={writtenToBlockList}
          setWrittenToBlockList={setWrittenToBlockList}
          sitesInActiveList={sitesInActiveList}
          setSitesInActiveList={setSitesInActiveList}
        />
        <ConfirmationButton setWrittenToBlocklist={setWrittenToBlockList} />
        <SettingsButton />
        <UnblockAllSitesButton />
      </div>
    </>
  );
};
export default MainPage;
