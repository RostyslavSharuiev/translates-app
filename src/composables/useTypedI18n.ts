import { tt } from "@/app/providers/i18n";
import { useI18n } from "vue-i18n";

export const useTypedI18n = () => {
  const defaultI18n = useI18n();

  return { tt, ...defaultI18n };
};
