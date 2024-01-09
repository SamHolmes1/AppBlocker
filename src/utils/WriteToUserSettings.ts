import fs from "fs";
import { settingsObjectInterface } from "../interfaces/SettingsObject";

export const WriteToUserSettings = (
  settingsObject: settingsObjectInterface
) => {
  fs.writeFileSync(
    `${__dirname}/../src/user-settings.json`,
    JSON.stringify(settingsObject, null, 1)
  );
};
