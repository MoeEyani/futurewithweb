import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { fadeIn } from "@/lib/animations";

interface SuccessStory {
  id: number;
  clientName: string;
  clientTitle: string;
  company: string;
  testimonial: string;
  testimonialAr: string;
  rating: number;
  industry: string;
  logo?: string;
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    clientName: "Ahmed Al-Farsi",
    clientTitle: "CEO",
    company: "TechVision Arabia",
    testimonial: "Future With transformed our approach to digital transformation. Their strategic guidance helped us increase productivity by 40% and expand into new markets.",
    testimonialAr: "لقد حولت شركة 'مستقبل مع' نهجنا في التحول الرقمي. ساعدتنا توجيهاتهم الاستراتيجية على زيادة الإنتاجية بنسبة 40٪ والتوسع في أسواق جديدة.",
    rating: 5,
    industry: "Technology"
  },
  {
    id: 2,
    clientName: "Sarah Johnson",
    clientTitle: "Operations Director",
    company: "Gulf Logistics Group",
    testimonial: "The insights provided by Future With consultants revolutionized our supply chain processes. We've reduced costs by 25% and improved customer satisfaction scores.",
    testimonialAr: "الرؤى التي قدمها مستشارو 'مستقبل مع' أحدثت ثورة في عمليات سلسلة التوريد لدينا. لقد قللنا التكاليف بنسبة 25٪ وحسنا درجات رضا العملاء.",
    rating: 5,
    industry: "Logistics"
  },
  {
    id: 3,
    clientName: "Mohammed Al-Qahtani",
    clientTitle: "Managing Director",
    company: "Sands Investment Group",
    testimonial: "The leadership coaching provided by Future With helped us build a more resilient executive team. We're now better equipped to handle market uncertainties.",
    testimonialAr: "ساعدنا التدريب القيادي الذي قدمته شركة 'مستقبل مع' على بناء فريق تنفيذي أكثر مرونة. نحن الآن أفضل تجهيزًا للتعامل مع عدم اليقين في السوق.",
    rating: 4,
    industry: "Finance"
  },
  {
    id: 4,
    clientName: "Fatima Al-Suwaidi",
    clientTitle: "HR Director",
    company: "Emirates Healthcare",
    testimonial: "Future With's organizational development program helped us navigate a challenging merger. Their attention to culture integration was exceptional.",
    testimonialAr: "ساعدنا برنامج التطوير التنظيمي من 'مستقبل مع' على التنقل خلال عملية اندماج صعبة. كان اهتمامهم بتكامل الثقافة استثنائيًا.",
    rating: 5,
    industry: "Healthcare"
  }
];

export const SuccessStories = () => {
  const { t, language } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [storyCardRef, setStoryCardRef] = useState<HTMLDivElement | null>(null);
  
  const isArabic = language === 'ar';
  const currentStory = successStories[currentIndex];
  
  // Apply fade in animation
  useEffect(() => {
    if (storyCardRef) {
      fadeIn(storyCardRef);
    }
  }, [currentStory, storyCardRef]);
  
  const handlePrevious = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? successStories.length - 1 : prev - 1));
      setAnimating(false);
    }, 300);
  };
  
  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === successStories.length - 1 ? 0 : prev + 1));
      setAnimating(false);
    }, 300);
  };
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000); // Change testimonial every 8 seconds
    
    return () => clearInterval(interval);
  }, [currentIndex, animating]);
  
  return (
    <div className="w-full p-4 relative">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{t('successStories')}</h3>
        <p className="text-muted-foreground">{t('clientTestimonials')}</p>
      </div>
      
      <div className="relative max-w-3xl mx-auto">
        <Card 
          ref={setStoryCardRef}
          className={`bg-card shadow-lg transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge variant="outline" className="mb-2">
                  {currentStory.industry}
                </Badge>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      size={16} 
                      className={i < currentStory.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <Quote size={30} className="text-primary opacity-20" />
            </div>
            
            <p className="text-lg mb-4 italic">
              {isArabic ? currentStory.testimonialAr : currentStory.testimonial}
            </p>
            
            <div className="flex items-center mt-4">
              <div 
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold"
              >
                {currentStory.clientName.charAt(0)}
              </div>
              <div className={`ml-3 ${isArabic ? 'text-right' : ''}`}>
                <p className="font-semibold">{currentStory.clientName}</p>
                <p className="text-sm text-muted-foreground">
                  {currentStory.clientTitle}, {currentStory.company}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <button 
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-background rounded-full p-1 shadow-md"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button 
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-background rounded-full p-1 shadow-md"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
        
        <div className="flex justify-center mt-4 space-x-1">
          {successStories.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};