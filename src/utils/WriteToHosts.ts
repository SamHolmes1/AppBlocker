import fs from "fs"
import sudo from "sudo-prompt"

const WriteToHosts = (updatedHosts: string) => {
    const options = {
          name: 'Electron',
          icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
        }

    const path = "/etc/hosts"

        sudo.exec(`echo "${updatedHosts}" | cat > /etc/hosts`, options,
  function(error, stdout, stderr) {
    if (error) throw error;
    console.log('stdout: ' + stdout);
  }
);

}

export default WriteToHosts



// var sudo = require('sudo-prompt');
// var options = {
//   name: 'Electron',
//   icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
// };
// sudo.exec('echo hello', options,
//   function(error, stdout, stderr) {
//     if (error) throw error;
//     console.log('stdout: ' + stdout);
//   }
// );