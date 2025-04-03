import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Client, JourneyStage, JourneyProgress, ClientInteraction } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Timeline, TimelineItem, TimelineConnector, TimelineContent, TimelineDot, TimelineSeparator } from "@/components/ui/timeline";
import { ArrowLeft, Calendar, CalendarCheck, CheckCircle, Circle, Clock, Edit, Mail, MessageCircle, Phone, Plus, Users } from "lucide-react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ClientJourneyProps {
  clientId: number;
}

const ClientJourney: React.FC<ClientJourneyProps> = ({ clientId }) => {
  const { language } = useContext(AppContext);
  const isRtl = language === 'ar';
  const dateLocale = language === 'ar' ? ar : enUS;
  const [activeTab, setActiveTab] = useState("journey");

  // Fetch client data
  const { data: client, isLoading: clientLoading, error: clientError } = useQuery<Client>({
    queryKey: [`/api/clients/${clientId}`],
  });

  // Fetch journey stages
  const { data: journeyStages, isLoading: stagesLoading } = useQuery<JourneyStage[]>({
    queryKey: ['/api/journey-stages'],
  });

  // Fetch client journey progress
  const { data: journeyProgress, isLoading: progressLoading } = useQuery<JourneyProgress[]>({
    queryKey: [`/api/clients/${clientId}/journey-progress`],
  });

  // Fetch client interactions
  const { data: interactions, isLoading: interactionsLoading } = useQuery<ClientInteraction[]>({
    queryKey: [`/api/clients/${clientId}/interactions`],
  });

  // Calculate journey completion percentage
  const journeyCompletionPercentage = () => {
    if (!journeyStages || !journeyProgress) return 0;
    
    const completedStages = journeyProgress.filter(p => p.isCompleted).length;
    const totalStages = journeyStages.length;
    
    return totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;
  };

  // Format date function
  const formatDate = (date: Date) => {
    return format(new Date(date), 'PPP', { locale: dateLocale });
  };

  // Format time function
  const formatTime = (date: Date) => {
    return format(new Date(date), 'p', { locale: dateLocale });
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    const checkDate = new Date(date);
    return checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear();
  };

  // Get current journey stage
  const getCurrentStage = () => {
    if (!journeyStages || !journeyProgress) return null;
    
    // Find the latest active stage
    const activeProgress = [...journeyProgress]
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      .find(p => !p.isCompleted);
    
    if (activeProgress) {
      return journeyStages.find(s => s.id === activeProgress.stageId);
    }
    
    // If all stages are completed, return the last one
    const completedProgress = [...journeyProgress]
      .sort((a, b) => new Date(b.completionDate || 0).getTime() - new Date(a.completionDate || 0).getTime());
    
    if (completedProgress.length > 0) {
      return journeyStages.find(s => s.id === completedProgress[0].stageId);
    }
    
    return null;
  };

  // Get stage progress
  const getStageProgress = (stageId: number) => {
    if (!journeyProgress) return null;
    return journeyProgress.find(p => p.stageId === stageId);
  };

  const isLoading = clientLoading || stagesLoading || progressLoading || interactionsLoading;
  const error = clientError;
  const currentStage = getCurrentStage();

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-muted-foreground">
          {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
        </p>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="py-10 text-center">
        <Alert variant="destructive">
          <AlertTitle>
            {language === 'ar' ? 'خطأ في تحميل البيانات' : 'Error Loading Data'}
          </AlertTitle>
          <AlertDescription>
            {language === 'ar' 
              ? 'حدث خطأ أثناء تحميل بيانات العميل. يرجى المحاولة مرة أخرى لاحقًا.' 
              : 'There was an error loading client data. Please try again later.'}
          </AlertDescription>
        </Alert>
        <Button className="mt-4" variant="outline" asChild>
          <Link href="/admin/clients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'ar' ? 'العودة إلى قائمة العملاء' : 'Back to Clients List'}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" className="mb-2" asChild>
          <Link href="/admin/clients">
            <ArrowLeft className={`h-4 w-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
            {language === 'ar' ? 'العودة إلى العملاء' : 'Back to Clients'}
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <p className="text-muted-foreground">{client.company}</p>
          </div>
          <Badge 
            className={`mt-2 md:mt-0 ${
              client.status === 'Active' ? 'bg-green-500' :
              client.status === 'New' ? 'bg-blue-500' :
              client.status === 'Completed' ? 'bg-purple-500' :
              'bg-amber-500'
            } hover:${
              client.status === 'Active' ? 'bg-green-600' :
              client.status === 'New' ? 'bg-blue-600' :
              client.status === 'Completed' ? 'bg-purple-600' :
              'bg-amber-600'
            } text-white`}
          >
            {client.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </div>
                <div>{client.email}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
                </div>
                <div>{client.phone || (language === 'ar' ? 'غير متوفر' : 'Not available')}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'الصناعة' : 'Industry'}
                </div>
                <div>{client.industry || (language === 'ar' ? 'غير متوفر' : 'Not available')}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'حجم الشركة' : 'Company Size'}
                </div>
                <div>{client.size || (language === 'ar' ? 'غير متوفر' : 'Not available')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {language === 'ar' ? 'تفاصيل العميل' : 'Client Details'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'تاريخ التواصل الأول' : 'Initial Contact'}
                </div>
                <div>{formatDate(client.initialContactDate)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'آخر تواصل' : 'Last Contact'}
                </div>
                <div>{formatDate(client.lastContactDate)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'المصدر' : 'Source'}
                </div>
                <div>{client.source || (language === 'ar' ? 'غير متوفر' : 'Not available')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {language === 'ar' ? 'تقدم الرحلة' : 'Journey Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {journeyCompletionPercentage()}% {language === 'ar' ? 'مكتمل' : 'Complete'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {journeyProgress?.filter(p => p.isCompleted).length || 0}/{journeyStages?.length || 0} {language === 'ar' ? 'مراحل' : 'Stages'}
                </span>
              </div>
              <Progress value={journeyCompletionPercentage()} className="h-2" />
              
              {currentStage && (
                <div className="mt-4">
                  <div className="text-xs text-muted-foreground mb-1">
                    {language === 'ar' ? 'المرحلة الحالية' : 'Current Stage'}
                  </div>
                  <div className="flex items-center">
                    <div 
                      className="h-3 w-3 rounded-full mr-2" 
                      style={{ backgroundColor: currentStage.color }}
                    ></div>
                    <span>{currentStage.name}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="journey">
            {language === 'ar' ? 'رحلة العميل' : 'Client Journey'}
          </TabsTrigger>
          <TabsTrigger value="interactions">
            {language === 'ar' ? 'التفاعلات' : 'Interactions'}
          </TabsTrigger>
          <TabsTrigger value="notes">
            {language === 'ar' ? 'الملاحظات' : 'Notes'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'رحلة العميل' : 'Client Journey'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'تقدم العميل عبر مراحل الرحلة المختلفة' 
                  : 'Client progress through various journey stages'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {journeyStages && journeyStages.length > 0 ? (
                <Timeline>
                  {journeyStages
                    .sort((a, b) => a.order - b.order)
                    .map((stage, index) => {
                      const progress = getStageProgress(stage.id);
                      const isCompleted = progress?.isCompleted;
                      const isActive = currentStage?.id === stage.id;
                      
                      return (
                        <TimelineItem key={stage.id}>
                          <TimelineSeparator>
                            <TimelineDot
                              color={stage.color}
                              variant={isCompleted ? "filled" : isActive ? "outlined" : "standard"}
                            />
                            {index < journeyStages.length - 1 && <TimelineConnector />}
                          </TimelineSeparator>
                          <TimelineContent>
                            <div className="ml-4">
                              <div className="flex items-center">
                                <h3 className="font-medium">{stage.name}</h3>
                                {isCompleted && <CheckCircle className="ml-2 h-4 w-4 text-green-500" />}
                              </div>
                              <p className="text-sm text-muted-foreground">{stage.description}</p>
                              
                              {progress && (
                                <div className="mt-1 space-y-1">
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span>
                                      {language === 'ar' ? 'بدأت في: ' : 'Started on: '}
                                      {formatDate(progress.startDate)}
                                    </span>
                                  </div>
                                  
                                  {progress.isCompleted && progress.completionDate && (
                                    <div className="flex items-center text-xs text-muted-foreground">
                                      <CalendarCheck className="h-3 w-3 mr-1" />
                                      <span>
                                        {language === 'ar' ? 'اكتملت في: ' : 'Completed on: '}
                                        {formatDate(progress.completionDate)}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {progress.notes && (
                                    <p className="text-xs italic mt-1 text-muted-foreground">
                                      "{progress.notes}"
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </TimelineContent>
                        </TimelineItem>
                      );
                    })}
                </Timeline>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  {language === 'ar' 
                    ? 'لم يتم تحديد أي مراحل للرحلة بعد' 
                    : 'No journey stages have been set up yet'}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'تفاعلات العميل' : 'Client Interactions'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'سجل التفاعلات السابقة مع العميل' 
                  : 'Record of past interactions with the client'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {interactions && interactions.length > 0 ? (
                <div className="space-y-8">
                  {interactions
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((interaction) => (
                      <div key={interaction.id} className="relative">
                        <div className="flex items-start gap-4">
                          <div className="relative mt-1">
                            <div className={`h-9 w-9 rounded-full flex items-center justify-center 
                              ${interaction.type === 'Call' ? 'bg-blue-100' : 
                                interaction.type === 'Meeting' ? 'bg-purple-100' : 
                                interaction.type === 'Email' ? 'bg-green-100' : 'bg-gray-100'}`}
                            >
                              {interaction.type === 'Call' ? (
                                <Phone className="h-5 w-5 text-blue-600" />
                              ) : interaction.type === 'Meeting' ? (
                                <Users className="h-5 w-5 text-purple-600" />
                              ) : interaction.type === 'Email' ? (
                                <Mail className="h-5 w-5 text-green-600" />
                              ) : (
                                <MessageCircle className="h-5 w-5 text-gray-600" />
                              )}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                              <h4 className="font-medium mb-1 sm:mb-0">{interaction.type}</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>
                                  {isToday(interaction.date) 
                                    ? (language === 'ar' ? 'اليوم' : 'Today') 
                                    : formatDate(interaction.date)}
                                  {', '}
                                  {formatTime(interaction.date)}
                                </span>
                              </div>
                            </div>
                            
                            <p className="mt-2">{interaction.description}</p>
                            
                            {(interaction.outcome || interaction.nextSteps) && (
                              <div className="mt-3 pt-3 border-t border-border">
                                {interaction.outcome && (
                                  <div className="mb-2">
                                    <span className="text-sm font-medium">
                                      {language === 'ar' ? 'النتيجة: ' : 'Outcome: '}
                                    </span>
                                    <span className="text-sm">{interaction.outcome}</span>
                                  </div>
                                )}
                                
                                {interaction.nextSteps && (
                                  <div>
                                    <span className="text-sm font-medium">
                                      {language === 'ar' ? 'الخطوات التالية: ' : 'Next Steps: '}
                                    </span>
                                    <span className="text-sm">{interaction.nextSteps}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  {language === 'ar' 
                    ? 'لم يتم تسجيل أي تفاعلات مع العميل بعد' 
                    : 'No interactions have been recorded with this client yet'}
                </div>
              )}
              
              <div className="mt-6 flex justify-center">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'إضافة تفاعل جديد' : 'Add New Interaction'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'ملاحظات العميل' : 'Client Notes'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'ملاحظات ومعلومات إضافية عن العميل' 
                  : 'Notes and additional information about the client'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {client.notes ? (
                <div className="bg-muted p-4 rounded-md whitespace-pre-line">
                  {client.notes}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  {language === 'ar' 
                    ? 'لا توجد ملاحظات للعميل بعد' 
                    : 'No notes have been added for this client yet'}
                </div>
              )}
              
              <div className="mt-6 flex justify-center">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'تحرير الملاحظات' : 'Edit Notes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientJourney;