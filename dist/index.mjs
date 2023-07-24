// src/index.ts
function vitePluginUselessLocale() {
  return {
    // 插件名称
    name: "vite-plugin-useless-locale",
    // pre 会较于 post 先执行
    enforce: "post",
    // post
    // 指明它们仅在 'build' 或 'serve' 模式时调用
    apply: "build",
    // apply 亦可以是一个函数
    transform(code, id, options) {
      console.log(code);
    }
  };
}
export {
  vitePluginUselessLocale as default
};
