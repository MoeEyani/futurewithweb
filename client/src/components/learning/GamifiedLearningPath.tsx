import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Award, BookOpen, CheckCircle, ChevronRight, Lock, Trophy } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { staggerFadeIn } from "@/lib/animations";

interface LearningModule {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  duration: number; // in minutes
  isCompleted: boolean;
  isLocked: boolean;
  requiredModules: number[];
  badge?: {
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    color: string;
  };
}

const learningModules: LearningModule[] = [
  {
    id: 1,
    title: "Business Leadership Fundamentals",
    titleAr: "أساسيات قيادة الأعمال",
    description: "Learn the core principles of effective business leadership",
    descriptionAr: "تعلم المبادئ الأساسية للقيادة الفعالة في الأعمال",
    duration: 45,
    isCompleted: true,
    isLocked: false,
    requiredModules: [],
    badge: {
      name: "Leadership Foundation",
      nameAr: "أساس القيادة",
      description: "Mastered the fundamental principles of leadership",
      descriptionAr: "إتقان المبادئ الأساسية للقيادة",
      icon: "Award",
      color: "bg-blue-500"
    }
  },
  {
    id: 2,
    title: "Change Management Strategies",
    titleAr: "استراتيجيات إدارة التغيير",
    description: "Develop effective approaches for organizational transformation",
    descriptionAr: "تطوير نهج فعال للتحول التنظيمي",
    duration: 60,
    isCompleted: true,
    isLocked: false,
    requiredModules: [1]
  },
  {
    id: 3,
    title: "Strategic Decision Making",
    titleAr: "اتخاذ القرارات الاستراتيجية",
    description: "Frameworks for making high-impact business decisions",
    descriptionAr: "أطر لاتخاذ قرارات الأعمال ذات التأثير العالي",
    duration: 50,
    isCompleted: false,
    isLocked: false,
    requiredModules: [1, 2],
    badge: {
      name: "Strategic Thinker",
      nameAr: "المفكر الاستراتيجي",
      description: "Demonstrated excellence in strategic thinking",
      descriptionAr: "إظهار التميز في التفكير الاستراتيجي",
      icon: "Trophy",
      color: "bg-purple-500"
    }
  },
  {
    id: 4,
    title: "Team Building & Collaboration",
    titleAr: "بناء الفريق والتعاون",
    description: "Techniques for developing high-performing teams",
    descriptionAr: "تقنيات لتطوير فرق عالية الأداء",
    duration: 55,
    isCompleted: false,
    isLocked: true,
    requiredModules: [1, 3]
  },
  {
    id: 5,
    title: "Innovation & Disruption",
    titleAr: "الابتكار والتحول",
    description: "Harness creative thinking to drive business innovation",
    descriptionAr: "تسخير التفكير الإبداعي لدفع الابتكار في الأعمال",
    duration: 70,
    isCompleted: false,
    isLocked: true,
    requiredModules: [3],
    badge: {
      name: "Innovation Champion",
      nameAr: "بطل الابتكار",
      description: "Leading the way in business innovation",
      descriptionAr: "قيادة الطريق في ابتكار الأعمال",
      icon: "Lightbulb",
      color: "bg-yellow-500"
    }
  }
];

export const GamifiedLearningPath = () => {
  const { t, language } = useTranslation();
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<LearningModule[]>([]);
  const [modulesRef, setModulesRef] = useState<HTMLDivElement | null>(null);
  
  const isArabic = language === 'ar';
  
  // Calculate overall progress
  const completedModulesCount = learningModules.filter(m => m.isCompleted).length;
  const progressPercentage = (completedModulesCount / learningModules.length) * 100;
  
  // Collect earned badges
  useEffect(() => {
    const badgeModules = learningModules.filter(
      module => module.isCompleted && module.badge
    );
    setEarnedBadges(badgeModules);
  }, []);
  
  // Animation for modules
  useEffect(() => {
    if (modulesRef) {
      const moduleElements = modulesRef.querySelectorAll('.module-card');
      staggerFadeIn(Array.from(moduleElements) as HTMLElement[], 0.2, 0.1);
    }
  }, [modulesRef]);
  
  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{t('gamifiedLearning')}</h2>
          <p className="text-muted-foreground mb-4">{t('learnFromExperts')}</p>
          
          {/* Progress bar */}
          <div className="w-full max-w-md mx-auto mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>{t('progressLabel')}</span>
              <span>{completedModulesCount}/{learningModules.length} {t('completedModules')}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          {/* Badges showcase */}
          {earnedBadges.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">{t('achievementBadges')}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {earnedBadges.map(module => (
                  <Badge 
                    key={module.id}
                    variant="outline" 
                    className={`px-3 py-1 ${module.badge?.color} text-white flex items-center gap-1`}
                  >
                    <Award size={14} />
                    {isArabic ? module.badge?.nameAr : module.badge?.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Learning modules */}
        <div
          ref={setModulesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {learningModules.map(module => (
            <Card 
              key={module.id}
              className={`module-card transition-all duration-200 ${
                module.isLocked ? 'opacity-70' : 'hover:shadow-md'
              } ${module.isCompleted ? 'border-green-200' : ''}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {isArabic ? module.titleAr : module.title}
                  </CardTitle>
                  {module.isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : module.isLocked ? (
                    <Lock className="h-5 w-5 text-gray-400" />
                  ) : null}
                </div>
                <CardDescription>
                  {isArabic ? module.descriptionAr : module.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{module.duration} {t('minutesLabel')}</span>
                </div>
                {module.badge && (
                  <div className="mt-2">
                    <Badge 
                      variant="outline" 
                      className="text-xs flex items-center gap-1"
                    >
                      <Award size={12} />
                      {t('earnsLabel')} {isArabic ? module.badge.nameAr : module.badge.name}
                    </Badge>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant={module.isCompleted ? "outline" : "default"}
                      size="sm"
                      disabled={module.isLocked}
                      className="w-full"
                      onClick={() => setSelectedModule(module)}
                    >
                      {module.isCompleted 
                        ? (isArabic ? "مراجعة" : "Review") 
                        : module.isLocked 
                          ? (isArabic ? "مقفل" : "Locked")
                          : (isArabic ? "بدء" : "Start")}
                      {!module.isLocked && <ChevronRight className="h-4 w-4 ml-1" />}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        {selectedModule && (isArabic ? selectedModule.titleAr : selectedModule.title)}
                      </DialogTitle>
                      <DialogDescription>
                        {selectedModule && (isArabic ? selectedModule.descriptionAr : selectedModule.description)}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">
                        {isArabic 
                          ? "هذه الميزة قيد التطوير. ستكون متاحة قريبًا."
                          : "This feature is under development. It will be available soon."}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};