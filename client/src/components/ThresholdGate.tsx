import React, { useState, useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import ParticleBackground from './ParticleBackground';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const ThresholdGate: React.FC = () => {
  const { setShowGateway, setUserType } = useContext(AppContext);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showGuestButton, setShowGuestButton] = useState(false);

  const handleYesClick = () => {
    setResponseMessage('Welcome, visionary. Let\'s redesign what\'s possible.');
    setUserType('leader');
    localStorage.setItem('userMindset', 'leader');
    
    // Transition to main content after delay
    setTimeout(() => {
      enterSite();
    }, 2000);
  };

  const handleNoClick = () => {
    setResponseMessage('The future favors the bold. Return when you\'re ready to lead.');
    setShowGuestButton(true);
    setUserType('follower');
    localStorage.setItem('userMindset', 'follower');
  };

  const handleGuestClick = () => {
    setUserType('guest');
    localStorage.setItem('userMindset', 'guest');
    enterSite();
  };

  const enterSite = () => {
    // Save choice for 24 hours
    localStorage.setItem('gatewayChoice', 'entered');
    localStorage.setItem('gatewayTimestamp', Date.now().toString());
    setShowGateway(false);
  };

  return (
    <div className="gate-container min-h-screen w-full relative overflow-hidden bg-black">
      <ParticleBackground targetCenter={true} />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-6 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 text-xl md:text-2xl font-space text-white"
        >
          Innovation separates leaders from followers.
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-2xl md:text-4xl font-space font-bold mb-4 leading-tight"
        >
          Do you believe true success demands<br className="hidden md:block"/> embracing change?
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-sm md:text-base text-gray-300 mb-8"
        >
          This is not a rhetorical question. Your answer determines your path.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-4"
        >
          <button 
            onClick={handleYesClick}
            className="px-8 py-3 bg-green-600 text-white font-space font-bold rounded-md flex items-center justify-center hover:bg-green-700 transition-all"
          >
            YES – I LEAD THE FUTURE
            <Check className="w-5 h-5 ml-2" />
          </button>
          
          <button 
            onClick={handleNoClick}
            className="px-8 py-3 bg-gray-600 text-white font-space font-bold rounded-md flex items-center justify-center hover:bg-gray-700 transition-all"
          >
            NO – I FOLLOW THE PAST
            <X className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
        
        {responseMessage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-xl font-space"
          >
            {responseMessage}
          </motion.div>
        )}

        {showGuestButton && (
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 3 }}
            onClick={handleGuestClick}
            className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Still curious? Enter as a guest.
          </motion.button>
        )}
      </div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ 
          scale: [0.8, 1, 0.8],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="gate absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full bg-gradient-to-r from-[#1e1e1e] to-[#121212] shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center z-10"
      >
        <div className="gate-pulse absolute w-full h-full rounded-full border-2 border-white border-opacity-10 animate-pulse"></div>
      </motion.div>
    </div>
  );
};

export default ThresholdGate;
