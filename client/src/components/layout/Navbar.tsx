import React, { useState, useEffect, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageToggle from '../ui/language-toggle';
import { AppContext } from '@/context/AppContext';
import Logo from '../Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useContext(AppContext);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing section
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background bg-opacity-95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => window.location.href = '/'}>
            <Logo withText={true} />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <div 
              className="text-white font-space text-sm hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/'; }}
            >
              {language === 'en' ? 'HOME' : 'الرئيسية'}
            </div>
            <div 
              className="text-white font-space text-sm hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/#services'; }}
            >
              {language === 'en' ? 'SERVICES' : 'الخدمات'}
            </div>
            <div 
              className="text-white font-space text-sm hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/#workflow'; }}
            >
              {language === 'en' ? 'OUR APPROACH' : 'منهجنا'}
            </div>
            <div 
              className="text-white font-space text-sm hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/#inspiration'; }}
            >
              {language === 'en' ? 'INSPIRATION' : 'إلهام'}
            </div>
            <div 
              className="text-white font-space text-sm hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/#testimonials'; }}
            >
              {language === 'en' ? 'SUCCESS STORIES' : 'قصص النجاح'}
            </div>
            <div 
              className="text-white font-space text-sm hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/#contact'; }}
            >
              {language === 'en' ? 'CONTACT' : 'اتصل بنا'}
            </div>
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <div 
              className="text-white font-space text-base py-2 hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/'; }}
            >
              {language === 'en' ? 'HOME' : 'الرئيسية'}
            </div>
            <div 
              className="text-white font-space text-base py-2 hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/#services'; }}
            >
              {language === 'en' ? 'SERVICES' : 'الخدمات'}
            </div>
            <div 
              className="text-white font-space text-base py-2 hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/#workflow'; }}
            >
              {language === 'en' ? 'OUR APPROACH' : 'منهجنا'}
            </div>
            <div 
              className="text-white font-space text-base py-2 hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/#inspiration'; }}
            >
              {language === 'en' ? 'INSPIRATION' : 'إلهام'}
            </div>
            <div 
              className="text-white font-space text-base py-2 hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/#testimonials'; }}
            >
              {language === 'en' ? 'SUCCESS STORIES' : 'قصص النجاح'}
            </div>
            <div 
              className="text-white font-space text-base py-2 hover:text-blue-400 transition-colors cursor-pointer" 
              onClick={() => { handleNavClick(); window.location.href = '/#contact'; }}
            >
              {language === 'en' ? 'CONTACT' : 'اتصل بنا'}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
