const fs = require('fs');
const path = require('path');

export const getPath = (originPath: string) =>
  path.resolve(__dirname, originPath);

export const getFilePath = (dir: string, allFile: string[]) => {
  const dirFiles = fs.readdirSync(dir);
  dirFiles.forEach((item: string) => {
    const filePath = path.join(dir, item);
    const current = fs.statSync(filePath);
    if (current.isDirectory() === true) {
      getFilePath(filePath, allFile);
    }
    if (current.isFile() === true) {
      allFile.push(filePath);
    }
  });
};
