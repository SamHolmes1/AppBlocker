import SuggestedSites from "./SuggestedSites";
import UserSelectedSites from "./UserSelectedSites";
import { SitesInActiveListProps } from "../../interfaces/SitesInActiveList";

const SuggestedAndSelectedSitesContainer = (props: SitesInActiveListProps) => {
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
