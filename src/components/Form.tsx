import { useState } from "react";
import ConfirmationButton from "./Form-Components/ConfirmationButton";
import SitesToBlock from "./Form-Components/SItesToBlock";
import SettingsButton from "./Form-Components/SettingsButton";
import UnblockAllSitesButton from "./Form-Components/UnblockAllSitesButton";

const Form = () => {
  const [sitesBlockedAtRunTime, setSitesBlockedAtRunTime] = useState([]);
  const [sitesClickedAtRunTime, setSitesClickedAtRunTime] = useState([]);
  const [sitesInActiveList, setSitesInActiveList] = useState([]);

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
