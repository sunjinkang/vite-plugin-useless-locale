export type SheetType = {
  name: string;
  data: Array<Array<any>>;
};

export type WriteFileSheetType = {
  fileName?: string;
  sheet: Array<SheetType>;
};

export type ReadFileType = {
  fileName?: string;
};

export type VitePluginUselessLocaleType = {
  localePath: string;
  fileSuffix?: string;
};
