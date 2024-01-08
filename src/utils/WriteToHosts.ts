import sudo from "sudo-prompt";
import { siteData } from "../interfaces/SiteData";
import fs from "fs"

const WriteToHosts = (updatedHosts: string, userData: Array<siteData>) => {
  const options = {
    name: "Electron",
    icns: "/Applications/Electron.app/Contents/Resources/Electron.icns", // (optional)
  };

  sudo.exec(
    `echo "${updatedHosts}" | cat > /etc/hosts | resolvectl flush-caches`,
    options,
    function (error) {
      if (error) {
        //TODO: implement error handling
      } else {
        const updatedBlockList = userData.map((site) => {
          site.Blocked = site.selectedToBlock
          return site
        })
        const updatedBlockListJSON = JSON.stringify({websites: updatedBlockList}, null, 1)
        fs.writeFileSync(`${__dirname}/../src/block-list.json`, updatedBlockListJSON)
        
      }
    }
  );
};

export default WriteToHosts;
