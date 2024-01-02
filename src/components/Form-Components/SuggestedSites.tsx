import userData from "../../block-list.json";
import SitePreview from "./SitePreview";

const SuggestedSites = () => {
  return (
    <div className="suggested-sites-div">
      {userData.websites.map((i) => {
        return <SitePreview siteName={i} />;
      })}
    </div>
  );
};

export default SuggestedSites;
