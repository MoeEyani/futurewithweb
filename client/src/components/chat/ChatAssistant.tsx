import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { generateChatResponse, ChatMessage } from "@/lib/openai";
import { useTranslation } from "@/hooks/use-translation";
import { pulseAnimation } from "@/lib/animations";

export const ChatAssistant = () => {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content: "You are a helpful business consulting assistant for Future With consulting. Provide concise, helpful responses about business strategy, leadership, change management, and organizational development. Keep responses brief (under 150 words) but insightful. If you don't know something, be honest. Do not make up information about specific clients."
    },
    {
      role: "assistant",
      content: language === 'ar' 
        ? "مرحباً! أنا المساعد الافتراضي لشركة 'مستقبل مع' للاستشارات. كيف يمكنني مساعدتك اليوم في استفساراتك المتعلقة بالأعمال التجارية والقيادة والتغيير المؤسسي؟"
        : "Hello! I'm the virtual assistant for Future With Consulting. How can I help you today with your business, leadership, or organizational transformation questions?"
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatButtonRef = useRef<HTMLButtonElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Add pulse animation to chat button
  useEffect(() => {
    if (chatButtonRef.current) {
      const interval = setInterval(() => {
        pulseAnimation(chatButtonRef.current as HTMLElement);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isLoading) return;
    
    const userMessage: ChatMessage = {
      role: "user",
      content: message
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    
    try {
      const response = await generateChatResponse([...messages, userMessage]);
      
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: response
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: language === 'ar'
            ? "عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى لاحقاً."
            : "Sorry, there was an error processing your request. Please try again later."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat button */}
      <Button
        ref={chatButtonRef}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg flex items-center justify-center p-0 z-50"
        onClick={() => setIsOpen(true)}
        aria-label={t('chatWithUs')}
      >
        <MessageCircle size={24} />
      </Button>
      
      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[350px] max-w-[90vw] h-[500px] max-h-[80vh] shadow-xl z-50 flex flex-col">
          <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{t('chatbotAssistant')}</CardTitle>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 rounded-full" 
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </CardHeader>
          
          <CardContent className="p-4 overflow-y-auto flex-grow">
            <div className="flex flex-col space-y-4">
              {messages
                .filter(msg => msg.role !== "system")
                .map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "assistant" ? (language === 'ar' ? "justify-start" : "justify-start") : (language === 'ar' ? "justify-end" : "justify-end")}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[85%] ${
                        msg.role === "assistant"
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 bg-muted text-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <CardFooter className="p-3 border-t">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                placeholder={t('askQuestion')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
                disabled={isLoading}
              />
              <Button type="submit" size="sm" disabled={isLoading}>
                <Send size={18} />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
};