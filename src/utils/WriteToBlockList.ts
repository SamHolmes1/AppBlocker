import userData from "../block-list.json";
import * as fs from "fs";

const WriteToBlockList = (input: string) => {
  if (!userData.websites.includes(input) && input.length !== 0) {
    const data = fs.readFileSync("../block-list.json");
    console.log(data);
  }
};

export default WriteToBlockList;
