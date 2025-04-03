import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BarChart, BarChartHorizontal, AreaChart, Download, Search, Filter } from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area,
} from "recharts";

const eventTypeColors = {
  pageView: "#4E89AE",
  formSubmission: "#43658B",
  buttonClick: "#2E4756",
  quizStarted: "#FF5722",
  quizCompleted: "#4CAF50",
  chatStarted: "#9C27B0",
  feedbackGiven: "#2196F3",
  download: "#FFC107",
};

// Sample data for now
const generateSampleData = () => {
  const now = new Date();
  const days = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    days.push({
      date: date.toISOString().split("T")[0],
      pageViews: Math.floor(Math.random() * 100) + 50,
      quizStarts: Math.floor(Math.random() * 20) + 5,
      quizCompletions: Math.floor(Math.random() * 15) + 2,
      formSubmissions: Math.floor(Math.random() * 8) + 1,
      chatSessions: Math.floor(Math.random() * 12) + 3,
    });
  }
  
  return days;
};

const generateEventsSample = () => {
  const events = [];
  const eventTypes = ["pageView", "formSubmission", "buttonClick", "quizStarted", "quizCompleted", "chatStarted", "feedbackGiven", "download"];
  const pages = ["/", "/services", "/about", "/contact", "/quiz", "/case-studies"];
  
  for (let i = 0; i < 50; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));
    
    events.push({
      id: i + 1,
      eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      timestamp: date,
      pageUrl: pages[Math.floor(Math.random() * pages.length)],
      clientId: Math.random() > 0.3 ? Math.floor(Math.random() * 10) + 1 : null,
      clientName: Math.random() > 0.3 ? `Client ${Math.floor(Math.random() * 10) + 1}` : null,
      ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
      userAgent: Math.random() > 0.5 ? "Mobile" : "Desktop",
    });
  }
  
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

type AnalyticsEvent = {
  id: number;
  eventType: string;
  timestamp: Date;
  pageUrl: string;
  clientId: number | null;
  clientName: string | null;
  ipAddress: string;
  userAgent: string;
};

const AnalyticsReport = () => {
  const { language } = useContext(AppContext);
  const isRtl = language === 'ar';
  
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');

  // Fetch analytics data
  const { data: analyticsData = generateSampleData(), isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['/api/analytics', dateRange],
    enabled: false, // Disable actual API call until endpoint is ready
  });

  // Fetch events data
  const { data: eventsData = generateEventsSample(), isLoading: isLoadingEvents } = useQuery({
    queryKey: ['/api/analytics/events', dateRange, eventTypeFilter],
    enabled: false, // Disable actual API call until endpoint is ready
  });

  // Filter events based on search query
  const filteredEvents = eventsData.filter((event: AnalyticsEvent) => {
    if (searchQuery.trim() === "") return true;
    
    const query = searchQuery.toLowerCase();
    return (
      event.eventType.toLowerCase().includes(query) ||
      event.pageUrl.toLowerCase().includes(query) ||
      (event.clientName && event.clientName.toLowerCase().includes(query)) ||
      event.ipAddress.includes(query)
    );
  });

  // Format event type for display
  const formatEventType = (type: string) => {
    return type
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  // Sum by event type for pie chart
  const eventTypeData = eventsData.reduce((acc: Record<string, number>, event: AnalyticsEvent) => {
    acc[event.eventType] = (acc[event.eventType] || 0) + 1;
    return acc;
  }, {});

  const eventTypeChartData = Object.entries(eventTypeData).map(([type, count]) => ({
    name: formatEventType(type),
    value: count,
    color: eventTypeColors[type as keyof typeof eventTypeColors] || "#999",
  }));

  // Sum by page for popular pages chart
  const pageViewData = eventsData
    .filter((event: AnalyticsEvent) => event.eventType === 'pageView')
    .reduce((acc: Record<string, number>, event: AnalyticsEvent) => {
      acc[event.pageUrl] = (acc[event.pageUrl] || 0) + 1;
      return acc;
    }, {});

  const popularPagesData = Object.entries(pageViewData)
    .map(([page, count]) => ({ name: page, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className={`space-y-6 ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {language === 'ar' ? 'تقرير التحليلات' : 'Analytics Report'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? 'تحليل نشاط الموقع ومشاركة المستخدم' 
              : 'Analyze site activity and user engagement'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <DatePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'تصدير PDF' : 'Export PDF'}
          </Button>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'ar' ? 'مشاهدات الصفحة' : 'Page Views'}
                </p>
                <p className="text-2xl font-bold">
                  {eventsData.filter((e: AnalyticsEvent) => e.eventType === 'pageView').length}
                </p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <BarChart className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'ar' ? 'اكتمال الاختبار' : 'Quiz Completions'}
                </p>
                <p className="text-2xl font-bold">
                  {eventsData.filter((e: AnalyticsEvent) => e.eventType === 'quizCompleted').length}
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <BarChart className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'ar' ? 'محادثات الدردشة' : 'Chat Sessions'}
                </p>
                <p className="text-2xl font-bold">
                  {eventsData.filter((e: AnalyticsEvent) => e.eventType === 'chatStarted').length}
                </p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <BarChart className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'ar' ? 'استمارات مقدمة' : 'Form Submissions'}
                </p>
                <p className="text-2xl font-bold">
                  {eventsData.filter((e: AnalyticsEvent) => e.eventType === 'formSubmission').length}
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <BarChart className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main chart */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>
                {language === 'ar' ? 'نظرة عامة على النشاط' : 'Activity Overview'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'نشاط الموقع على مدار الوقت' 
                  : 'Website activity over time'}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={chartType === 'bar' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setChartType('bar')}
              >
                <BarChart className="h-4 w-4" />
              </Button>
              <Button 
                variant={chartType === 'line' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setChartType('line')}
              >
                <BarChartHorizontal className="h-4 w-4" />
              </Button>
              <Button 
                variant={chartType === 'area' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setChartType('area')}
              >
                <AreaChart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <RechartsBarChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    tickMargin={20}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pageViews" name={language === 'ar' ? 'مشاهدات الصفحة' : 'Page Views'} fill="#4E89AE" />
                  <Bar dataKey="quizStarts" name={language === 'ar' ? 'بدء الاختبار' : 'Quiz Starts'} fill="#FF5722" />
                  <Bar dataKey="quizCompletions" name={language === 'ar' ? 'اكتمال الاختبار' : 'Quiz Completions'} fill="#4CAF50" />
                  <Bar dataKey="formSubmissions" name={language === 'ar' ? 'استمارات مقدمة' : 'Form Submissions'} fill="#2196F3" />
                  <Bar dataKey="chatSessions" name={language === 'ar' ? 'محادثات الدردشة' : 'Chat Sessions'} fill="#9C27B0" />
                </RechartsBarChart>
              ) : chartType === 'line' ? (
                <LineChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    tickMargin={20}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pageViews" name={language === 'ar' ? 'مشاهدات الصفحة' : 'Page Views'} stroke="#4E89AE" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="quizStarts" name={language === 'ar' ? 'بدء الاختبار' : 'Quiz Starts'} stroke="#FF5722" />
                  <Line type="monotone" dataKey="quizCompletions" name={language === 'ar' ? 'اكتمال الاختبار' : 'Quiz Completions'} stroke="#4CAF50" />
                  <Line type="monotone" dataKey="formSubmissions" name={language === 'ar' ? 'استمارات مقدمة' : 'Form Submissions'} stroke="#2196F3" />
                  <Line type="monotone" dataKey="chatSessions" name={language === 'ar' ? 'محادثات الدردشة' : 'Chat Sessions'} stroke="#9C27B0" />
                </LineChart>
              ) : (
                <RechartsAreaChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    tickMargin={20}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="pageViews" name={language === 'ar' ? 'مشاهدات الصفحة' : 'Page Views'} stackId="1" stroke="#4E89AE" fill="#4E89AE" />
                  <Area type="monotone" dataKey="quizStarts" name={language === 'ar' ? 'بدء الاختبار' : 'Quiz Starts'} stackId="1" stroke="#FF5722" fill="#FF5722" />
                  <Area type="monotone" dataKey="quizCompletions" name={language === 'ar' ? 'اكتمال الاختبار' : 'Quiz Completions'} stackId="1" stroke="#4CAF50" fill="#4CAF50" />
                  <Area type="monotone" dataKey="formSubmissions" name={language === 'ar' ? 'استمارات مقدمة' : 'Form Submissions'} stackId="1" stroke="#2196F3" fill="#2196F3" />
                  <Area type="monotone" dataKey="chatSessions" name={language === 'ar' ? 'محادثات الدردشة' : 'Chat Sessions'} stackId="1" stroke="#9C27B0" fill="#9C27B0" />
                </RechartsAreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Event logs */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'سجلات الأحداث' : 'Event Logs'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' 
              ? 'سجل تفصيلي لنشاط المستخدم والأحداث' 
              : 'Detailed log of user activity and events'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-2 flex-grow max-w-md">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'ar' ? 'البحث في السجلات...' : 'Search logs...'}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={language === 'ar' ? 'نوع الحدث' : 'Event Type'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ar' ? 'جميع الأنواع' : 'All Types'}
                  </SelectItem>
                  <SelectItem value="pageView">
                    {language === 'ar' ? 'مشاهدة الصفحة' : 'Page View'}
                  </SelectItem>
                  <SelectItem value="formSubmission">
                    {language === 'ar' ? 'تقديم النموذج' : 'Form Submission'}
                  </SelectItem>
                  <SelectItem value="buttonClick">
                    {language === 'ar' ? 'نقرة الزر' : 'Button Click'}
                  </SelectItem>
                  <SelectItem value="quizStarted">
                    {language === 'ar' ? 'بدء الاختبار' : 'Quiz Started'}
                  </SelectItem>
                  <SelectItem value="quizCompleted">
                    {language === 'ar' ? 'اكتمال الاختبار' : 'Quiz Completed'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {language === 'ar' ? 'الوقت' : 'Time'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'نوع الحدث' : 'Event Type'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'المسار' : 'Path'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'العميل' : 'Client'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'جهاز' : 'Device'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'عنوان IP' : 'IP Address'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event: AnalyticsEvent) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono">
                        {event.timestamp.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div 
                            className="w-2 h-2 rounded-full mr-2" 
                            style={{ 
                              backgroundColor: 
                                eventTypeColors[event.eventType as keyof typeof eventTypeColors] || "#999" 
                            }}
                          ></div>
                          {formatEventType(event.eventType)}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">
                        {event.pageUrl}
                      </TableCell>
                      <TableCell>
                        {event.clientName || 
                          (language === 'ar' ? '(زائر)' : '(Visitor)')}
                      </TableCell>
                      <TableCell>
                        {event.userAgent}
                      </TableCell>
                      <TableCell className="font-mono">
                        {event.ipAddress}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <p className="mb-2 text-lg font-semibold">
                          {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ar' 
                            ? 'حاول تغيير معايير البحث أو عرض جميع الأحداث' 
                            : 'Try changing your search filters or view all events'}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsReport;