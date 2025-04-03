import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { QuoteDisplay } from '@/components/QuoteDisplay';
import { AppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Users, 
  RefreshCw, 
  TrendingUp, 
  LineChart,
  BarChart4
} from 'lucide-react';

type QuoteCategory = 'leadership' | 'innovation' | 'change' | 'business' | 'success';

interface CategoryOption {
  value: QuoteCategory;
  label: string;
  labelAr: string;
  icon: JSX.Element;
  color: string;
}

export const InspirationSection: React.FC = () => {
  const { language } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState<QuoteCategory>('leadership');
  
  const categories: CategoryOption[] = [
    {
      value: 'leadership',
      label: 'Leadership',
      labelAr: 'القيادة',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      value: 'innovation',
      label: 'Innovation',
      labelAr: 'الابتكار',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'bg-yellow-600 hover:bg-yellow-700'
    },
    {
      value: 'change',
      label: 'Change',
      labelAr: 'التغيير',
      icon: <RefreshCw className="w-5 h-5" />,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      value: 'business',
      label: 'Business',
      labelAr: 'الأعمال',
      icon: <BarChart4 className="w-5 h-5" />,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      value: 'success',
      label: 'Success',
      labelAr: 'النجاح',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-red-600 hover:bg-red-700'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-950" id="inspiration">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? 'Words That Inspire Action' : 'كلمات تلهم العمل'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover insights from visionary leaders that align with our philosophy and may inspire your next big idea.' 
              : 'اكتشف رؤى من قادة مبصرين تتماشى مع فلسفتنا وقد تلهم فكرتك الكبيرة التالية.'}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {categories.map((category) => (
            <Button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className={selectedCategory === category.value ? category.color : ""}
            >
              {category.icon}
              <span className="ml-2">{language === 'en' ? category.label : category.labelAr}</span>
            </Button>
          ))}
        </div>

        <motion.div
          key={selectedCategory} // Re-animate when category changes
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <QuoteDisplay 
            category={selectedCategory}
            className="p-8 md:p-10 bg-gray-800/50 border-gray-700 shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default InspirationSection;