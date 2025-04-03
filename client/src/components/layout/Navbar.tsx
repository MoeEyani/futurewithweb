import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import LanguageToggle from '../ui/language-toggle';
import { useContext } from 'react';
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
          <Link href="/">
            <a className="flex items-center">
              <Logo withText={true} />
            </a>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className="text-white font-space text-sm hover:text-blue-400 transition-colors" onClick={handleNavClick}>
                {language === 'en' ? 'HOME' : 'الرئيسية'}
              </a>
            </Link>
            <Link href="/#services">
              <a className="text-white font-space text-sm hover:text-blue-400 transition-colors" onClick={handleNavClick}>
                {language === 'en' ? 'SERVICES' : 'الخدمات'}
              </a>
            </Link>
            <Link href="/#workflow">
              <a className="text-white font-space text-sm hover:text-blue-400 transition-colors" onClick={handleNavClick}>
                {language === 'en' ? 'OUR APPROACH' : 'منهجنا'}
              </a>
            </Link>
            <Link href="/#testimonials">
              <a className="text-white font-space text-sm hover:text-blue-400 transition-colors" onClick={handleNavClick}>
                {language === 'en' ? 'SUCCESS STORIES' : 'قصص النجاح'}
              </a>
            </Link>
            <Link href="/#contact">
              <a className="text-white font-space text-sm hover:text-blue-400 transition-colors" onClick={handleNavClick}>
                {language === 'en' ? 'CONTACT' : 'اتصل بنا'}
              </a>
            </Link>
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
            <Link href="/">
              <a className="text-white font-space text-base py-2 hover:text-blue-400 transition-colors" onClick={handleNavClick}>
                {language === 'en' ? 'HOME' : 'الرئيسية'}
              </a>
            </Link>
            <Link href="/#services">
              <a className="text-white font-space text-base py-2 hover:text-blue-400 transition-colors" onClick={handleNavClick}>
                {language === 'en' ? 'SERVICES' : 'الخدمات'}
              </a>
            </Link>
            <Link href="/#workflow">
              <a className="text-white font-space text-base py-2 hover:text-blue-400 transition-colors" onClick={handleNavClick}>
                {language === 'en' ? 'OUR APPROACH' : 'منهجنا'}
              </a>
            </Link>
            <Link href="/#testimonials">
              <a className="text-white font-space text-base py-2 hover:text-blue-400 transition-colors" onClick={handleNavClick}>
                {language === 'en' ? 'SUCCESS STORIES' : 'قصص النجاح'}
              </a>
            </Link>
            <Link href="/#contact">
              <a className="text-white font-space text-base py-2 hover:text-blue-400 transition-colors" onClick={handleNavClick}>
                {language === 'en' ? 'CONTACT' : 'اتصل بنا'}
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
