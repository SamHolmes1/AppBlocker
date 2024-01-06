import SuggestedSites from "./SuggestedSites";
import UserSelectedSites from "./UserSelectedSites";
import { SitesInActiveList } from "../../interfaces/SitesInActiveList";

const SuggestedAndSelectedSitesContainer = (props: SitesInActiveList) => {
  return (
    <div className="sites-to-block-div">
      <UserSelectedSites
        sitesInActiveList={props.sitesInActiveList}
        setSitesInActiveList={props.setSitesInActiveList}
      />
      <SuggestedSites
        sitesInActiveList={props.sitesInActiveList}
        setSitesInActiveList={props.setSitesInActiveList}
      />
    </div>
  );
};

export default SuggestedAndSelectedSitesContainer;
