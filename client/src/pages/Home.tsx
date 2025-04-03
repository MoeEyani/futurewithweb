import React, { useContext } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import WorkflowSection from '@/components/home/WorkflowSection';
import UspSection from '@/components/home/UspSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import BusinessHealthQuiz from '@/components/quiz/BusinessHealthQuiz';
import QuoteBanner from '@/components/home/QuoteBanner';
import InspirationSection from '@/components/home/InspirationSection';
import { AppContext } from '@/context/AppContext';

const Home: React.FC = () => {
  const { language } = useContext(AppContext);
  
  return (
    <div className="min-h-screen bg-background text-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      {/* Add a spacer for the navbar */}
      <div className="h-16"></div>
      <QuoteBanner />
      <main>
        <Hero />
        <ServicesSection />
        <WorkflowSection />
        <InspirationSection />
        <UspSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <BusinessHealthQuiz />
      <Footer />
    </div>
  );
};

export default Home;
