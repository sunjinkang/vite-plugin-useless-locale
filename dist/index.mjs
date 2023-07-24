// src/index.ts
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
export {
  vitePluginUselessLocale as default
};
