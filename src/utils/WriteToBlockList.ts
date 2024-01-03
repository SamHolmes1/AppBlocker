import userData from "../block-list.json";
// const fs = window.require("fs")
import * as fs from "fs";


const WriteToBlockList = (input: string) => {
  // console.log(userData.websites)
  // console.log("Site exists")

  if (!userData.websites.includes(input) && input.length !== 0) {
    // console.log("1234")
    const data = fs.readFileSync(`${__dirname}/../src/block-list.json`);
    const parsedData = JSON.parse(data.toString())
    console.log(parsedData);
    // console.log( JSON.stringify(data));
  }
};

export default WriteToBlockList;
