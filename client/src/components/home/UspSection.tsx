import React, { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { Search, ClipboardList, Puzzle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const UspSection: React.FC = () => {
  const { language } = useContext(AppContext);
  
  const uspItems = [
    {
      icon: Search,
      title: 'Analyze',
      titleAr: 'تحليل',
      description: 'A magnifying glass zooms into your business\'s fractal-like core',
      descriptionAr: 'عدسة مكبرة تتعمق في جوهر عملك',
      color: '#F05454' // red
    },
    {
      icon: ClipboardList,
      title: 'Diagnose',
      titleAr: 'تشخيص',
      description: 'Pulsating pain points are extracted like splinters from your operations',
      descriptionAr: 'استخراج نقاط الألم من عملياتك بدقة',
      color: '#FFD166' // yellow
    },
    {
      icon: Puzzle,
      title: 'Customize',
      titleAr: 'تخصيص',
      description: 'Puzzle pieces rearrange into a tailored solution for your unique challenges',
      descriptionAr: 'إعادة ترتيب قطع الأحجية في حل مخصص لتحدياتك الفريدة',
      color: '#4CAF50' // green
    },
    {
      icon: Lightbulb,
      title: 'Innovate',
      titleAr: 'ابتكار',
      description: 'A lightbulb ignites, morphing your challenges into breakthrough solutions',
      descriptionAr: 'مصباح يضيء، محولًا تحدياتك إلى حلول مبتكرة',
      color: '#4E89AE' // blue
    }
  ];

  return (
    <section className="py-24 bg-black" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-space font-bold mb-6"
          >
            {language === 'en' ? 'We Solve What Others Miss' : 'نحل ما يفوت الآخرين'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            {language === 'en' 
              ? 'Our proprietary diagnostic approach uncovers hidden challenges and opportunities others overlook.'
              : 'نهجنا التشخيصي المبتكر يكشف التحديات والفرص الخفية التي يتجاهلها الآخرون.'
            }
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {uspItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, borderColor: item.color }}
              className="bg-gray-900 p-6 rounded-lg border border-gray-800 flex flex-col items-center text-center transition-colors duration-300"
            >
              <div 
                className="w-16 h-16 mb-4 flex items-center justify-center rounded-full"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
              </div>
              <h3 className="text-xl font-space font-bold mb-2">
                {language === 'en' ? item.title : item.titleAr}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === 'en' ? item.description : item.descriptionAr}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-block bg-gray-900 px-6 py-3 rounded-lg border border-gray-800">
            <span className="text-xl font-space font-bold text-red-500">90%</span>
            <span className="text-gray-300 ml-2">
              {language === 'en' 
                ? 'of hidden pain points uncovered in Phase 1'
                : 'من نقاط الألم الخفية تم اكتشافها في المرحلة الأولى'
              }
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UspSection;
