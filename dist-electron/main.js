"use strict";
const electron = require("electron");
const path = require("node:path");
const fs = require("fs");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
const websites = [
  "www.youtube.com",
  "www.facebook.com",
  "www.instagram.com",
  "www.tiktok.com",
  "www.discord.com",
  "www.reddit.com",
  "www.netflix.com",
  "www.twitter.com",
  "www.amazon.com",
  "www.ebay.com"
];
const blocked = [];
const userData = {
  websites,
  blocked
};
const WriteToBlockList = (input) => {
  if (!userData.websites.includes(input) && input.length !== 0) {
    const data = fs__namespace.readFileSync(`${__dirname}/../src/block-list.json`);
    const parsedData = JSON.parse(data.toString());
    console.log(parsedData);
  }
};
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let win;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
  win = new electron.BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
    win = null;
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
electron.app.whenReady().then(() => {
  electron.ipcMain.on("writeToBlockList", (e, website) => {
    WriteToBlockList(website);
  });
  createWindow();
});
