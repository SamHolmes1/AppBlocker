import fs from "fs";
import WriteToHosts from "./WriteToHosts";

const createUpdatedHosts = (resetHosts?: boolean) => {
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
        hostsUpdated.push(`0.0.0.0 www.${element.URL}.com ${element.URL}.com www.${element.URL}.co.uk ${element.URL}.co.uk`);
      }
    }

    const newHostsUpdated = hostsUpdated.join("\n");

    WriteToHosts(newHostsUpdated);
  }
};

export default createUpdatedHosts;
