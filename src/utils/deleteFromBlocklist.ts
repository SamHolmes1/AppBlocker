import ReadBlockList from "./ReadBlockList"
import fs from "fs"

interface website {
    name: string,
    URL: string,
    Blocked: boolean,
    logoUrl: string
   }

const deleteFromFile = (siteName: string) => {
    let data = ReadBlockList()
    const newData = data.websites.filter((website: website) => {
        console.log(website)
        return website.name !== siteName

    })
    console.log(newData)
    fs.writeFile(
        `${__dirname}/../src/block-list.json`,
        JSON.stringify({websites: newData}, null, 1),
        () => {}
      );

}

export default deleteFromFile