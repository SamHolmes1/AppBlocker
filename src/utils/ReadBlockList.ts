import userData from "../block-list.json";
// const fs = window.require("fs")
import * as fs from "fs";


const ReadBlockList = () => {


    const data = fs.readFileSync(`${__dirname}/../src/block-list.json`);
    const parsedData = JSON.parse(data.toString())
    
    return parsedData

  };

export default ReadBlockList;
