import type { I18n } from "vue-i18n";
import type { I18nKeys, I18nParams } from "./types/TypedTranslates";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: ReturnType<I18n>["t"];
    $tt: <K extends I18nKeys>(key: K, params?: I18nParams<K>) => string;
  }
}
