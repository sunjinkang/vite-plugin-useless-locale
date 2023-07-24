import type { PluginOption } from 'vite';
import { VitePluginUselessLocaleType } from './index.d';
import { transformKeys } from './transformKeys';

export default function vitePluginUselessLocale(
  params: VitePluginUselessLocaleType,
): PluginOption {
  return {
    name: 'vite-plugin-useless-locale',

    enforce: 'pre', // post | pre

    apply: 'serve', // build | serve

    transform(code, id, options) {
      const useReactI18 = /react-i18next.*/g;
      const useI18n = /i18next.*/g;
      if (
        !useReactI18.test(code) ||
        !useI18n.test(code) ||
        !/i18n.*/g.test(code)
      )
        return code;
      transformKeys(params?.localePath, params?.fileSuffix);
    },
  };
}
