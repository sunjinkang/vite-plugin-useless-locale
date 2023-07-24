import { readFile, writeFile } from './ReadAndWriteLocaleData';

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');

let keysData: { [key: string]: string[] } = {};
let currentFileKeys: string[] = [];

const getAllParentPath = (path, pathArray) => {
  let key = path.node.key?.name ? path.node.key?.name : path.node.key?.value;
  // 部分语言包中存在数组结构数据
  if (!!key && path?.parentPath?.parentPath?.type === 'ArrayExpression') {
    key = `${path?.parentPath?.key}.${key}`;
  }
  if (path.node.type !== 'ExportDefaultDeclaration') {
    if (key) {
      pathArray.unshift(key);
    }
    getAllParentPath(path.parentPath, pathArray);
  } else {
    return;
  }
};

const getKeysData = (pa, currentKey, name) => {
  if (Object.keys(keysData).includes(currentKey)) {
    getAllParentPath(pa, keysData[currentKey]);
    keysData[currentKey].unshift(name);
    currentFileKeys.push(keysData[currentKey].join('.'));
  }
};

const getKeysByAst = (code, fileName) => {
  traverse.default(code, {
    Property(pa) {
      if (pa.node.value.type === 'StringLiteral' && pa.node.key.name) {
        const currentKey = `${pa.node.loc?.start?.line}-${pa.node.key.name}`;
        keysData[currentKey] = [];
      }
    },
    StringLiteral(pa) {
      const parentNodeKey = pa?.parentPath?.node?.key;
      if (
        parentNodeKey?.value &&
        pa.parentPath?.parentPath.parentPath.node.type ===
          'ExportDefaultDeclaration'
      ) {
        const currentKey = `${parentNodeKey?.loc?.start?.line}-${parentNodeKey?.value}`;
        keysData[currentKey] = [];
        getKeysData(pa, currentKey, fileName);
      }
    },
    Identifier(pa) {
      const childrenNode = pa?.parentPath?.node?.value?.properties;
      const hasStringKeys = childrenNode?.filter(
        (item) =>
          item.key.type === 'StringLiteral' &&
          item.value.type === 'StringLiteral',
      );
      if (hasStringKeys && hasStringKeys.length) {
        let childrenKeys = '';
        hasStringKeys.forEach((item) => {
          childrenKeys = `${item?.loc?.start?.line}-${item?.key?.value}`;
          keysData[childrenKeys] = [item?.key?.value];
          getKeysData(pa, childrenKeys, fileName);
        });
      }
      if (pa.node.name) {
        const currentKey = `${pa.node.loc?.start?.line}-${pa.node.name}`;
        getKeysData(pa, currentKey, fileName);
      }
    },
  });
};

const getFileLocaleDataByFileName = (fileName, fileSuffix) => {
  const fileContent = fs.readFileSync(fileName).toString();
  keysData = {};
  currentFileKeys = [];
  const code = parser.parse(fileContent, {
    sourceType: 'module',
  });

  getKeysByAst(code, !!fileSuffix ? `${fileName}${fileSuffix}` : fileName);
  const localeData = readFile();
  writeFile({ sheet: [...localeData, [...currentFileKeys]] });
};

const getDirAllFile = (dir) => {
  const allFile = [];
  getFilePath(dir, allFile);
  return allFile;
};

const getFilePath = (dir, allFile) => {
  const dirFiles = fs.readdirSync(dir);
  dirFiles.forEach((item) => {
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

export const transformKeys = (directory: string, fileSuffix?: string) => {
  const localeDir = path.resolve(__dirname, directory);

  const localeFilePath: string[] = getDirAllFile(localeDir);
  localeFilePath.forEach((item) =>
    getFileLocaleDataByFileName(item, fileSuffix),
  );
};
