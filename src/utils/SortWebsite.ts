import { siteData } from "../interfaces/SiteData";

function sortWebsiteByName(a: siteData, b: siteData) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
}

export default sortWebsiteByName;
