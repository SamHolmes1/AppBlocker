import axios from "axios";
import { useEffect, useState } from "react";
import SitePreview from "./SitePreview";
import { SitesInActiveList } from "../../interfaces/SitesInActiveList";

// https://boolean-hooligans-backend.onrender.com

interface siteData {
  name: string;
  URL: string;
  Blocked: boolean;
  logoUrl: string;
  _id: number;
}

const SuggestedSites = (props: SitesInActiveList) => {
  const [categorySelection, setCategorySelection] = useState("gaming");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://boolean-hooligans-backend.onrender.com/api/getone/${categorySelection}`
      )
      .then((data) => {
        setCategoryData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [categorySelection]);

  return (
    <div className="categories">
      <h2>Suggestions</h2>
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
          />
        );
      })}
    </div>
  );
};

export default SuggestedSites;
