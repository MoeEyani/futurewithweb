import React, { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection: React.FC = () => {
  const { language } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      titleAr: 'اتصل بنا',
      info: '+971 4 123 4567',
      color: '#4E89AE' // blue
    },
    {
      icon: Mail,
      title: 'Email Us',
      titleAr: 'راسلنا',
      info: 'contact@futurewith.com',
      color: '#4CAF50' // green
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      titleAr: 'زرنا',
      info: language === 'en' 
        ? 'Dubai Media City, Building 5\nDubai, United Arab Emirates' 
        : 'مدينة دبي للإعلام، مبنى 5\nدبي، الإمارات العربية المتحدة',
      color: '#FFD166' // yellow
    }
  ];

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      // This would normally be a real API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: language === 'en' ? 'Message sent successfully!' : 'تم إرسال الرسالة بنجاح!',
        description: language === 'en' 
          ? 'We will get back to you soon.' 
          : 'سنتواصل معك قريباً.',
        variant: 'default',
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: language === 'en' ? 'Error' : 'خطأ',
        description: language === 'en' 
          ? 'There was a problem sending your message.' 
          : 'حدثت مشكلة في إرسال رسالتك.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-space font-bold mb-6">
              {language === 'en' ? 'Ready to Redraw Your Future?' : 'هل أنت مستعد لإعادة رسم مستقبلك؟'}
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              {language === 'en' 
                ? 'Schedule a consultation and discover how we can transform your business challenges into opportunities.'
                : 'احجز استشارة واكتشف كيف يمكننا تحويل تحديات عملك إلى فرص.'
              }
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-start"
                >
                  <div 
                    className="mr-4 p-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-space font-bold mb-1">
                      {language === 'en' ? item.title : item.titleAr}
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line">{item.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <h3 className="text-2xl font-space font-bold mb-6">
                  {language === 'en' ? 'Get in Touch' : 'تواصل معنا'}
                </h3>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'en' ? 'Your Name' : 'الاسم'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={language === 'en' ? 'Enter your name' : 'أدخل اسمك'} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'en' ? 'Your Email' : 'البريد الإلكتروني'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'} 
                            type="email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'en' ? 'Company' : 'الشركة'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={language === 'en' ? 'Enter your company name' : 'أدخل اسم شركتك'} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'en' ? 'Message' : 'الرسالة'}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={language === 'en' ? 'How can we help you?' : 'كيف يمكننا مساعدتك؟'} 
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full font-space font-bold"
                    disabled={isSubmitting}
                    style={{ backgroundColor: '#F05454' }}
                  >
                    {language === 'en' ? 'Submit Inquiry' : 'إرسال الاستفسار'}
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
