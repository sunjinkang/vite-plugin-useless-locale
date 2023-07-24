"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => vitePluginUselessLocale
});
module.exports = __toCommonJS(src_exports);
function vitePluginUselessLocale(params) {
  return {
    // 插件名称
    name: "vite-plugin-useless-locale",
    // pre 会较于 post 先执行
    enforce: "post",
    // post
    // 指明它们仅在 'build' 或 'serve' 模式时调用
    apply: "serve",
    // apply 亦可以是一个函数
    transform(code, id, options) {
      const useReactI18 = /react-i18next.*/g;
      const useI18n = /i18next.*/g;
      if (!useReactI18.test(code) || !useI18n.test(code) || !/i18n.*/g.test(code))
        return code;
    }
  };
}
