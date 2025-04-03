import { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(AppContext);
  
  // Toggle between English and Arabic
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    
    // Apply RTL/LTR to document
    if (newLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  };

  // Set initial direction based on current language
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [language]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="px-2 text-sm"
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      {language === 'en' ? 'عربي' : 'English'}
    </Button>
  );
};

export { LanguageToggle };
export default LanguageToggle;