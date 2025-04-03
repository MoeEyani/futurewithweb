export interface WorkflowPhase {
  id: number;
  title: string;
  titleAr: string;
  steps: {
    text: string;
    textAr: string;
  }[];
  color: string;
}

export const workflowPhases: WorkflowPhase[] = [
  {
    id: 1,
    title: 'Engagement & Discovery Phase',
    titleAr: 'مرحلة المشاركة والاكتشاف',
    steps: [
      {
        text: 'Establish a formal consulting agreement with scope, objectives, and deliverables.',
        textAr: 'إنشاء اتفاقية استشارية رسمية مع النطاق والأهداف والمخرجات.'
      },
      {
        text: 'Conduct stakeholder meetings to understand the client\'s vision, challenges, and expectations.',
        textAr: 'إجراء اجتماعات مع أصحاب المصلحة لفهم رؤية العميل والتحديات والتوقعات.'
      },
      {
        text: 'Define KPIs (Key Performance Indicators) for success.',
        textAr: 'تحديد مؤشرات الأداء الرئيسية للنجاح.'
      }
    ],
    color: '#4E89AE' // blue
  },
  {
    id: 2,
    title: 'Research & Diagnosis Phase',
    titleAr: 'مرحلة البحث والتشخيص',
    steps: [
      {
        text: 'Data Collection: Interviews, surveys, market research, financial statements, and operational data.',
        textAr: 'جمع البيانات: المقابلات والاستطلاعات وأبحاث السوق والبيانات المالية والتشغيلية.'
      },
      {
        text: 'Benchmarking: Compare with industry best practices and competitors.',
        textAr: 'القياس: المقارنة مع أفضل ممارسات الصناعة والمنافسين.'
      },
      {
        text: 'Root Cause Analysis: Use frameworks like SWOT, PESTEL, Porter\'s Five Forces, and Value Chain Analysis.',
        textAr: 'تحليل السبب الجذري: استخدام أطر مثل SWOT و PESTEL ونموذج القوى الخمس لبورتر وتحليل سلسلة القيمة.'
      },
      {
        text: 'Identify bottlenecks and inefficiencies.',
        textAr: 'تحديد الاختناقات وأوجه القصور.'
      }
    ],
    color: '#FFD166' // yellow
  },
  {
    id: 3,
    title: 'Strategy Development & Solution Design',
    titleAr: 'تطوير الاستراتيجية وتصميم الحلول',
    steps: [
      {
        text: 'Generate potential solutions and strategies.',
        textAr: 'توليد حلول واستراتيجيات محتملة.'
      },
      {
        text: 'Develop business models, operational strategies, or technology roadmaps.',
        textAr: 'تطوير نماذج الأعمال واستراتيجيات التشغيل أو خرائط طريق التكنولوجيا.'
      },
      {
        text: 'Perform risk analysis, financial projections, and feasibility studies.',
        textAr: 'إجراء تحليل المخاطر والتوقعات المالية ودراسات الجدوى.'
      },
      {
        text: 'Align recommendations with the client\'s capabilities and market trends.',
        textAr: 'مواءمة التوصيات مع قدرات العميل واتجاهات السوق.'
      }
    ],
    color: '#4CAF50' // green
  },
  {
    id: 4,
    title: 'Presentation & Client Buy-In',
    titleAr: 'العرض وموافقة العميل',
    steps: [
      {
        text: 'Present findings and proposed solutions in a structured report.',
        textAr: 'تقديم النتائج والحلول المقترحة في تقرير منظم.'
      },
      {
        text: 'Use storytelling, data visualization, and strategic narratives to communicate insights.',
        textAr: 'استخدام سرد القصص وتصور البيانات والسرد الاستراتيجي لتوصيل الرؤى.'
      },
      {
        text: 'Get feedback and refine the strategy to ensure client alignment.',
        textAr: 'الحصول على التعليقات وتحسين الاستراتيجية لضمان توافق العميل.'
      }
    ],
    color: '#F05454' // red
  },
  {
    id: 5,
    title: 'Implementation & Execution',
    titleAr: 'التنفيذ والتطبيق',
    steps: [
      {
        text: 'Develop a step-by-step execution roadmap.',
        textAr: 'تطوير خارطة طريق التنفيذ خطوة بخطوة.'
      },
      {
        text: 'Assist with process improvements, technology adoption, restructuring, or transformation.',
        textAr: 'المساعدة في تحسين العمليات واعتماد التكنولوجيا وإعادة الهيكلة أو التحول.'
      },
      {
        text: 'Provide workshops, training, or change management programs for stakeholders.',
        textAr: 'تقديم ورش العمل أو التدريب أو برامج إدارة التغيير لأصحاب المصلحة.'
      }
    ],
    color: '#9c27b0' // purple
  },
  {
    id: 6,
    title: 'Monitoring & Continuous Improvement',
    titleAr: 'المراقبة والتحسين المستمر',
    steps: [
      {
        text: 'Track progress using KPIs, dashboards, and real-time performance monitoring.',
        textAr: 'تتبع التقدم باستخدام مؤشرات الأداء الرئيسية ولوحات المعلومات ومراقبة الأداء في الوقت الفعلي.'
      },
      {
        text: 'Identify roadblocks and fine-tune the implementation.',
        textAr: 'تحديد العقبات وضبط التنفيذ.'
      },
      {
        text: 'Provide continuous advisory support if needed.',
        textAr: 'تقديم الدعم الاستشاري المستمر إذا لزم الأمر.'
      }
    ],
    color: '#2196f3' // light blue
  },
  {
    id: 7,
    title: 'Project Closure & Handover',
    titleAr: 'إغلاق المشروع والتسليم',
    steps: [
      {
        text: 'Deliver final reports, insights, and recommendations for long-term sustainability.',
        textAr: 'تقديم التقارير النهائية والرؤى والتوصيات للاستدامة على المدى الطويل.'
      },
      {
        text: 'Conduct a final impact assessment and ensure knowledge transfer to the client.',
        textAr: 'إجراء تقييم نهائي للتأثير وضمان نقل المعرفة إلى العميل.'
      },
      {
        text: 'Provide optional follow-up services for ongoing optimization.',
        textAr: 'تقديم خدمات المتابعة الاختيارية للتحسين المستمر.'
      }
    ],
    color: '#ff9800' // orange
  }
];
