import { Dictionary, I18nKey } from '../typing/common.type';
import ch from './ch-language';
import en from './en-language';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

enum SupportLanguage {
  zhCN = 'zh-CN',
  enUS = 'en-US',
}

i18n.use(initReactI18next).init({
  lng: 'zh',
  resources: {
    [SupportLanguage.zhCN]: ch,
    [SupportLanguage.enUS]: en,
  },
  fallbackLng: SupportLanguage.zhCN,
  interpolation: {
    escapeValue: false,
  },
});

const translation = (key: I18nKey, dic?: Dictionary) => {
  return i18n.t(key, dic);
};

export { SupportLanguage, translation };
export default i18n;
