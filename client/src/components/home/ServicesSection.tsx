import React, { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { services } from '@/lib/services';
import { LucideIcon, Smile, Lightbulb, Settings, Zap, TrendingUp, Cpu, Target, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Create a mapping of icon keys to components
const iconComponents: { [key: string]: LucideIcon } = {
  smile: Smile,
  lightbulb: Lightbulb,
  settings: Settings,
  zap: Zap,
  'trending-up': TrendingUp,
  cpu: Cpu,
  target: Target,
};

const ServiceCard: React.FC<{ service: typeof services[0]; index: number }> = ({ service, index }) => {
  const { language } = useContext(AppContext);
  const IconComponent = iconComponents[service.icon];
  
  return (
    <motion.div 
      className="service-card h-[320px] perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="service-card-inner relative w-full h-full transition-transform duration-800 transform-style-preserve-3d hover:rotate-y-180">
        <div className="service-card-front absolute w-full h-full backface-hidden bg-background border border-gray-800 p-8 flex flex-col items-center justify-center text-center rounded-lg">
          <div 
            className="w-16 h-16 mb-6 flex items-center justify-center rounded-full"
            style={{ backgroundColor: `${service.color}20` }}
          >
            {IconComponent && (
              <IconComponent
                className="w-8 h-8"
                style={{ color: service.color }}
              />
            )}
          </div>
          <h3 className="text-xl font-space font-bold mb-2">
            {language === 'en' ? service.title : service.titleAr}
          </h3>
          <p className="text-gray-300">
            {language === 'en' ? service.description : service.descriptionAr}
          </p>
        </div>
        
        <div 
          className="service-card-back absolute w-full h-full backface-hidden rotate-y-180 p-8 flex flex-col items-center justify-center rounded-lg"
          style={{ 
            backgroundColor: `${service.color}10`,
            borderColor: service.color,
            borderWidth: '1px'
          }}
        >
          <h3 
            className="text-xl font-space font-bold mb-4" 
            style={{ color: service.color }}
          >
            {language === 'en' ? service.title : service.titleAr}
          </h3>
          <ul className="text-sm space-y-3 text-gray-300">
            {(language === 'en' ? service.features : service.featuresAr).map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <Check
                  className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                  style={{ color: service.color }}
                />
                {feature}
              </li>
            ))}
          </ul>
          <button 
            className="mt-6 px-4 py-2 text-sm rounded-md text-white"
            style={{ backgroundColor: service.color }}
          >
            {language === 'en' ? 'Learn More' : 'اعرف المزيد'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const { language } = useContext(AppContext);
  
  return (
    <section id="services" className="py-24 bg-gray-900" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-space font-bold mb-6"
          >
            {language === 'en' ? 'We Draw the Future Of...' : 'نرسم مستقبل...'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            {language === 'en' 
              ? 'Specialized expertise across crucial business dimensions to unlock your company\'s hidden potential.'
              : 'خبرة متخصصة عبر أبعاد الأعمال الحاسمة لإطلاق إمكانات شركتك الخفية.'
            }
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
