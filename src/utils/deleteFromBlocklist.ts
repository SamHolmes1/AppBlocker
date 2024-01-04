import ReadBlockList from "./ReadBlockList";
import fs from "fs";
import { siteData } from "../interfaces/SiteData";

const deleteFromFile = (siteName: string) => {
  const newData = ReadBlockList().websites.filter((website: siteData) => {
    return website.name !== siteName;
  });
  fs.writeFile(
    `${__dirname}/../src/block-list.json`,
    JSON.stringify({ websites: newData }, null, 1),
    () => {}
  );
};

export default deleteFromFile;
