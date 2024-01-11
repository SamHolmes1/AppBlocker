import axios from "axios";
import { useEffect, useState } from "react";
import SitePreview from "./SitePreview";
import { siteData } from "../../interfaces/SiteData";
import { SuggestedSitesProps } from "../../interfaces/SuggestedSitesProps";
import sortWebsiteByName from "../../utils/SortWebsite";

// https://boolean-hooligans-backend.onrender.com

/**
 * Renders a container of websites that are called down from the API.
 * This component makes an API call
 * @param props
 * @returns JSX.Element
 */
const SuggestedSites = (props: SuggestedSitesProps) => {
  const [categorySelection, setCategorySelection] = useState("gaming");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://boolean-hooligans-backend.onrender.com/api/getone/${categorySelection}`
      )
      .then((data) => {
        const sortedData = data.data.sort(sortWebsiteByName);
        setCategoryData(sortedData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [categorySelection]);

  return (
    <div className="categories">
      <h2 className="suggestions-title">Suggestions</h2>
      <select
        id="categories"
        name="categories"
        value={categorySelection}
        onChange={(e) => {
          setCategorySelection(e.target.value);
        }}
      >
        <option value="gaming">Gaming</option>
        <option value="shopping">Shopping</option>
        <option value="socials">Socials</option>
        <option value="streaming">Streaming</option>
      </select>
      <div className="suggested-sites-buttons ">
        {categoryData.map((element: siteData) => {
          return (
            <SitePreview
              siteName={element.name}
              key={element._id}
              logoUrl={element.logoUrl}
              URL={element.URL}
              isActive={false}
              sitesInActiveList={props.sitesInActiveList}
              setSitesInActiveList={props.setSitesInActiveList}
              unBlockMode={props.unBlockMode}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedSites;
