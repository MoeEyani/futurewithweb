import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import ParticleBackground from './ParticleBackground';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const ThresholdGate: React.FC = () => {
  const { setShowGateway, setUserType } = useContext(AppContext);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showGuestButton, setShowGuestButton] = useState(false);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    // Force navigation if already set to navigate
    if (navigating) {
      const timer = setTimeout(() => {
        enterSite();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [navigating]);

  const handleYesClick = () => {
    setResponseMessage('Welcome, visionary. Let\'s redesign what\'s possible.');
    setUserType('leader');
    localStorage.setItem('userMindset', 'leader');
    setNavigating(true);
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
    setNavigating(true);
  };

  const enterSite = () => {
    // Save choice for 24 hours
    localStorage.setItem('gatewayChoice', 'entered');
    localStorage.setItem('gatewayTimestamp', Date.now().toString());
    console.log('Navigating to main site...');
    setShowGateway(false);
  };

  return (
    <div className="gate-container min-h-screen w-full relative overflow-hidden">
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
          className="text-2xl md:text-4xl font-space font-bold mb-4 leading-tight text-white"
        >
          Only great leaders embrace change and innovation<br className="hidden md:block"/> as part of success.
          <br/>If you are one, step beyond this gate with us.
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
            YES – I See the Future
            <Check className="w-5 h-5 ml-2" />
          </button>
          
          <button 
            onClick={handleNoClick}
            className="px-8 py-3 bg-gray-600 text-white font-space font-bold rounded-md flex items-center justify-center hover:bg-gray-700 transition-all"
          >
            NO – Not Ready Yet
            <X className="w-5 h-5 ml-2" />
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
        className="gate absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_70px_rgba(79,70,229,0.4)] flex items-center justify-center z-10"
      >
        <div className="gate-inner absolute w-[150px] h-[150px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-60"></div>
        <div className="gate-pulse absolute w-full h-full rounded-full border-2 border-white border-opacity-20 animate-pulse"></div>
      </motion.div>
    </div>
  );
};

export default ThresholdGate;
