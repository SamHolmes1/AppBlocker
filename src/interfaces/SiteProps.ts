import { siteData } from "./SiteData";

export interface siteProps {
  siteName: string;
  url: string;
  logoUrl: string;
  isActive: boolean;
  siteList?: Array<siteData>;
  Blocked?: boolean;
  selectedToBlock?: boolean;
  setSitesInActiveList?: Function;
  sitesInActiveList?: Array<string>;
  unBlockMode?: boolean;
}
