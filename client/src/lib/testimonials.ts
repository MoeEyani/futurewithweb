export interface Testimonial {
  id: string;
  clientName: string;
  clientNameAr: string;
  projectType: string;
  projectTypeAr: string;
  metricLabel: string;
  metricLabelAr: string;
  metricValue: string;
  metricPercentage: number;
  testimonialText: string;
  testimonialTextAr: string;
  imageSrc: string;
  metricColor: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'saudi-retail',
    clientName: 'Saudi Retail Chain',
    clientNameAr: 'سلسلة متاجر سعودية',
    projectType: 'Sales & Marketing Transformation',
    projectTypeAr: 'تحول المبيعات والتسويق',
    metricLabel: 'Revenue Growth',
    metricLabelAr: 'نمو الإيرادات',
    metricValue: '+147%',
    metricPercentage: 85,
    testimonialText: 'Future With transformed our struggling retail business with their Sales & Marketing expertise. Their analysis uncovered critical weaknesses in our approach that no other consultant had identified.',
    testimonialTextAr: 'قامت "فيوتشر ويذ" بتحويل أعمالنا التجارية المتعثرة بفضل خبرتهم في المبيعات والتسويق. كشف تحليلهم نقاط ضعف حرجة في نهجنا لم يتمكن أي مستشار آخر من تحديدها.',
    imageSrc: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80',
    metricColor: '#4CAF50' // green
  },
  {
    id: 'dubai-startup',
    clientName: 'Dubai Tech Startup',
    clientNameAr: 'شركة تكنولوجيا ناشئة في دبي',
    projectType: 'Performance Improvement',
    projectTypeAr: 'تحسين الأداء',
    metricLabel: 'Accelerated Time-to-Market',
    metricLabelAr: 'تسريع وقت الوصول إلى السوق',
    metricValue: '8 Months',
    metricPercentage: 75,
    testimonialText: 'We were on the verge of missing our expansion window until Future With stepped in. Their Performance Improvement strategy completely reoriented our focus and saved our critical launch.',
    testimonialTextAr: 'كنا على وشك أن نفوت فرصة التوسع حتى تدخلت "فيوتشر ويذ". أعادت استراتيجية تحسين الأداء الخاصة بهم توجيه تركيزنا بالكامل وأنقذت إطلاقنا الحاسم.',
    imageSrc: 'https://images.unsplash.com/photo-1561489396-888724a1543d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80',
    metricColor: '#4E89AE' // blue
  },
  {
    id: 'uae-financial',
    clientName: 'UAE Financial Institution',
    clientNameAr: 'مؤسسة مالية إماراتية',
    projectType: 'Customer Experience Redesign',
    projectTypeAr: 'إعادة تصميم تجربة العملاء',
    metricLabel: 'Customer Satisfaction',
    metricLabelAr: 'رضا العملاء',
    metricValue: '+62%',
    metricPercentage: 65,
    testimonialText: 'Future With delivered a complete customer experience overhaul that transformed our customer satisfaction scores in just 90 days. Their diagnostic approach identified pain points we\'d overlooked for years.',
    testimonialTextAr: 'قدمت "فيوتشر ويذ" إصلاحًا شاملًا لتجربة العملاء مما حول درجات رضا العملاء لدينا في غضون 90 يومًا فقط. حدد نهجها التشخيصي نقاط الألم التي أغفلناها لسنوات.',
    imageSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80',
    metricColor: '#FFD166' // yellow
  }
];
