import { app, BrowserWindow } from "electron";
import path from "node:path";
import { ipcMain } from "electron";
import WriteToBlockList from "../src/utils/WriteToBlockList";
import ReadBlockList from "../src/utils/ReadBlockList";
import BackupHosts from "../src/utils/BackupHosts";
import createUpdatedHosts from "../src/utils/createUpdatedHosts";
import deleteFromFile from "../src/utils/deleteFromBlocklist";
import sudo from "sudo-prompt";
import { siteData } from "../src/interfaces/SiteData";
import fs from "fs";
import { settingsObjectInterface } from "../src/interfaces/SettingsObject";
import { WriteToUserSettings } from "../src/utils/WriteToUserSettings";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    resizable: false,
    height: 800,
    width: 1280,
    autoHideMenuBar: true,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setContentSize(1280, 800);

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  ipcMain.on("writeToBlockList", (e, website: string) => {
    WriteToBlockList(website);
    e.sender.send("writtenToBlockList", true);
  });
  ipcMain.on("readBlockList", (e) => {
    const output = ReadBlockList();
    e.sender.send("blockListOutput", output);
  });
  ipcMain.on("updateHosts", (e, ...args) => {
    createUpdatedHosts(args[0]);

    function createUpdatedHosts(resetHosts?: boolean): void {
      const WriteToHosts = (
        updatedHosts: string,
        userData: Array<siteData>
      ) => {
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
            } else {
              const updatedBlockList = userData.map((site) => {
                site.Blocked = site.selectedToBlock;
                return site;
              });
              const updatedBlockListJSON = JSON.stringify(
                { websites: updatedBlockList },
                null,
                1
              );
              fs.writeFileSync(
                `${__dirname}/../src/block-list.json`,
                updatedBlockListJSON
              );
              e.sender.send("writtenToBlockList", true);
            }
          }
        );
      };

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
        .split("\n");

      if (resetHosts) {
        // WriteToHosts(hostsUpdated.join("\n"));
      } else {
        hostsUpdated.push("#Created by AppBlocker\n");

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

        const newHostsUpdated = hostsUpdated.join("\n");

        WriteToHosts(newHostsUpdated, userData.websites);
      }
    }
  });
  ipcMain.on("delete from file", (e, siteName: string) => {
    deleteFromFile(siteName);
    e.sender.send("writtenToBlockList", true);
  });
<<<<<<< HEAD
  ipcMain.on("updateSelectedToBlock", (e) => {
    const currentBlockList = JSON.parse(fs.readFileSync(`${__dirname}/../src/block-list.json`).toString())
    for(let i=0; i<currentBlockList.websites.length; i++){
      currentBlockList.websites[i].selectedToBlock = false
    }
    fs.writeFileSync(`${__dirname}/../src/block-list.json`, JSON.stringify(currentBlockList, null, 1))
    e.sender.send("writtenToBlockList", true)
  })
=======

  ipcMain.on("writeToUserSettings", (_e, data: settingsObjectInterface) => {
    WriteToUserSettings(data);
  });

  ipcMain.on("readUserSettingsJson", (e, data) => {
    const userSettingsJson = JSON.parse(
      fs.readFileSync(`${__dirname}/../src/user-settings.json`).toString()
    );
    e.sender.send("userSettingsOutput", userSettingsJson);
  });

>>>>>>> 02faec1e5d7372d07379ddcfea0007de99d8b9e1
  BackupHosts("");
  createWindow();
});
