export type Translation = {
  en: string;
  ar: string;
};

export type TranslationKey = keyof typeof translations;

// This is our translations object
export const translations = {
  // Common UI elements
  home: { en: 'Home', ar: 'الرئيسية' },
  services: { en: 'Services', ar: 'الخدمات' },
  about: { en: 'About', ar: 'عن الشركة' },
  contact: { en: 'Contact', ar: 'اتصل بنا' },
  login: { en: 'Login', ar: 'تسجيل الدخول' },
  register: { en: 'Register', ar: 'تسجيل' },
  submit: { en: 'Submit', ar: 'إرسال' },
  cancel: { en: 'Cancel', ar: 'إلغاء' },
  loading: { en: 'Loading...', ar: 'جاري التحميل...' },
  next: { en: 'Next', ar: 'التالي' },
  previous: { en: 'Previous', ar: 'السابق' },
  
  // Hero section
  heroTitle: { 
    en: 'Transform Your Business Vision into Reality', 
    ar: 'حول رؤية عملك إلى واقع' 
  },
  heroSubtitle: { 
    en: 'Strategic consulting that delivers measurable results', 
    ar: 'استشارات استراتيجية تحقق نتائج قابلة للقياس' 
  },
  getStarted: { en: 'Get Started', ar: 'ابدأ الآن' },
  learnMore: { en: 'Learn More', ar: 'اعرف المزيد' },
  
  // Services section
  ourServices: { en: 'Our Services', ar: 'خدماتنا' },
  servicesSubtitle: { 
    en: 'Comprehensive solutions tailored to your business needs', 
    ar: 'حلول شاملة مصممة حسب احتياجات عملك' 
  },
  viewDetails: { en: 'View Details', ar: 'عرض التفاصيل' },
  
  // Workflow section
  ourWorkflow: { en: 'Our Workflow', ar: 'سير العمل' },
  workflowSubtitle: { 
    en: 'A proven methodology to deliver consistent results', 
    ar: 'منهجية مثبتة لتقديم نتائج متسقة' 
  },
  
  // Testimonials section
  testimonials: { en: 'Client Testimonials', ar: 'آراء العملاء' },
  testimonialsSubtitle: { 
    en: 'What our clients say about our impact on their business', 
    ar: 'ما يقوله عملاؤنا عن تأثيرنا على أعمالهم' 
  },
  
  // Contact form
  contactUs: { en: 'Contact Us', ar: 'اتصل بنا' },
  contactSubtitle: { 
    en: 'Get in touch with our expert team', 
    ar: 'تواصل مع فريق الخبراء لدينا' 
  },
  nameLabel: { en: 'Full Name', ar: 'الاسم الكامل' },
  emailLabel: { en: 'Email Address', ar: 'البريد الإلكتروني' },
  phoneLabel: { en: 'Phone Number', ar: 'رقم الهاتف' },
  companyLabel: { en: 'Company Name', ar: 'اسم الشركة' },
  messageLabel: { en: 'Message', ar: 'الرسالة' },
  messagePlaceholder: { 
    en: 'Tell us about your business needs...', 
    ar: 'أخبرنا عن احتياجات عملك...' 
  },
  sendMessage: { en: 'Send Message', ar: 'إرسال الرسالة' },
  
  // Business health quiz
  businessHealthQuiz: { en: 'Business Health Quiz', ar: 'اختبار صحة الأعمال' },
  quizSubtitle: { 
    en: 'Assess your organization\'s current state', 
    ar: 'قيم الوضع الحالي لمؤسستك' 
  },
  startQuiz: { en: 'Start Quiz', ar: 'ابدأ الاختبار' },
  quizCompleted: { en: 'Quiz Completed', ar: 'اكتمل الاختبار' },
  viewResults: { en: 'View Results', ar: 'عرض النتائج' },
  retakeQuiz: { en: 'Retake Quiz', ar: 'إعادة الاختبار' },
  
  // Footer
  copyright: { 
    en: 'All rights reserved', 
    ar: 'جميع الحقوق محفوظة' 
  },
  privacyPolicy: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  termsOfService: { en: 'Terms of Service', ar: 'شروط الخدمة' },
  
  // Admin dashboard
  dashboard: { en: 'Dashboard', ar: 'لوحة التحكم' },
  clients: { en: 'Clients', ar: 'العملاء' },
  clientsSubtitle: { 
    en: 'Manage and monitor all clients and their journeys', 
    ar: 'إدارة ومراقبة جميع العملاء ورحلاتهم' 
  },
  analytics: { en: 'Analytics', ar: 'التحليلات' },
  reports: { en: 'Reports', ar: 'التقارير' },
  settings: { en: 'Settings', ar: 'الإعدادات' },
  
  // Client overview
  totalClients: { en: 'Total Clients', ar: 'إجمالي العملاء' },
  activeClients: { en: 'Active Clients', ar: 'العملاء النشطون' },
  industries: { en: 'Industries', ar: 'الصناعات' },
  newThisMonth: { en: 'New This Month', ar: 'عملاء جدد (هذا الشهر)' },
  companyClients: { en: 'Company Clients', ar: 'عملاء الشركة' },
  filterClients: { 
    en: 'View, filter and manage all clients', 
    ar: 'عرض وتصفية وإدارة جميع العملاء' 
  },
  searchClients: { en: 'Search clients...', ar: 'بحث العملاء...' },
  clientName: { en: 'Client Name', ar: 'اسم العميل' },
  company: { en: 'Company', ar: 'الشركة' },
  industry: { en: 'Industry', ar: 'الصناعة' },
  status: { en: 'Status', ar: 'الحالة' },
  initialContact: { en: 'Initial Contact', ar: 'تاريخ التواصل الأول' },
  actions: { en: 'Actions', ar: 'الإجراءات' },
  noClientsFound: { en: 'No clients found', ar: 'لم يتم العثور على عملاء' },
  tryChangingFilters: { 
    en: 'Try changing your filters or add new clients', 
    ar: 'حاول تغيير المعايير أو إضافة عملاء جدد' 
  },
  addNewClient: { en: 'Add New Client', ar: 'إضافة عميل جديد' },
  viewJourney: { en: 'View Journey', ar: 'عرض الرحلة' },
  clientsByStatus: { en: 'Clients by Status', ar: 'العملاء حسب الحالة' },
  clientsByIndustry: { en: 'Clients by Industry', ar: 'العملاء حسب الصناعة' },
  noDataAvailable: { en: 'No data available', ar: 'لا توجد بيانات متاحة' },
  
  // Client journey
  clientJourney: { en: 'Client Journey', ar: 'رحلة العميل' },
  backToClients: { en: 'Back to Clients', ar: 'العودة إلى العملاء' },
  contactInformation: { en: 'Contact Information', ar: 'معلومات الاتصال' },
  clientDetails: { en: 'Client Details', ar: 'تفاصيل العميل' },
  journeyProgress: { en: 'Journey Progress', ar: 'تقدم الرحلة' },
  complete: { en: 'Complete', ar: 'مكتمل' },
  stages: { en: 'Stages', ar: 'مراحل' },
  currentStage: { en: 'Current Stage', ar: 'المرحلة الحالية' },
  interactions: { en: 'Interactions', ar: 'التفاعلات' },
  notes: { en: 'Notes', ar: 'الملاحظات' },
  clientProgressJourney: { 
    en: 'Client progress through various journey stages', 
    ar: 'تقدم العميل عبر مراحل الرحلة المختلفة' 
  },
  noJourneyStages: { 
    en: 'No journey stages have been set up yet', 
    ar: 'لم يتم تحديد أي مراحل للرحلة بعد' 
  },
  startedOn: { en: 'Started on: ', ar: 'بدأت في: ' },
  completedOn: { en: 'Completed on: ', ar: 'اكتملت في: ' },
  
  // Client interactions
  clientInteractions: { en: 'Client Interactions', ar: 'تفاعلات العميل' },
  interactionsRecord: { 
    en: 'Record of past interactions with the client', 
    ar: 'سجل التفاعلات السابقة مع العميل' 
  },
  addNewInteraction: { en: 'Add Interaction', ar: 'إضافة تفاعل' },
  noInteractions: { 
    en: 'No interactions recorded yet', 
    ar: 'لم يتم تسجيل أي تفاعلات بعد' 
  },
  call: { en: 'Call', ar: 'مكالمة' },
  meeting: { en: 'Meeting', ar: 'اجتماع' },
  email: { en: 'Email', ar: 'بريد إلكتروني' },
  
  // Client status
  new: { en: 'New', ar: 'جديد' },
  active: { en: 'Active', ar: 'نشط' },
  inactive: { en: 'Inactive', ar: 'غير نشط' },
  completed: { en: 'Completed', ar: 'مكتمل' },
  
  // New features
  chatbotAssistant: { 
    en: 'AI-powered chatbot assistant for instant consulting insights', 
    ar: 'مساعد دردشة مدعوم بالذكاء الاصطناعي للحصول على رؤى استشارية فورية' 
  },
  chatWithUs: { en: 'Chat with us', ar: 'تحدث معنا' },
  askQuestion: { en: 'Ask a question...', ar: 'اطرح سؤالاً...' },
  
  successStories: { en: 'Success Stories', ar: 'قصص النجاح' },
  clientTestimonials: { 
    en: 'What our clients say about us', 
    ar: 'ما يقوله عملاؤنا عنا' 
  },
  
  companyPhilosophy: { en: 'Our Philosophy', ar: 'فلسفتنا' },
  learnFromExperts: { 
    en: 'Learn from our experts', 
    ar: 'تعلم من خبرائنا' 
  },
  
  gamifiedLearning: { en: 'Learning Path', ar: 'مسار التعلم' },
  achievementBadges: { en: 'Achievement Badges', ar: 'شارات الإنجاز' },
  progressLabel: { en: 'Progress', ar: 'التقدم' },
  completedModules: { en: 'Completed', ar: 'مكتمل' },
  minutesLabel: { en: 'Minutes', ar: 'دقائق' },
  earnsLabel: { en: 'Earns', ar: 'يكسب' },
  
  caseStudyBuilder: { en: 'Case Study Builder', ar: 'منشئ دراسات الحالة' },
  createCaseStudy: { en: 'Create Case Study', ar: 'إنشاء دراسة حالة' },
  
  errorLoading: { en: 'Error loading data', ar: 'خطأ في تحميل البيانات' },
  errorLoadingMessage: { 
    en: 'There was an error loading data. Please try again later.', 
    ar: 'حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.' 
  },
  
  // Other translations
  notAvailable: { en: 'Not available', ar: 'غير متوفر' },
  allStatuses: { en: 'All Statuses', ar: 'كل الحالات' },
  allIndustries: { en: 'All Industries', ar: 'كل الصناعات' },
  
  // User threshold gate
  welcomeToFutureWith: { 
    en: 'Welcome to Future With', 
    ar: 'مرحبًا بك في مستقبل مع' 
  },
  chooseYourPath: { 
    en: 'Choose Your Path', 
    ar: 'اختر مسارك' 
  },
  iAmALeader: { 
    en: 'I am a Leader', 
    ar: 'أنا قائد' 
  },
  iAmAFollower: { 
    en: 'I am a Follower', 
    ar: 'أنا تابع' 
  },
  continueAsGuest: { 
    en: 'Continue as Guest', 
    ar: 'المتابعة كضيف' 
  },
} as const;

// Helper function to get a translation based on the current language
export const getTranslation = (key: keyof typeof translations, language: 'en' | 'ar'): string => {
  return translations[key][language];
};