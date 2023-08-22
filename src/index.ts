import type { PluginOption } from 'vite';
import { VitePluginUselessLocaleType } from './index.d';

const vitePluginUselessLocale = (
  params: VitePluginUselessLocaleType,
): PluginOption => {
  return {
    name: 'vite-plugin-useless-locale',

    enforce: 'pre', // post | pre

    apply: 'build', // build | serve

    transform(code, id, options) {
      return code.replaceAll(params.pattern, params?.replaceValue ?? '');
    },
  };
};

export default vitePluginUselessLocale;
