import { useEffect, useState } from "react";
import ConfirmationButton from "./MainPage-components/ConfirmationButton";
import SuggestedAndSelectedSitesContainer from "./MainPage-components/SuggestedAndSelectedSitesContainer";
import SettingsButton from "./MainPage-components/SettingsButton";
import UnblockModeButton from "./MainPage-components/UnblockModeButton";
import { siteData } from "../interfaces/SiteData";

//ipcRenderer.send("updateHosts", true);

interface MainPageProps {
  setUnBlockMode: Function;
  unBlockMode: boolean;
}

const MainPage = (props: MainPageProps) => {
  const [sitesInActiveList, setSitesInActiveList] = useState([""]);
  const [writtenToBlockList, setWrittenToBlockList] = useState(false);
  //Sends the signal to the electron main process to read the JSON file
  useEffect(() => {
    //@ts-ignore
    ipcRenderer.invoke("updateSelectedToBlock");
    ipcRenderer.invoke("readBlockList");
  }, [props.unBlockMode]);

  //@ts-ignore
  //Executes the below code when the main process triggers this event.
  //Populates the sitesInActiveList state with a list of sites from the JSON file at runtime.
  ipcRenderer.once(
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
          unBlockMode={props.unBlockMode}
        />
        <div className="footer-buttons">
          <SettingsButton />
          <ConfirmationButton
            setWrittenToBlocklist={setWrittenToBlockList}
            setUnBlockMode={props.setUnBlockMode}
            unBlockMode={props.unBlockMode}
          />
          <UnblockModeButton
            unBlockMode={props.unBlockMode}
            setUnBlockMode={props.setUnBlockMode}
          />
        </div>
      </div>
    </>
  );
};
export default MainPage;
