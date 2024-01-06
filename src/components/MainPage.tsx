import { useEffect, useState } from "react";
import ConfirmationButton from "./Form-Components/ConfirmationButton";
import SuggestedAndSelectedSitesContainer from "./Form-Components/SuggestedAndSelectedSitesContainer";
import SettingsButton from "./Form-Components/SettingsButton";
import UnblockAllSitesButton from "./Form-Components/UnblockAllSitesButton";
import { siteData } from "../interfaces/SiteData";

const MainPage = () => {
  const [sitesInActiveList, setSitesInActiveList] = useState([""]);

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
export default MainPage;
