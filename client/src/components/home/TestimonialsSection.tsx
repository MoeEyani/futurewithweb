import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '@/context/AppContext';
import { testimonials } from '@/lib/testimonials';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialsSection: React.FC = () => {
  const { language } = useContext(AppContext);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideWidth, setSlideWidth] = useState('100%');
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate slide width based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlideWidth('33.333%'); // 3 items visible on large screens
      } else if (window.innerWidth >= 768) {
        setSlideWidth('50%'); // 2 items visible on medium screens
      } else {
        setSlideWidth('100%'); // 1 item visible on small screens
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const handleNext = () => {
    const maxSlides = testimonials.length - (slideWidth === '33.333%' ? 3 : (slideWidth === '50%' ? 2 : 1));
    if (activeSlide < maxSlides) {
      setActiveSlide(activeSlide + 1);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-gray-900" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-space font-bold mb-6"
          >
            {language === 'en' ? 'Success Stories' : 'قصص النجاح'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            {language === 'en' 
              ? 'Real results for businesses across the Middle East.'
              : 'نتائج حقيقية للشركات في جميع أنحاء الشرق الأوسط.'
            }
          </motion.p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * parseFloat(slideWidth)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className="p-4 flex-shrink-0"
                  style={{ width: slideWidth }}
                >
                  <div className="bg-background p-8 rounded-lg border border-gray-800 h-full">
                    <div className="flex items-start mb-6">
                      <div className="mr-4">
                        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                          <img 
                            src={testimonial.imageSrc} 
                            alt={language === 'en' ? testimonial.clientName : testimonial.clientNameAr} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-space font-bold">
                          {language === 'en' ? testimonial.clientName : testimonial.clientNameAr}
                        </h3>
                        <p className="text-gray-300">
                          {language === 'en' ? testimonial.projectType : testimonial.projectTypeAr}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <span 
                            className="text-lg font-bold"
                            style={{ color: testimonial.metricColor }}
                          >
                            {testimonial.metricValue}
                          </span>
                          <span className="text-gray-300 text-sm">
                            {language === 'en' ? testimonial.metricLabel : testimonial.metricLabelAr}
                          </span>
                        </div>
                        <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: `${testimonial.metricPercentage}%`,
                              backgroundColor: testimonial.metricColor
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 italic">
                      "{language === 'en' ? testimonial.testimonialText : testimonial.testimonialTextAr}"
                    </p>
                    
                    <div className="mt-6 flex justify-end">
                      <button className="px-4 py-2 text-sm text-blue-400 flex items-center">
                        {language === 'en' ? 'Full Case Study' : 'دراسة الحالة الكاملة'}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handlePrev}
            disabled={activeSlide === 0}
            className={`absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 hover:bg-blue-600 hover:bg-opacity-20 transition-colors ${activeSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleNext}
            disabled={activeSlide >= testimonials.length - (slideWidth === '33.333%' ? 3 : (slideWidth === '50%' ? 2 : 1))}
            className={`absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 hover:bg-blue-600 hover:bg-opacity-20 transition-colors ${activeSlide >= testimonials.length - (slideWidth === '33.333%' ? 3 : (slideWidth === '50%' ? 2 : 1)) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.slice(0, slideWidth === '33.333%' ? 1 : (slideWidth === '50%' ? 2 : 3)).map((_, index) => (
            <button 
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-blue-500' : 'bg-gray-700'}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
