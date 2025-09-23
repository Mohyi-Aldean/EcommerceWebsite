import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const savedLang = localStorage.getItem("lang") || "EN";

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: savedLang,
    fallbackLng: "EN",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
