// const fs = window.require("fs")
import * as fs from "fs";

interface websiteData {
  name: string,
  URL: string,
  Blocked: boolean
}

const WriteToBlockList = (input: string) => {
  const data = fs.readFileSync(`${__dirname}/../src/block-list.json`);
  const alreadyExists = JSON.parse(data.toString()).websites.find(
    (website: websiteData) => input === website.URL
  );
  if (!alreadyExists && input.length !== 0) {
    const parsedData = JSON.parse(data.toString());

    parsedData.websites.push({ name: input, URL: input, Blocked: false });
    fs.writeFile(
      `${__dirname}/../src/block-list.json`,
      JSON.stringify(parsedData, null, 1),
      () => {}
    );
  }
};

export default WriteToBlockList;
