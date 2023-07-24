import { PluginOption } from 'vite';

type VitePluginUselessLocaleType = {
    localePath: string;
};
declare function vitePluginUselessLocale(params: VitePluginUselessLocaleType): PluginOption;

export { vitePluginUselessLocale as default };
