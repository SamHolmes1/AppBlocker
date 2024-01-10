import { PlatformInterface } from "../interfaces/PlatformInterface";
import { siteData } from "../interfaces/SiteData";
import fs from "fs";
import sudo from "sudo-prompt";

function WriteToHosts(
  updatedHosts: string,
  userData: Array<siteData>,
  e: Electron.IpcMainEvent,
  userPlatform: PlatformInterface
) {
  const options = {
    name: "Electron",
    icns: "/Applications/Electron.app/Contents/Resources/Electron.icns", // (optional)
  };
  if (!userPlatform.error) {
    sudo.exec(
      userPlatform.platform === "windows"
        ? `echo. > ${userPlatform.hostsPath} & ${userPlatform.writeCommand} ${__dirname}\\windows_hosts_staging.txt >> ${userPlatform.hostsPath}`
        : `${userPlatform.writeCommand} "${updatedHosts}" > ${userPlatform.hostsPath} ${userPlatform.endOfCommand} ${userPlatform.flushDNSCommand}`,
      options,
      (error) => {
        if (error) {
          console.log(error);
        } else {
          const updatedBlockList = userData.map((site) => {
            site.Blocked = site.selectedToBlock;
            return site;
          });

          fs.writeFileSync(
            `${__dirname}/../src/block-list.json`,
            JSON.stringify({ websites: updatedBlockList }, null, 1)
          );

          e.sender.send("writtenToBlockList", true);
        }
      }
    );
  } else {
    throw new Error("platform not supported");
  }
}

export default WriteToHosts;
