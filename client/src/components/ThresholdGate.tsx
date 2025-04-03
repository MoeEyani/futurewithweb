import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import ParticleBackground from './ParticleBackground';
import { motion } from 'framer-motion';
import { Check, X, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ThresholdGateProps {
  onEnterSite: (userType: 'leader' | 'follower' | 'guest') => void;
}

const ThresholdGate: React.FC<ThresholdGateProps> = ({ onEnterSite }) => {
  const { language, setLanguage } = useContext(AppContext);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showGuestButton, setShowGuestButton] = useState(false);
  
  // Debug function to check localStorage and context state
  useEffect(() => {
    console.log('ThresholdGate - Current language:', language);
  }, [language]);

  const handleYesClick = () => {
    const userType = 'leader';
    // Add a response message
    setResponseMessage(language === 'en' ? 
      'Welcome, visionary. Let\'s redesign what\'s possible.' : 
      'مرحبًا أيها القائد. دعنا نعيد تصميم ما هو ممكن.');
      
    // Directly navigate after a very short delay to show the message
    setTimeout(() => {
      // Navigate directly without extra state changes
      console.log('YES clicked - Entering site as leader');
      onEnterSite(userType);
    }, 500);
  };

  const handleNoClick = () => {
    const userType = 'follower';
    setResponseMessage(language === 'en' ? 
      'The future favors the bold. Return when you\'re ready to lead.' : 
      'المستقبل يصنعه الجريئون. عد إلينا عندما تكون مستعدًا للقيادة.');
    setShowGuestButton(true);
    localStorage.setItem('userMindset', userType);
  };

  const handleGuestClick = () => {
    const userType = 'guest';
    // Directly navigate
    console.log('GUEST clicked - Entering site as guest');
    onEnterSite(userType);
  };

  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  
  const toggleLanguage = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    setIsAnimating(true);
    const newLanguage = language === 'en' ? 'ar' : 'en';
    const direction = newLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Show toast notification
    toast({
      title: newLanguage === 'ar' ? 'جاري تغيير اللغة...' : 'Changing language...',
      description: newLanguage === 'ar' 
        ? 'تحويل الواجهة إلى اللغة العربية' 
        : 'Switching interface to English',
      duration: 3000,
    });
    
    // Get the main gate container for animations
    const gateContainer = document.getElementById('threshold-gate');
    
    if (gateContainer) {
      // Import and use the language transition animation
      import('@/lib/animations').then(({ languageTransition }) => {
        const timeline = languageTransition(gateContainer, direction);
        
        // Change the language in the middle of the animation
        timeline.eventCallback("onUpdate", () => {
          const progress = timeline.progress();
          if (progress >= 0.5 && language !== newLanguage) {
            setLanguage(newLanguage);
            localStorage.setItem('language', newLanguage);
            console.log('Language changed to:', newLanguage);
          }
        });
        
        // Reset animation state when complete
        timeline.eventCallback("onComplete", () => {
          setIsAnimating(false);
          
          // Show completion toast
          toast({
            title: newLanguage === 'ar' ? 'تم تغيير اللغة' : 'Language changed',
            description: newLanguage === 'ar' 
              ? 'تم تحويل الواجهة إلى اللغة العربية بنجاح' 
              : 'Interface successfully switched to English',
            duration: 2000,
          });
        });
      });
    } else {
      // Fallback if container not found
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      console.log('Language changed to:', newLanguage);
      setIsAnimating(false);
      
      // Show fallback toast
      toast({
        title: newLanguage === 'ar' ? 'تم تغيير اللغة' : 'Language changed',
        description: newLanguage === 'ar' 
          ? 'تم تحويل الواجهة إلى اللغة العربية' 
          : 'Interface switched to English',
        duration: 2000,
      });
    }
  };

  // Save language to localStorage anytime it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <div id="threshold-gate" className="gate-container min-h-screen w-full relative overflow-hidden">
      {/* Business-themed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
               backgroundSize: '80px 80px'
             }}>
        </div>
        
        {/* Geometric business grid pattern */}
        <div className="absolute inset-0 opacity-15" 
             style={{
               backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}>
        </div>
        
        {/* Light beams */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[800px] bg-blue-400 opacity-20 rounded-full blur-[100px] -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[800px] bg-purple-400 opacity-20 rounded-full blur-[100px] translate-y-1/2"></div>
        </div>
      </div>
      
      <ParticleBackground targetCenter={true} />
      
      {/* Language toggle button */}
      <button 
        onClick={toggleLanguage}
        className={`absolute top-5 right-5 z-20 px-3 py-2 rounded-md flex items-center text-white transition-all duration-300 ${
          isAnimating 
            ? 'bg-blue-600/30 cursor-not-allowed' 
            : 'bg-blue-600/50 hover:bg-blue-700/50'
        }`}
        title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
        disabled={isAnimating}
      >
        <Languages className={`w-5 h-5 mr-2 ${isAnimating ? 'animate-pulse' : ''}`} />
        {language === 'en' ? 'العربية' : 'English'}
      </button>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-6 text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 text-xl md:text-2xl font-space text-white"
        >
          {language === 'en' ? 'Innovation separates leaders from followers.' : 'الابتكار يفرق بين القادة والأتباع.'}
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-2xl md:text-4xl font-space font-bold mb-4 leading-tight text-white"
        >
          {language === 'en' ? (
            <>Only great leaders embrace change and innovation<br className="hidden md:block"/> as part of success.
            <br/>If you are one, step beyond this gate with us.</>
          ) : (
            <>فقط القادة العظماء يتبنون التغيير والابتكار
            <br/>كجزء من النجاح.
            <br/>إن كنت منهم، فانطلق معنا إلى ما وراء هذه البوابة.</>
          )}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-sm md:text-base text-gray-300 mb-8"
        >
          {language === 'en' ? 
            'This is not a rhetorical question. Your answer determines your path.' : 
            'هذا ليس سؤالاً بلاغيًا. إجابتك تحدد مسارك.'}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className={`flex flex-col md:flex-row space-y-4 md:space-y-0 ${language === 'ar' ? 'md:space-x-reverse' : 'md:space-x-6'} mt-4`}
        >
          <button 
            onClick={handleYesClick}
            className="px-8 py-3 bg-green-600 text-white font-space font-bold rounded-md flex items-center justify-center hover:bg-green-700 transition-all"
          >
            {language === 'en' ? (
              <>
                YES – I See the Future
                <Check className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                نعم - أنا أرى المستقبل
                <Check className="w-5 h-5 mr-2 order-first" />
              </>
            )}
          </button>
          
          <button 
            onClick={handleNoClick}
            className="px-8 py-3 bg-gray-600 text-white font-space font-bold rounded-md flex items-center justify-center hover:bg-gray-700 transition-all"
          >
            {language === 'en' ? (
              <>
                NO – Not Ready Yet
                <X className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                لا - لست مستعدًا بعد
                <X className="w-5 h-5 mr-2 order-first" />
              </>
            )}
          </button>
        </motion.div>
        
        {responseMessage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-xl font-space text-white"
          >
            {responseMessage}
          </motion.div>
        )}

        {showGuestButton && (
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            onClick={handleGuestClick}
            className="mt-6 px-6 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            {language === 'en' ? 
              'Still curious? Enter as a guest.' : 
              'لا تزال فضوليًا؟ ادخل كضيف.'}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ThresholdGate;
