import InputBox from "./InputBox";
import SuggestedSites from "./SuggestedSites";
import SitePreviewContainer from "./SitePreviewContainer";
import { SitesInActiveList } from "../../interfaces/SitesInActiveList";

const SitesToBlock = (props: SitesInActiveList) => {
  return (
    <div className="sites-to-block-div">
      <SitePreviewContainer
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

export default SitesToBlock;
