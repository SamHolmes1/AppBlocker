import { siteData } from "./SiteData";

export interface siteProps {
  siteName: string;
  URL: string;
  logoUrl: string;
  isActive: boolean;
  siteList?: Array<siteData>;
  Blocked?: boolean;
  setSitesInActiveList?: Function;
  sitesInActiveList?: Array<string>;
}
