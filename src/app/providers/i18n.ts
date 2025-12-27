import { createI18n } from "vue-i18n";
import { translates } from "../translates";
import type { App } from "vue";
import type { TT } from "@/types/TypedTranslates";

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem("app-language") || "uk",
  fallbackLocale: "en",
  availableLocales: ["en", "uk"],
  messages: translates,
});

export const tt: TT = ((key, params) =>
  i18n.global.t(key as string, params as any)) as TT;

export const installTypedI18n = (app: App) => {
  app.config.globalProperties.$tt = tt;
};
