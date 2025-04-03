import React, { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { Phone, Mail, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company is required'),
  phone: z.string().optional(),
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
      info: '+967 730 600 011',
      link: 'tel:+967730600011',
      color: '#4E89AE' // blue
    },
    {
      icon: Mail,
      title: 'Email Us',
      titleAr: 'راسلنا',
      info: 'info@futurewith.co',
      link: 'mailto:info@futurewith.co',
      color: '#4CAF50' // green
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      titleAr: 'زرنا',
      info: language === 'en' 
        ? 'Sana\'a, Yemen' 
        : 'صنعاء، اليمن',
      color: '#FFD166' // yellow
    }
  ];

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      // Submit form data to the server
      const response = await apiRequest('POST', '/api/contact', data);
      
      const responseData = await response.json();
      
      if (responseData.success) {
        // Show success message
        toast({
          title: language === 'en' ? 'Message sent successfully!' : 'تم إرسال الرسالة بنجاح!',
          description: language === 'en' 
            ? 'Thank you for reaching out. We will contact you soon.' 
            : 'شكرًا للتواصل معنا. سنتصل بك قريبًا.',
          variant: 'default',
        });
        
        // Reset form after successful submission
        form.reset();
      } else {
        // Show error message if the API indicates failure
        toast({
          title: language === 'en' ? 'Error' : 'خطأ',
          description: responseData.message || (language === 'en' 
            ? 'There was a problem sending your message.' 
            : 'حدثت مشكلة في إرسال رسالتك.'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Show error message
      toast({
        title: language === 'en' ? 'Error' : 'خطأ',
        description: language === 'en' 
          ? 'There was a problem connecting to the server. Please try again later.' 
          : 'حدثت مشكلة في الاتصال بالخادم. يرجى المحاولة مرة أخرى لاحقًا.',
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
                    {item.link ? (
                      <a 
                        href={item.link} 
                        className="text-gray-300 hover:text-primary transition-colors whitespace-pre-line"
                      >
                        {item.info}
                      </a>
                    ) : (
                      <p className="text-gray-300 whitespace-pre-line">{item.info}</p>
                    )}
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'en' ? 'Phone (optional)' : 'الهاتف (اختياري)'}
                        </FormLabel>
                        <FormControl>
                          <Controller
                            name="phone"
                            control={form.control}
                            render={({ field: { onChange, value } }) => (
                              <PhoneInput
                                country={'ye'} // Yemen as default
                                value={value}
                                onChange={onChange}
                                inputClass="!w-full !bg-background !border-input !text-foreground !h-10 !pl-[3.5rem] !rounded-md"
                                containerClass="!w-full"
                                dropdownClass="!bg-background !text-foreground"
                                buttonClass="!bg-background !border-input !rounded-l-md"
                                buttonStyle={{ borderRight: 0 }}
                                placeholder={language === 'en' ? 'Enter your phone number' : 'أدخل رقم هاتفك'}
                              />
                            )}
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
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        {language === 'en' ? 'Sending...' : 'جارٍ الإرسال...'}
                      </>
                    ) : (
                      <>
                        {language === 'en' ? 'Submit Inquiry' : 'إرسال الاستفسار'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
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
