import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { TranslationKey, getTranslation } from "@/lib/translations";

export const useTranslation = () => {
  const { language } = useContext(AppContext);
  
  const t = (key: TranslationKey): string => {
    return getTranslation(key, language);
  };
  
  return { t, language };
};