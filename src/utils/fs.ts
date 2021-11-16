import fs from 'fs'

export const createAndWrite = (fileName: string, content: string) => {
    fs.writeFileSync(fileName, content, 'utf8');
}
export const readFile = (filePath: string) => fs.readFileSync(filePath, "utf8").toString();