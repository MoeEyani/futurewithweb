import React, { useState, useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { AlertTriangle, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  text: string;
  textAr: string;
  category: 'operations' | 'culture' | 'strategy' | 'finance' | 'innovation' | 'leadership' | 'marketing';
}

const BusinessHealthQuiz: React.FC = () => {
  const { language } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: 'yes' | 'no' | null }>({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null,
    q9: null,
    q10: null,
  });
  const { toast } = useToast();

  const questions: Question[] = [
    {
      id: 'q1',
      text: 'Does your team spend >30% of time fixing operational fires?',
      textAr: 'هل يقضي فريقك أكثر من 30٪ من الوقت في إصلاح مشكلات تشغيلية طارئة؟',
      category: 'operations'
    },
    {
      id: 'q2',
      text: 'Is your customer retention rate below industry benchmarks?',
      textAr: 'هل معدل احتفاظك بالعملاء أقل من معايير الصناعة؟',
      category: 'marketing'
    },
    {
      id: 'q3',
      text: 'Have you struggled to implement your strategic initiatives?',
      textAr: 'هل واجهت صعوبة في تنفيذ مبادراتك الاستراتيجية؟',
      category: 'strategy'
    },
    {
      id: 'q4',
      text: 'Is your profit margin declining year-over-year?',
      textAr: 'هل هامش الربح لديك ينخفض عامًا بعد عام؟',
      category: 'finance'
    },
    {
      id: 'q5',
      text: 'Do you lack a clear innovation roadmap?',
      textAr: 'هل تفتقر إلى خارطة طريق واضحة للابتكار؟',
      category: 'innovation'
    },
    {
      id: 'q6',
      text: 'Is your employee turnover rate above industry average?',
      textAr: 'هل معدل دوران الموظفين لديك أعلى من متوسط الصناعة؟',
      category: 'culture'
    },
    {
      id: 'q7',
      text: 'Do you struggle to attract and retain top talent?',
      textAr: 'هل تواجه صعوبة في جذب والاحتفاظ بالمواهب المتميزة؟',
      category: 'leadership'
    },
    {
      id: 'q8',
      text: 'Is your business overly dependent on one customer or market segment?',
      textAr: 'هل يعتمد عملك بشكل مفرط على عميل واحد أو شريحة سوق واحدة؟',
      category: 'strategy'
    },
    {
      id: 'q9',
      text: 'Do you lack clear metrics to measure business performance?',
      textAr: 'هل تفتقر إلى مقاييس واضحة لقياس أداء الأعمال؟',
      category: 'operations'
    },
    {
      id: 'q10',
      text: 'Are your marketing efforts producing diminishing returns?',
      textAr: 'هل تنتج جهود التسويق الخاصة بك عوائد متناقصة؟',
      category: 'marketing'
    }
  ];

  const calculateScore = (): number => {
    // Count how many "yes" answers (problems) there are
    const problemsCount = Object.values(answers).filter(a => a === 'yes').length;
    // Score is inverse to number of problems (10 problems = 0, 0 problems = 100)
    return Math.max(0, 100 - (problemsCount * 10));
  };
  
  const getCategoryScores = (): { [key: string]: number } => {
    const categoryProblems: { [key: string]: number } = {
      operations: 0,
      culture: 0,
      strategy: 0,
      finance: 0,
      innovation: 0,
      leadership: 0,
      marketing: 0
    };
    
    // Count problems by category
    questions.forEach(q => {
      if (answers[q.id] === 'yes') {
        categoryProblems[q.category]++;
      }
    });
    
    // Convert to scores (100 = best, 0 = worst)
    const maxProblemsByCategory: { [key: string]: number } = {};
    
    // Count max problems possible per category
    questions.forEach(q => {
      if (!maxProblemsByCategory[q.category]) {
        maxProblemsByCategory[q.category] = 0;
      }
      maxProblemsByCategory[q.category]++;
    });
    
    // Calculate scores
    const categoryScores: { [key: string]: number } = {};
    Object.keys(categoryProblems).forEach(category => {
      const problemsInCategory = categoryProblems[category];
      const maxProblemsInCategory = maxProblemsByCategory[category] || 1;
      categoryScores[category] = 100 - (problemsInCategory * (100 / maxProblemsInCategory));
    });
    
    return categoryScores;
  };

  const getScoreClass = (score: number): string => {
    if (score <= 40) return 'text-red-500';
    if (score <= 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  const handleAnswerChange = (questionId: string, answer: 'yes' | 'no') => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const unansweredQuestions = Object.entries(answers).filter(([_, value]) => value === null);
    
    if (unansweredQuestions.length > 0) {
      toast({
        title: language === 'en' ? 'Please answer all questions' : 'الرجاء الإجابة على جميع الأسئلة',
        variant: 'destructive',
      });
      return;
    }
    
    setShowResults(true);
  };

  const handleBookConsultation = () => {
    // Redirect to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setShowResults(false);
      
      // Reset quiz for next time
      setAnswers({
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null,
        q6: null,
        q7: null,
        q8: null,
        q9: null,
        q10: null,
      });
    }
  };

  const resetQuiz = () => {
    setShowResults(false);
    setAnswers({
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
      q6: null,
      q7: null,
      q8: null,
      q9: null,
      q10: null,
    });
  };

  const score = calculateScore();
  const categoryScores = getCategoryScores();
  const scoreClass = getScoreClass(score);
  
  // Get weakest categories (lowest scores) for targeted recommendations
  const sortedCategories = Object.entries(categoryScores)
    .filter((entry) => entry[1] < 100) // Only include categories with problems
    .sort((entryA, entryB) => entryA[1] - entryB[1]) // Sort by score ascending
    .slice(0, 3); // Get top 3 problem areas

  return (
    <>
      {/* Quiz trigger button */}
      <div className="fixed right-4 bottom-4 z-40">
        <motion.button 
          onClick={() => setIsOpen(true)}
          className="group flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CheckCircle className="w-5 h-5" />
          <span className="font-space text-sm">
            {language === 'en' ? 'How Healthy Is Your Business?' : 'ما مدى صحة عملك؟'}
          </span>
        </motion.button>
      </div>
      
      {/* Quiz modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
            onClick={(e) => {
              // Close only if background is clicked
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-gray-900 p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-space font-bold">
                  {language === 'en' ? 'Business Health Check' : 'فحص صحة الأعمال'}
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {!showResults ? (
                <div id="quiz-questions">
                  {questions.map((question) => (
                    <div key={question.id} className="mb-8">
                      <p className="text-lg mb-4">
                        {language === 'en' ? question.text : question.textAr}
                      </p>
                      <div className="flex space-x-4">
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" 
                            name={question.id} 
                            value="yes" 
                            checked={answers[question.id] === 'yes'}
                            onChange={() => handleAnswerChange(question.id, 'yes')}
                            className="mr-2"
                          />
                          <span>{language === 'en' ? 'Yes' : 'نعم'}</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" 
                            name={question.id} 
                            value="no" 
                            checked={answers[question.id] === 'no'}
                            onChange={() => handleAnswerChange(question.id, 'no')}
                            className="mr-2"
                          />
                          <span>{language === 'en' ? 'No' : 'لا'}</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    onClick={handleSubmit}
                    className="w-full py-3 bg-blue-600 text-white font-space font-bold rounded-md hover:bg-blue-500 transition-all"
                  >
                    {language === 'en' ? 'Calculate My Business Health Score' : 'احسب درجة صحة عملي'}
                  </Button>
                </div>
              ) : (
                <div id="quiz-results">
                  <div className="text-center mb-6">
                    <div className="inline-block p-6 rounded-full bg-red-500 bg-opacity-20 mb-4">
                      <AlertTriangle className="w-12 h-12 text-red-500" />
                    </div>
                    
                    <h3 className="text-2xl font-space font-bold mb-2">
                      {language === 'en' ? 'Your Business Health Score: ' : 'درجة صحة عملك: '}
                      <span className={scoreClass}>{score}/100</span>
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {language === 'en' 
                        ? 'Your business is showing several warning signs that require immediate attention.'
                        : 'يظهر عملك عدة علامات تحذير تتطلب اهتمامًا فوريًا.'
                      }
                    </p>
                  </div>
                  
                  <div className="p-4 border border-red-500 border-opacity-30 rounded-lg mb-6">
                    <h4 className="font-space font-bold mb-2">
                      {language === 'en' ? 'Critical Areas to Address:' : 'المجالات الحرجة المطلوب معالجتها:'}
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {sortedCategories.length > 0 ? (
                        sortedCategories.map(([category, categoryScore], index) => {
                          const getIssueName = (cat: string) => {
                            switch(cat) {
                              case 'operations':
                                return language === 'en' 
                                  ? 'Operational inefficiencies costing you time and resources'
                                  : 'عدم كفاءة التشغيل تكلفك الوقت والموارد';
                              case 'culture':
                                return language === 'en'
                                  ? 'Cultural and employee engagement challenges within your organization'
                                  : 'تحديات ثقافية ومشاركة الموظفين داخل مؤسستك';
                              case 'strategy':
                                return language === 'en'
                                  ? 'Strategic implementation gaps limiting growth potential'
                                  : 'فجوات التنفيذ الاستراتيجي تحد من إمكانات النمو';
                              case 'finance':
                                return language === 'en'
                                  ? 'Financial performance issues impacting profitability'
                                  : 'مشاكل الأداء المالي التي تؤثر على الربحية';
                              case 'innovation':
                                return language === 'en'
                                  ? 'Innovation roadblocks preventing competitive advantages'
                                  : 'عوائق الابتكار التي تمنع المزايا التنافسية';
                              case 'leadership':
                                return language === 'en'
                                  ? 'Leadership capacity gaps impacting talent retention and development'
                                  : 'فجوات في قدرات القيادة تؤثر على الاحتفاظ بالمواهب وتطويرها';
                              case 'marketing':
                                return language === 'en'
                                  ? 'Marketing effectiveness and customer retention issues'
                                  : 'مشاكل فعالية التسويق والاحتفاظ بالعملاء';
                              default:
                                return language === 'en'
                                  ? 'Business optimization opportunities'
                                  : 'فرص تحسين الأعمال';
                            }
                          };
                          
                          return (
                            <li key={index} className="mb-2">
                              <div className="flex items-center">
                                <span>{getIssueName(category)}</span>
                                <span className={`ml-2 ${getScoreClass(categoryScore)}`}>
                                  ({Math.round(categoryScore)}/100)
                                </span>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li>
                          {language === 'en'
                            ? 'Your business appears to be in good health across all measured areas.'
                            : 'يبدو أن عملك يتمتع بصحة جيدة في جميع المجالات المقاسة.'
                          }
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <Button 
                      onClick={handleBookConsultation}
                      className="flex-1 py-3 bg-red-500 text-white font-space font-bold rounded-md hover:bg-red-600 transition-all"
                    >
                      {language === 'en' 
                        ? 'Book a Free Consultation to Cure These Pain Points'
                        : 'احجز استشارة مجانية لعلاج نقاط الألم هذه'
                      }
                    </Button>
                    
                    <Button 
                      onClick={resetQuiz}
                      variant="outline"
                      className="py-3 font-space font-bold rounded-md"
                    >
                      {language === 'en' ? 'Retake Quiz' : 'إعادة الاختبار'}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BusinessHealthQuiz;
