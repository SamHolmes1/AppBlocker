import os from "os";
import { PlatformInterface } from "../interfaces/PlatformInterface";

const fetchOperatinSystem = (): PlatformInterface => {
  const platform: PlatformInterface = {
    platform: "",
    hostsPath: "",
    endOfCommand: "",
    writeCommand: "",
    flushDNSCommand: "",
    newLineFlag: "",
    stringMarker: "",
  };
  if (os.platform() === "win32") {
    platform.platform = "windows";
    platform.hostsPath = "C:\\Windows\\System32\\Drivers\\etc\\hosts";
    platform.endOfCommand = ";";
    platform.writeCommand = "type";
    platform.flushDNSCommand = "ipconfig /flushdns";
    platform.stringMarker = "$";
    platform.newLineFlag = "\r\n";
  } else if (os.platform() === "darwin") {
    platform.platform = "Mac";
    platform.hostsPath = "/private/etc/hosts";
    platform.endOfCommand = ";";
    platform.writeCommand = "echo";
    platform.flushDNSCommand = "";
    ("dscacacheutil -flushcache; killall -HUP mDNOSResponder");
    platform.stringMarker = "";
    platform.newLineFlag = "\r";
  } else if (os.platform() === "linux") {
    platform.platform = "Linux";
    platform.hostsPath = "/etc/hosts";
    platform.endOfCommand = "|";
    platform.writeCommand = "echo";
    platform.flushDNSCommand = "resolvectl flush-caches";
    platform.stringMarker = "";
    platform.newLineFlag = "\r\n";
  } else {
    platform.platform = "";
    platform.hostsPath = "";
    platform.writeCommand = "";
    platform.flushDNSCommand = "";
    platform.newLineFlag = "";
    platform.stringMarker = "";
    platform.error = true;
  }
  return platform;
};

export default fetchOperatinSystem;
