import fs from "fs";

const BackupHosts = (path: string) => {
  path = "/etc/hosts";

  if (!fs.existsSync(`${__dirname}/hosts_backup.txt`)) {
    fs.copyFile(path, `${__dirname}/hosts_backup.txt`, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
};

export default BackupHosts;
