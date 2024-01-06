import fs from "fs";
import WriteToHosts from "./WriteToHosts";

/**
 * A staging function that creates a new temporary host_updated file so that the contents can be copied to the users hosts file.
 * Reads from block-list.json in order to create
 * @param resetHosts
 */
function createUpdatedHosts(resetHosts?: boolean): void {
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
        hostsUpdated.push(`0.0.0.0 www.${element.URL} ${element.URL}`);
      }
    }

    const newHostsUpdated = hostsUpdated.join("\n");

    WriteToHosts(newHostsUpdated);
  }
}

export default createUpdatedHosts;
