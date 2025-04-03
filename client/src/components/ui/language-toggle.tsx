import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { languageTransition } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(AppContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  
  // Toggle between English and Arabic with animation
  const toggleLanguage = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    setIsAnimating(true);
    const newLang = language === 'en' ? 'ar' : 'en';
    const direction = newLang === 'ar' ? 'rtl' : 'ltr';
    
    // Show toast notification
    toast({
      title: newLang === 'ar' ? 'جاري تغيير اللغة...' : 'Changing language...',
      description: newLang === 'ar' 
        ? 'تحويل الواجهة إلى اللغة العربية' 
        : 'Switching interface to English',
      duration: 3000,
    });
    
    // Get the main content container for animations
    const mainContainer = document.querySelector('main') || document.body;
    
    // Start the animation
    const timeline = languageTransition(mainContainer as HTMLElement, direction);
    
    // Change the language in the middle of the animation
    timeline.eventCallback("onUpdate", () => {
      const progress = timeline.progress();
      if (progress >= 0.5 && language !== newLang) {
        setLanguage(newLang);
        
        // Apply RTL/LTR to document
        if (newLang === 'ar') {
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = 'ar';
        } else {
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = 'en';
        }
      }
    });
    
    // Reset animation state when complete
    timeline.eventCallback("onComplete", () => {
      setIsAnimating(false);
      
      // Show completion toast
      toast({
        title: newLang === 'ar' ? 'تم تغيير اللغة' : 'Language changed',
        description: newLang === 'ar' 
          ? 'تم تحويل الواجهة إلى اللغة العربية بنجاح' 
          : 'Interface successfully switched to English',
        duration: 2000,
      });
    });
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
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={`px-2 text-sm transition-all duration-300 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      disabled={isAnimating}
    >
      {language === 'en' ? 'عربي' : 'English'}
    </Button>
  );
};

export { LanguageToggle };
export default LanguageToggle;