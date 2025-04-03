import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Quote, getRandomQuote, getQuoteByUserType } from '@/lib/quotes';
import { AppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface QuoteDisplayProps {
  category?: 'leadership' | 'innovation' | 'change' | 'business' | 'success';
  className?: string;
  showRefreshButton?: boolean;
  refreshInterval?: number | null;
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({
  category,
  className = '',
  showRefreshButton = true,
  refreshInterval = null,
}) => {
  const { userType, language } = useContext(AppContext);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to get a new quote
  const refreshQuote = () => {
    setIsRefreshing(true);
    
    // Choose the quote selection method based on whether a category is provided
    const newQuote = category 
      ? getRandomQuote(category) 
      : getQuoteByUserType(userType);
    
    setQuote(newQuote);
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  // Initial quote load
  useEffect(() => {
    refreshQuote();
  }, [category, userType]);

  // Set up automatic refresh if interval is provided
  useEffect(() => {
    if (!refreshInterval) return;
    
    const intervalId = setInterval(() => {
      refreshQuote();
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border ${className}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <motion.blockquote
        key={quote.id} // Key helps React identify when to animate
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <p className={`text-lg md:text-xl font-serif italic text-foreground ${className.includes('text-sm') ? 'text-sm md:text-base' : ''}`}>
          {language === 'en' ? `"${quote.text}"` : `"${quote.textAr}"`}
        </p>
        <footer className={`mt-2 text-sm text-muted-foreground ${className.includes('text-sm') ? 'text-xs' : ''}`}>
          {language === 'en' ? `— ${quote.author}` : `— ${quote.authorAr}`}
        </footer>
      </motion.blockquote>
      
      {showRefreshButton && (
        <motion.div 
          className={`absolute bottom-4 ${language === 'ar' ? 'left-4' : 'right-4'}`}
          animate={{ rotate: isRefreshing ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={refreshQuote}
            title={language === 'en' ? 'Get another quote' : 'احصل على اقتباس آخر'}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};