import fs from "fs";

/**
 * Creates a back up of the users host file in the local folder.
 * @param path - The path to the users Hosts file
 */
function BackupHosts(path: string): void {
  path = "/etc/hosts";

  if (!fs.existsSync(`${__dirname}/hosts_backup.txt`)) {
    fs.copyFile(path, `${__dirname}/hosts_backup.txt`, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}

export default BackupHosts;
