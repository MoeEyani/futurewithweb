import React, { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  variant?: 'switch' | 'button';
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  className = '', 
  variant = 'switch' 
}) => {
  const { language, setLanguage } = useContext(AppContext);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
  };

  if (variant === 'button') {
    return (
      <motion.button
        onClick={toggleLanguage}
        className={`flex items-center gap-2 bg-blue-600/80 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4" />
        <AnimatePresence mode="wait">
          <motion.span
            key={language}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="font-medium text-sm"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    );
  }

  // Default switch variant
  return (
    <div className={`flex items-center ${language === 'ar' ? 'space-x-2 space-x-reverse' : 'space-x-2'} ${className}`} dir="ltr">
      <AnimatePresence mode="wait">
        <motion.span 
          key={`en-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: language === 'en' ? 1 : 0.6 }}
          className={`text-sm font-medium transition-all ${language === 'en' ? 'text-white' : 'text-gray-400'}`}
        >
          EN
        </motion.span>
      </AnimatePresence>
      
      <Switch
        checked={language === 'ar'}
        onCheckedChange={toggleLanguage}
        aria-label="Toggle language"
      />
      
      <AnimatePresence mode="wait">
        <motion.span 
          key={`ar-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: language === 'ar' ? 1 : 0.6 }}
          className={`text-sm font-medium transition-all ${language === 'ar' ? 'text-white' : 'text-gray-400'}`}
        >
          AR
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default LanguageToggle;
