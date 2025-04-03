import React, { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import ParticleBackground from '../ParticleBackground';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { language } = useContext(AppContext);
  
  const scrollToNextSection = () => {
    // Smoothly scroll to the services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <div 
        className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full text-center mt-16 md:mt-24"
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-space font-bold mb-6 leading-tight"
        >
          {language === 'en' ? (
            <>Change Your Business<br/> Future With Us</>
          ) : (
            <>غيّر مستقبل عملك<br/> معنا</>
          )}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl"
        >
          {language === 'en' 
            ? 'We analyze, diagnose, and solve your deepest business challenges'
            : 'نحلل ونشخص ونحل أعمق تحديات عملك'
          }
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="px-8 py-4 bg-red-500 text-white font-space font-bold rounded-md flex items-center justify-center hover:bg-opacity-80 transition-all text-lg"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {language === 'en' ? 'Get a Free Consultation' : 'احصل على استشارة مجانية'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={scrollToNextSection}
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
