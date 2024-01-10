import { app, BrowserWindow } from "electron";
import path from "node:path";
import { ipcMain } from "electron";
import WriteToBlockList from "../src/utils/WriteToBlockList";
import ReadBlockList from "../src/utils/ReadBlockList";
import BackupHosts from "../src/utils/BackupHosts";
import deleteFromFile from "../src/utils/deleteFromBlocklist";
import fs from "fs";
import { settingsObjectInterface } from "../src/interfaces/SettingsObject";
import { WriteToUserSettings } from "../src/utils/WriteToUserSettings";
import fetchOperatinSystem from "../src/utils/fetchOperatingSystem";
import { PlatformInterface } from "../src/interfaces/PlatformInterface";
import createUpdatedHosts from "../src/utils/CreateUpdatedHosts";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │

//Create The userPlatform Object for platform specific functionality
const userPlatform: PlatformInterface = fetchOperatinSystem();
console.log(userPlatform);

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

  ipcMain.on("updateHosts", (e) => {
    createUpdatedHosts(e, userPlatform);
  });

  ipcMain.on("delete from file", (e, siteName: string) => {
    deleteFromFile(siteName);
    e.sender.send("writtenToBlockList", true);
  });

  ipcMain.on("updateSelectedToBlock", (e) => {
    const currentBlockList = JSON.parse(
      fs.readFileSync(`${__dirname}/../src/block-list.json`).toString()
    );

    for (let i = 0; i < currentBlockList.websites.length; i++) {
      currentBlockList.websites[i].selectedToBlock = false;
    }

    fs.writeFileSync(
      `${__dirname}/../src/block-list.json`,
      JSON.stringify(currentBlockList, null, 1)
    );

    e.sender.send("writtenToBlockList", true);
  });

  ipcMain.on("writeToUserSettings", (_e, data: settingsObjectInterface) => {
    WriteToUserSettings(data);
  });

  ipcMain.on("readUserSettingsJson", (e, data) => {
    const userSettingsJson = JSON.parse(
      fs.readFileSync(`${__dirname}/../src/user-settings.json`).toString()
    );
    e.sender.send("userSettingsOutput", userSettingsJson);
  });

  BackupHosts(userPlatform.hostsPath);
  createWindow();
});
