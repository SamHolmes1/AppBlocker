import InputBox from "./InputBox";
import SuggestedSites from "./SuggestedSites";
import SitePreviewContainer from "./SitePreviewContainer";

const SitesToBlock = () => {
  return (
    <div className="sites-to-block-div">
      <SitePreviewContainer />
      <SuggestedSites />
      <InputBox />
    </div>
  );
};

export default SitesToBlock;
