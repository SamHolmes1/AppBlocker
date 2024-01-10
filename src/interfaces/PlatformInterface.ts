export interface PlatformInterface {
  platform: string;
  hostsPath: string;
  endOfCommand: string;
  writeCommand: string;
  flushDNSCommand: string;
  newLineFlag: string;
  error?: boolean;
}
