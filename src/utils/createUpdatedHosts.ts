import fs from "fs";
import WriteToHosts from "./WriteToHosts";

const createUpdatedHosts = (resetHosts?: boolean) => {
  const topLevelDomains = ["com", "co.uk", "tv"]

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
    .split("\n");

  if (resetHosts) {
    WriteToHosts(hostsUpdated.join("\n"));
  } else {
    hostsUpdated.push("#Created by AppBlocker\n");

    for (let element of userData.websites) {
      if (element.Blocked) {
        let hostsNewLine = "0.0.0.0"
          for(let i=0; i<topLevelDomains.length; i++){
            hostsNewLine += ` ${element.URL}.${topLevelDomains[i]}`
            hostsNewLine += ` www.${element.URL}.${topLevelDomains[i]}`
          }
        hostsUpdated.push(hostsNewLine)
      }
    }

    const newHostsUpdated = hostsUpdated.join("\n");

    WriteToHosts(newHostsUpdated);
  }
};

export default createUpdatedHosts;
