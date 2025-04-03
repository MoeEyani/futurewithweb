import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { QuoteDisplay } from '@/components/QuoteDisplay';
import { AppContext } from '@/context/AppContext';

interface QuoteBannerProps {
  className?: string;
}

export const QuoteBanner: React.FC<QuoteBannerProps> = ({ className = '' }) => {
  const { language } = useContext(AppContext);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`w-full bg-gradient-to-r from-blue-900/80 to-indigo-900/80 text-white py-3 px-4 md:px-6 ${className}`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-8 bg-yellow-400 rounded-full"></div>
            <p className="font-semibold text-sm md:text-base">
              {language === 'en' ? 'Inspiration' : 'إلهام'}
            </p>
          </div>
          
          <div className="flex-1 mx-4 lg:mx-8">
            <QuoteDisplay 
              refreshInterval={30000} 
              showRefreshButton={false} 
              className="bg-transparent border-none p-0 m-0" 
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuoteBanner;