export interface Service {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  color: string;
  features: string[];
  featuresAr: string[];
}

export const services: Service[] = [
  {
    id: 'customer-experience',
    title: 'Customer Experience',
    titleAr: 'تجربة العملاء',
    description: 'Transform how clients perceive and interact with your brand',
    descriptionAr: 'تحويل كيفية إدراك العملاء لعلامتك التجارية وتفاعلهم معها',
    icon: 'smile',
    color: '#4E89AE', // blue
    features: [
      'Journey mapping and optimization',
      'Brand perception analysis',
      'Touchpoint enhancement'
    ],
    featuresAr: [
      'رسم وتحسين رحلة العميل',
      'تحليل إدراك العلامة التجارية',
      'تعزيز نقاط التواصل'
    ]
  },
  {
    id: 'innovation',
    title: 'Innovation',
    titleAr: 'الابتكار',
    description: 'Disrupt your market with groundbreaking solutions',
    descriptionAr: 'أحدث ثورة في سوقك بحلول مبتكرة',
    icon: 'lightbulb',
    color: '#FFD166', // yellow
    features: [
      'Digital transformation roadmaps',
      'Product development workshops',
      'Market disruption strategies'
    ],
    featuresAr: [
      'خارطة طريق التحول الرقمي',
      'ورش عمل تطوير المنتجات',
      'استراتيجيات اختراق السوق'
    ]
  },
  {
    id: 'operations',
    title: 'Operations',
    titleAr: 'العمليات',
    description: 'Streamline processes and maximize efficiency',
    descriptionAr: 'تبسيط العمليات وتعظيم الكفاءة',
    icon: 'settings',
    color: '#4CAF50', // green
    features: [
      'Process optimization',
      'Supply chain excellence',
      'Resource allocation strategies'
    ],
    featuresAr: [
      'تحسين العمليات',
      'تميز سلسلة التوريد',
      'استراتيجيات توزيع الموارد'
    ]
  },
  {
    id: 'strategy',
    title: 'Strategy',
    titleAr: 'الاستراتيجية',
    description: 'Chart your path to sustainable competitive advantage',
    descriptionAr: 'رسم مسارك نحو ميزة تنافسية مستدامة',
    icon: 'zap',
    color: '#F05454', // red
    features: [
      'Market positioning',
      'Competitive advantage analysis',
      'Growth acceleration planning'
    ],
    featuresAr: [
      'تحديد الموضع في السوق',
      'تحليل الميزة التنافسية',
      'تخطيط تسريع النمو'
    ]
  },
  {
    id: 'performance',
    title: 'Performance Improvement',
    titleAr: 'تحسين الأداء',
    description: 'Enhance productivity and boost your bottom line',
    descriptionAr: 'تعزيز الإنتاجية وزيادة أرباحك',
    icon: 'trending-up',
    color: '#9c27b0', // purple
    features: [
      'Productivity enhancement',
      'Cost optimization',
      'Performance metrics tracking'
    ],
    featuresAr: [
      'تعزيز الإنتاجية',
      'تحسين التكاليف',
      'تتبع مقاييس الأداء'
    ]
  },
  {
    id: 'digital',
    title: 'Digital Transformation',
    titleAr: 'التحول الرقمي',
    description: 'Harness technology to revolutionize your business model',
    descriptionAr: 'استخدام التكنولوجيا لإحداث ثورة في نموذج عملك',
    icon: 'cpu',
    color: '#2196f3', // light blue
    features: [
      'Technology stack modernization',
      'Digital customer experience',
      'Data-driven decision making'
    ],
    featuresAr: [
      'تحديث الهيكل التكنولوجي',
      'تجربة العملاء الرقمية',
      'اتخاذ القرارات المستندة إلى البيانات'
    ]
  },
  {
    id: 'marketing',
    title: 'Sales & Marketing',
    titleAr: 'المبيعات والتسويق',
    description: 'Maximize revenue through optimized customer acquisition',
    descriptionAr: 'تعظيم الإيرادات من خلال تحسين اكتساب العملاء',
    icon: 'target',
    color: '#ff9800', // orange
    features: [
      'Go-to-market strategy',
      'Sales funnel optimization',
      'Brand positioning & messaging'
    ],
    featuresAr: [
      'استراتيجية التسويق',
      'تحسين مسار المبيعات',
      'تموضع العلامة التجارية والرسائل'
    ]
  }
];
