import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json'; 
import translationYN from './locales/yn/translation.json';  
import translationCN from './locales/cn/translation.json' ; 

 
const resources = {
  en: {
    translation: translationEN,
  },
  yn: {
    translation: translationYN, 
  }, 
  cn: {
    translation : translationCN , 
  } , 
};

i18n
  .use(initReactI18next)  
  .init({
    resources,
    lng: 'en',  
    fallbackLng: 'en',   
    interpolation: {
      escapeValue: false,  
    },
  });

export default i18n; 
 