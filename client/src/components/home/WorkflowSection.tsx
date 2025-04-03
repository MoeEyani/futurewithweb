import React, { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { workflowPhases } from '@/lib/workflow-phases';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkflowSection: React.FC = () => {
  const { language } = useContext(AppContext);
  
  return (
    <section id="workflow" className="py-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-space font-bold mb-6"
          >
            {language === 'en' ? 'How We Work' : 'كيف نعمل'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            {language === 'en' 
              ? 'Our proven 7-phase methodology transforms business challenges into sustainable solutions.'
              : 'منهجيتنا المثبتة ذات المراحل السبع تحول تحديات الأعمال إلى حلول مستدامة.'
            }
          </motion.p>
        </div>
        
        <div className="space-y-16 max-w-4xl mx-auto">
          {workflowPhases.map((phase, index) => (
            <motion.div 
              key={phase.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="phase-item bg-gray-900 p-8 rounded-lg border border-gray-800 relative hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div 
                className="absolute top-0 left-0 w-12 h-12 -mt-6 -ml-6 rounded-full flex items-center justify-center text-white font-bold font-space"
                style={{ backgroundColor: phase.color }}
              >
                {phase.id}
              </div>
              
              {index < workflowPhases.length - 1 && (
                <div 
                  className="phase-connector hidden md:block absolute top-1/2 right-[-15px] h-[2px] w-[30px] z-0"
                  style={{ background: `linear-gradient(90deg, ${phase.color}, transparent)` }}
                ></div>
              )}
              
              <h3 className="text-2xl font-space font-bold mb-4">
                {language === 'en' ? phase.title : phase.titleAr}
              </h3>
              
              <div className="space-y-3 text-gray-300">
                {phase.steps.map((step, stepIndex) => (
                  <p key={stepIndex} className="flex items-start">
                    <Check 
                      className="w-5 h-5 mr-3 mt-1 flex-shrink-0" 
                      style={{ color: phase.color }}
                    />
                    {language === 'en' ? step.text : step.textAr}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
