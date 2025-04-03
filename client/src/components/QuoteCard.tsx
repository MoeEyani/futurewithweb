import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Quote } from '@/lib/quotes';
import { AppContext } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteDisplay } from '@/components/QuoteDisplay';

interface QuoteCardProps {
  quote?: Quote;
  category?: 'leadership' | 'innovation' | 'change' | 'business' | 'success';
  className?: string;
  showRefreshButton?: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  category,
  className = '',
  showRefreshButton = true,
}) => {
  const { language } = useContext(AppContext);
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="relative">
          {/* Decorative element */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 via-yellow-500 to-green-500"></div>
          
          {/* Quote content */}
          <div className="p-6 pl-8">
            {quote ? (
              <div className="mb-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <p className="text-lg md:text-xl font-serif italic">
                  "{language === 'en' ? quote.text : quote.textAr}"
                </p>
                <footer className="mt-2 text-sm text-muted-foreground">
                  — <cite>{language === 'en' ? quote.author : quote.authorAr}</cite>
                </footer>
              </div>
            ) : (
              <QuoteDisplay 
                category={category}
                showRefreshButton={showRefreshButton}
                className="bg-transparent border-none p-0"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;