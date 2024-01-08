import SuggestedSites from "./SuggestedSites";
import UserSelectedSites from "./UserSelectedSites";
import { SitesInActiveListProps } from "../../interfaces/SitesInActiveList";

/**
 * returns a container for selected sites(found in block-list.json) and available sites(from the api)
 * @param props
 * @returns JSX.Element
 */
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