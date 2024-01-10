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
  };
  if (os.platform() === "win32") {
    //Windows initialization
    platform.platform = "windows";
    platform.hostsPath = "C:\\Windows\\System32\\Drivers\\etc\\hosts";
    platform.endOfCommand = ";";
    platform.writeCommand = "type";
    platform.flushDNSCommand = "ipconfig /flushdns";
    platform.newLineFlag = "\r\n";
  } else if (os.platform() === "darwin") {
    //MacOS initialization
    platform.platform = "mac";
    platform.hostsPath = "/private/etc/hosts";
    platform.endOfCommand = ";";
    platform.writeCommand = "echo";
    platform.flushDNSCommand = "";
    ("dscacacheutil -flushcache; killall -HUP mDNOSResponder");
    platform.newLineFlag = "\r";
  } else if (os.platform() === "linux") {
    //Linux initialization
    platform.platform = "linux";
    platform.hostsPath = "/etc/hosts";
    platform.endOfCommand = "|";
    platform.writeCommand = "echo";
    platform.flushDNSCommand = "resolvectl flush-caches";
    platform.newLineFlag = "\r\n";
  } else {
    //Unsupported initialization
    platform.platform = "unsupported platform";
    platform.hostsPath = "Err. No path";
    platform.writeCommand = "Err. No command";
    platform.flushDNSCommand = "Err. No command";
    platform.newLineFlag = "Err. no flag";
    platform.error = true;
  }
  return platform;
};

export default fetchOperatinSystem;
