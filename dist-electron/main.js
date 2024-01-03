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
  {
    name: "Youtube",
    URL: "www.youtube.com",
    Blocked: false
  },
  {
    name: "Facebook",
    URL: "www.facebook.com",
    Blocked: false
  },
  {
    name: "Reddit",
    URL: "www.Reddit.com",
    Blocked: false
  },
  {
    name: "Amazon",
    URL: "www.amazon.com",
    Blocked: false
  },
  {
    name: "Netflix",
    URL: "www.netflix.com",
    Blocked: false
  },
  {
    name: "Bet365",
    URL: "www.bet365.com",
    Blocked: false
  },
  {
    name: "hellio",
    URL: "hellio",
    Blocked: false
  },
  {
    name: "whatwasthat",
    URL: "whatwasthat",
    Blocked: false
  },
  {
    name: "are you okay now?",
    URL: "are you okay now?",
    Blocked: false
  },
  {
    name: "dsasda",
    URL: "dsasda",
    Blocked: false
  },
  {
    name: "dsadsa",
    URL: "dsadsa",
    Blocked: false
  },
  {
    name: "hello",
    URL: "hello",
    Blocked: false
  }
];
const userData = {
  websites
};
const WriteToBlockList = (input) => {
  const alreadyExists = userData.websites.find((website) => input === website.URL);
  if (!alreadyExists && input.length !== 0) {
    const data = fs__namespace.readFileSync(`${__dirname}/../src/block-list.json`);
    const parsedData = JSON.parse(data.toString());
    parsedData.websites.push({ name: input, URL: input, Blocked: false });
    console.log(parsedData);
    fs__namespace.writeFile(`${__dirname}/../src/block-list.json`, JSON.stringify(parsedData), () => {
    });
  }
};
const ReadBlockList = () => {
  const data = fs__namespace.readFileSync(`${__dirname}/../src/block-list.json`);
  const parsedData = JSON.parse(data.toString());
  return parsedData;
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
  electron.ipcMain.on("readBlockList", (e) => {
    const output = ReadBlockList();
    console.log(output);
    e.sender.send("blockListOutput", output);
  });
  createWindow();
});
