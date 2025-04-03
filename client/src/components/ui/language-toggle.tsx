import React, { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { language, setLanguage } = useContext(AppContext);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  return (
    <div className={`flex items-center ${language === 'ar' ? 'space-x-2 space-x-reverse' : 'space-x-2'} ${className}`} dir="ltr">
      <span className="text-sm font-medium">EN</span>
      <Switch
        checked={language === 'ar'}
        onCheckedChange={toggleLanguage}
        aria-label="Toggle language"
      />
      <span className="text-sm font-medium">AR</span>
    </div>
  );
};

export default LanguageToggle;
