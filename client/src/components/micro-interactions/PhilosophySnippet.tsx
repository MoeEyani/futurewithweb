import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, X } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { fadeIn, fadeOut } from "@/lib/animations";

interface PhilosophySnippet {
  id: number;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  category: "leadership" | "innovation" | "change" | "ethics";
}

const philosophySnippets: PhilosophySnippet[] = [
  {
    id: 1,
    title: "Leadership Philosophy",
    titleAr: "فلسفة القيادة",
    content: "True leadership is about inspiring others to reach their full potential. We believe in servant leadership that puts the growth and wellbeing of people first.",
    contentAr: "القيادة الحقيقية تتعلق بإلهام الآخرين للوصول إلى إمكاناتهم الكاملة. نحن نؤمن بالقيادة الخادمة التي تضع نمو الناس ورفاهيتهم في المقام الأول.",
    category: "leadership"
  },
  {
    id: 2,
    title: "Innovation Mindset",
    titleAr: "عقلية الابتكار",
    content: "Innovation isn't just about new technology—it's about fresh thinking in all aspects of business. We value creativity that solves real problems.",
    contentAr: "الابتكار لا يتعلق فقط بالتكنولوجيا الجديدة — بل يتعلق بالتفكير الجديد في جميع جوانب العمل. نحن نقدر الإبداع الذي يحل المشكلات الحقيقية.",
    category: "innovation"
  },
  {
    id: 3,
    title: "Change Management",
    titleAr: "إدارة التغيير",
    content: "Successful change requires both strategy and empathy. We focus on human factors as much as operational processes in guiding transformation.",
    contentAr: "التغيير الناجح يتطلب كلاً من الاستراتيجية والتعاطف. نحن نركز على العوامل البشرية بقدر ما نركز على العمليات التشغيلية في توجيه التحول.",
    category: "change"
  },
  {
    id: 4,
    title: "Business Ethics",
    titleAr: "أخلاقيات العمل",
    content: "Long-term success is built on integrity. We believe ethical business practices aren't just right—they're also the most sustainable path to growth.",
    contentAr: "يُبنى النجاح على المدى الطويل على النزاهة. نحن نؤمن بأن ممارسات الأعمال الأخلاقية ليست فقط صحيحة — بل هي أيضًا المسار الأكثر استدامة للنمو.",
    category: "ethics"
  }
];

export const PhilosophySnippet = () => {
  const { language } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);
  
  const isArabic = language === 'ar';
  const currentSnippet = philosophySnippets[snippetIndex];
  
  // Show a snippet after a delay when the page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 20000); // Show the first snippet after 20 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  // Hide snippet after a set time
  useEffect(() => {
    if (visible) {
      const hideTimer = setTimeout(() => {
        if (cardRef) {
          fadeOut(cardRef);
          setTimeout(() => setVisible(false), 800);
        }
      }, 15000); // Hide after 15 seconds
      
      return () => clearTimeout(hideTimer);
    }
  }, [visible, cardRef]);
  
  // Animation when snippet becomes visible
  useEffect(() => {
    if (visible && cardRef) {
      fadeIn(cardRef);
    }
  }, [visible, cardRef]);
  
  // Change snippet when closed
  const handleClose = () => {
    if (cardRef) {
      fadeOut(cardRef);
      setTimeout(() => {
        setVisible(false);
        setSnippetIndex((prev) => (prev + 1) % philosophySnippets.length);
      }, 300);
    }
  };
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs">
      <Card 
        ref={setCardRef}
        className="shadow-lg opacity-0"
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={16} className="text-yellow-500" />
              <h4 className="font-medium">
                {isArabic ? currentSnippet.titleAr : currentSnippet.title}
              </h4>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0" 
              onClick={handleClose}
            >
              <X size={14} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {isArabic ? currentSnippet.contentAr : currentSnippet.content}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};