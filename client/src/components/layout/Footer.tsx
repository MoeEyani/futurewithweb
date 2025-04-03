import React, { useContext } from 'react';
import Logo from '../Logo';
import { AppContext } from '@/context/AppContext';
import { Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const { language } = useContext(AppContext);
  
  return (
    <footer className="bg-black py-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="inline-block mb-6">
              <Logo withText={true} />
            </div>
            <p className="text-gray-300">
              {language === 'en' 
                ? 'We analyze, diagnose, and solve your deepest business challenges.'
                : 'نحلل ونشخص ونحل أعمق تحديات عملك.'
              }
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-space font-bold mb-4">
              {language === 'en' ? 'Services' : 'الخدمات'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Customer Experience' : 'تجربة العملاء'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Innovation' : 'الابتكار'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Operations' : 'العمليات'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Strategy' : 'الاستراتيجية'}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-space font-bold mb-4">
              {language === 'en' ? 'Resources' : 'المصادر'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Case Studies' : 'دراسات الحالة'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Blog' : 'المدونة'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Careers' : 'وظائف'}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-space font-bold mb-4">
              {language === 'en' ? 'Connect' : 'تواصل معنا'}
            </h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:bg-opacity-20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:bg-opacity-20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:bg-opacity-20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-300">
              {language === 'en' ? 'Subscribe to our newsletter' : 'اشترك في نشرتنا الإخبارية'}
            </p>
            <div className="flex mt-2">
              <input 
                type="email" 
                placeholder={language === 'en' ? 'Your email' : 'بريدك الإلكتروني'} 
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-opacity-80 transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; 2023 Future With. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
