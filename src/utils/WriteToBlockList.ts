import userData from "../block-list.json";
// const fs = window.require("fs")
import * as fs from "fs";


const WriteToBlockList = (input: string) => {
  // console.log(userData.websites)
  // console.log("Site exists")
  const alreadyExists = userData.websites.find(website => input === website.URL)
  if ( !alreadyExists && input.length !== 0) {
    // console.log("1234")
    const data = fs.readFileSync(`${__dirname}/../src/block-list.json`);
    const parsedData = JSON.parse(data.toString())
    
    parsedData.websites.push({name: input, URL: input, Blocked: false})
    console.log(parsedData);
    fs.writeFile(`${__dirname}/../src/block-list.json`, JSON.stringify(parsedData),() => {}) 

  }
};

export default WriteToBlockList;
