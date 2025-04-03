import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import WorkflowSection from '@/components/home/WorkflowSection';
import UspSection from '@/components/home/UspSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import BusinessHealthQuiz from '@/components/quiz/BusinessHealthQuiz';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <WorkflowSection />
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
