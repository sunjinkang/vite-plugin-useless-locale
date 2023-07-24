import { WriteFileSheetType, ReadFileType } from './index.d';

const xlsx = require('node-xlsx');
const fs = require('fs');

const defaultFileName = 'localeKeys.csv';

export const readFile = (params?: ReadFileType) => {
  try {
    var tableData = xlsx.parse(params?.fileName ?? defaultFileName);
    const item = tableData[0].data;
    return item;
  } catch (e: any) {
    console.log('excel read error,error info=%s', e.stack);
  }
};

export const writeFile = async (params: WriteFileSheetType) => {
  const buffer = await xlsx.build(params.sheet);
  await fs.stat(params?.fileName ?? defaultFileName, function (err, result) {
    if (!result) {
      fs.writeFileSync(params?.fileName ?? defaultFileName, buffer);
      return false;
    }
    fs.unlink(params?.fileName ?? defaultFileName, (unErr) => {
      if (!unErr) {
        fs.writeFileSync(params?.fileName ?? defaultFileName, buffer);
      }
    });
  });
};
