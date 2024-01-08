import sudo from "sudo-prompt";

const WriteToHosts = (updatedHosts: string) => {
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
      }
    }
  );
};

export default WriteToHosts;
