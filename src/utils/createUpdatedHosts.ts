import fs from "fs";
import WriteToHosts from "./WriteToHosts";

const createUpdatedHosts = () => {

    fs.copyFileSync(`${__dirname}/hosts_backup.txt`, `${__dirname}/hosts_updated.txt`)

    let hostsUpdated = fs.readFileSync(`${__dirname}/hosts_updated.txt`).toString().split("\n")

    hostsUpdated.push("127.0.0.1:5173 www.facebook.com")
    
    const newHostsUpdated = hostsUpdated.join("\n")

    // fs.writeFileSync(`${__dirname}/hosts_updated.txt`, newHostsUpdated )

    WriteToHosts(newHostsUpdated)

};

export default createUpdatedHosts;
