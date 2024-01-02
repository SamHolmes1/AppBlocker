import InputBox from "./InputBox";
import SuggestedSites from "./SuggestedSites";

const SitesToBlock = () => {
  return (
    <div className="sites-to-block-div">
      <SuggestedSites />
      <InputBox />
    </div>
  );
};

export default SitesToBlock;
