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
    setLanguage(language === 'en' ? 'ar' : 'en');
    document.documentElement.dir = language === 'en' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'en' ? 'ar' : 'en';
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
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
