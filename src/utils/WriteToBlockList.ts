// const fs = window.require("fs")
import * as fs from "fs";

interface websiteData {
  name: string;
  URL: string;
  Blocked: boolean;
}

const WriteToBlockList = (
  inputName: string,
  inputURL: string = `${inputName.toLowerCase()}.com`,
  inputLogoUrl: string = `https://${inputURL}/favicon.ico`,
  blocked: boolean = true
) => {
  const data = fs.readFileSync(`${__dirname}/../src/block-list.json`);
  const alreadyExists = JSON.parse(data.toString()).websites.find(
    (website: websiteData) => inputURL === website.URL
  );
  if (!alreadyExists && inputName.length !== 0) {
    const parsedData = JSON.parse(data.toString());

    parsedData.websites.push({
      name: inputName,
      URL: inputURL,
      Blocked: blocked,
      logoUrl: inputLogoUrl,
    });
    fs.writeFile(
      `${__dirname}/../src/block-list.json`,
      JSON.stringify(parsedData, null, 1),
      () => {}
    );
  } else if (alreadyExists && inputName.length !== 0) {
    const parsedData = JSON.parse(data.toString());
    for (let element of parsedData.websites) {
      if (element.name === inputName && !element.Blocked) {
        element.Blocked = true;
      } else if (element.name === inputName && element.Blocked) {
        element.Blocked = false;
      }
    }
    fs.writeFile(
      `${__dirname}/../src/block-list.json`,
      JSON.stringify(parsedData, null, 1),
      () => {}
    );
  }
};

export default WriteToBlockList;
