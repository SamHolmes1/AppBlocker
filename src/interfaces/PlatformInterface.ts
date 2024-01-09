export interface PlatformInterface {
  platform: string;
  hostsPath: string;
  endOfCommand: string;
  writeCommand: string;
  flushDNSCommand: string;
  newLineFlag: string;
  stringMarker: string;
  error?: boolean;
}
