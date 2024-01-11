import { PlatformInterface } from "../interfaces/PlatformInterface";
import fs from "fs";
import WriteToHosts from "./WriteToHosts";

function createUpdatedHosts(
  e: Electron.IpcMainInvokeEvent,
  userPlatform: PlatformInterface
): void {
  const topLevelDomains = ["com", "co.uk", "tv"];
  fs.copyFileSync(
    `${__dirname}/hosts_backup.txt`,
    `${__dirname}/hosts_updated.txt`
  );

  const userData = JSON.parse(
    fs.readFileSync(`${__dirname}/../src/block-list.json`).toString()
  );

  let hostsUpdated = fs
    .readFileSync(`${__dirname}/hosts_updated.txt`)
    .toString()
    .split(userPlatform.newLineFlag);

  hostsUpdated.push(`#Created by AppBlocker${userPlatform.newLineFlag}`);

  for (let element of userData.websites) {
    if (element.selectedToBlock) {
      let hostsNewLine = "0.0.0.0";
      for (let i = 0; i < topLevelDomains.length; i++) {
        hostsNewLine += ` ${element.URL}.${topLevelDomains[i]}`;
        hostsNewLine += ` www.${element.URL}.${topLevelDomains[i]}`;
      }
      hostsUpdated.push(hostsNewLine);
    }
  }

  const newHostsUpdated = hostsUpdated.join(userPlatform.newLineFlag);

  if (userPlatform.platform === "windows") {
    fs.writeFileSync(`${__dirname}/windows_hosts_staging.txt`, newHostsUpdated);
  }

  WriteToHosts(newHostsUpdated, userData.websites, e, userPlatform);
}

export default createUpdatedHosts;
