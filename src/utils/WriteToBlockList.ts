import * as fs from "fs";

interface websiteData {
  name: string;
  URL: string;
  Blocked: boolean;
}

const WriteToBlockList = (
  inputName: string,
  inputURL: string = `${inputName.toLowerCase()}`,
  inputLogoUrl: string = `https://${inputURL}.com/favicon.ico`,
  selectedToBlock: boolean = true,
  blocked: boolean = false
) => {
  const reg = /(www.)|(.com)|(.co.uk)|(.tv)/
  const siteUrl = inputURL.replace(reg, '')
  const data = fs.readFileSync(`${__dirname}/../src/block-list.json`);
  const alreadyExists = JSON.parse(data.toString()).websites.find(
    (website: websiteData) => siteUrl.toLowerCase() === website.URL.toLowerCase() || inputName.toLowerCase() === website.name.toLowerCase() || inputName.toLowerCase() === website.URL.toLowerCase()
  );
  if (!alreadyExists && inputName.length !== 0) {
    const parsedData = JSON.parse(data.toString());

    

    parsedData.websites.push({
      name: inputName,
      URL: siteUrl,
      selectedToBlock: selectedToBlock,
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
      if (element.name === inputName && !element.selectedToBlock) {
        element.selectedToBlock = true;
      } else if (element.name === inputName && element.selectedToBlock) {
        element.selectedToBlock = false;
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
