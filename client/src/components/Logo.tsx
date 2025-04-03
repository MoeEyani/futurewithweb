import React, { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import logoImage from '@assets/Future with (Final Logo) transparent background with slogan-01.png';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  darkMode?: boolean;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  withText = false, 
  darkMode = true,
  animated = false 
}) => {
  const { language } = useContext(AppContext);
  
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-14 w-auto',
  };
  
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const imageComponent = (
    <img 
      src={logoImage} 
      alt="Future With Logo" 
      className={`${sizeClasses[size]} object-contain ${language === 'ar' ? 'order-last' : ''}`}
    />
  );

  const textComponent = withText && (
    <div 
      className={`font-space font-bold ${darkMode ? 'text-white' : 'text-gray-900'} ${textSizeClasses[size]} flex-shrink-0`}
    >
      {language === 'en' ? 'Future With' : 'المستقبل معنا'}
    </div>
  );

  if (animated) {
    return (
      <motion.div 
        className={`inline-flex items-center gap-3 ${className} ${language === 'ar' ? 'flex-row-reverse' : ''}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div className="flex-shrink-0">
          {imageComponent}
        </motion.div>
        
        {withText && (
          <motion.div 
            className={`font-space font-bold ${darkMode ? 'text-white' : 'text-gray-900'} ${textSizeClasses[size]} flex-shrink-0`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {language === 'en' ? 'Future With' : 'المستقبل معنا'}
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className} ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
      <div className="flex-shrink-0">
        {imageComponent}
      </div>
      {textComponent}
    </div>
  );
};

export default Logo;
