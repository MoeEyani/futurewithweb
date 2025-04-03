import { useState, useEffect } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientsOverview from "@/components/admin/ClientsOverview";
import ClientJourney from "@/components/admin/ClientJourney";
import AnalyticsReport from "@/components/admin/AnalyticsReport";
import JourneyStages from "@/components/admin/JourneyStages";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  BarChart3, 
  Users, 
  LayoutDashboard, 
  Route as RouteIcon,
  BarChartHorizontal, 
  Settings 
} from "lucide-react";

const queryClient = new QueryClient();

const AdminDashboard = () => {
  const [location, setLocation] = useLocation();
  const { language } = useContext(AppContext);
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  const isRtl = language === 'ar';

  // Handle location change based on tab
  useEffect(() => {
    if (location === "/admin") {
      setActiveTab("overview");
    } else if (location.startsWith("/admin/clients")) {
      setActiveTab("clients");
    } else if (location.startsWith("/admin/journey")) {
      setActiveTab("journey");
    } else if (location.startsWith("/admin/analytics")) {
      setActiveTab("analytics");
    } else if (location.startsWith("/admin/settings")) {
      setActiveTab("settings");
    }
  }, [location]);

  // Change location when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case "overview":
        setLocation("/admin");
        break;
      case "clients":
        setLocation("/admin/clients");
        break;
      case "journey":
        setLocation("/admin/journey");
        break;
      case "analytics":
        setLocation("/admin/analytics");
        break;
      case "settings":
        setLocation("/admin/settings");
        break;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${isRtl ? 'rtl' : 'ltr'}`}>
      <header className="bg-primary text-white py-4 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6" />
          <h1 className="text-xl font-bold">
            {language === 'ar' ? 'لوحة الإدارة' : 'Admin Dashboard'}
          </h1>
        </div>
        <Link href="/">
          <button className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 transition-colors">
            {language === 'ar' ? 'العودة إلى الموقع' : 'Back to Site'}
          </button>
        </Link>
      </header>

      <div className="flex flex-grow">
        {!isMobile && (
          <aside className={`w-64 bg-muted p-4 ${isRtl ? 'border-l' : 'border-r'} border-border`}>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link href="/admin">
                    <a className={`flex items-center gap-2 p-3 rounded-md hover:bg-muted-foreground/10 transition-colors ${activeTab === "overview" ? "bg-muted-foreground/20 font-medium" : ""}`}>
                      <LayoutDashboard className="h-5 w-5" />
                      <span>{language === 'ar' ? 'نظرة عامة' : 'Overview'}</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/clients">
                    <a className={`flex items-center gap-2 p-3 rounded-md hover:bg-muted-foreground/10 transition-colors ${activeTab === "clients" ? "bg-muted-foreground/20 font-medium" : ""}`}>
                      <Users className="h-5 w-5" />
                      <span>{language === 'ar' ? 'العملاء' : 'Clients'}</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/journey">
                    <a className={`flex items-center gap-2 p-3 rounded-md hover:bg-muted-foreground/10 transition-colors ${activeTab === "journey" ? "bg-muted-foreground/20 font-medium" : ""}`}>
                      <RouteIcon className="h-5 w-5" />
                      <span>{language === 'ar' ? 'مراحل الرحلة' : 'Journey Stages'}</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/analytics">
                    <a className={`flex items-center gap-2 p-3 rounded-md hover:bg-muted-foreground/10 transition-colors ${activeTab === "analytics" ? "bg-muted-foreground/20 font-medium" : ""}`}>
                      <BarChart3 className="h-5 w-5" />
                      <span>{language === 'ar' ? 'التحليلات' : 'Analytics'}</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/settings">
                    <a className={`flex items-center gap-2 p-3 rounded-md hover:bg-muted-foreground/10 transition-colors ${activeTab === "settings" ? "bg-muted-foreground/20 font-medium" : ""}`}>
                      <Settings className="h-5 w-5" />
                      <span>{language === 'ar' ? 'الإعدادات' : 'Settings'}</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        <main className="flex-grow p-6">
          {isMobile && (
            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
              <TabsList className="w-full grid grid-cols-5 mb-4">
                <TabsTrigger value="overview" className="flex flex-col items-center gap-1 p-1">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="text-xs">{language === 'ar' ? 'عامة' : 'Dashboard'}</span>
                </TabsTrigger>
                <TabsTrigger value="clients" className="flex flex-col items-center gap-1 p-1">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">{language === 'ar' ? 'العملاء' : 'Clients'}</span>
                </TabsTrigger>
                <TabsTrigger value="journey" className="flex flex-col items-center gap-1 p-1">
                  <RouteIcon className="h-4 w-4" />
                  <span className="text-xs">{language === 'ar' ? 'مراحل' : 'Journey'}</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex flex-col items-center gap-1 p-1">
                  <BarChartHorizontal className="h-4 w-4" />
                  <span className="text-xs">{language === 'ar' ? 'تحليلات' : 'Analytics'}</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex flex-col items-center gap-1 p-1">
                  <Settings className="h-4 w-4" />
                  <span className="text-xs">{language === 'ar' ? 'إعدادات' : 'Settings'}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          <QueryClientProvider client={queryClient}>
            <Switch>
              <Route path="/admin">
                <ClientsOverview />
              </Route>
              <Route path="/admin/clients">
                <ClientsOverview />
              </Route>
              <Route path="/admin/clients/:id">
                {(params) => <ClientJourney clientId={parseInt(params.id)} />}
              </Route>
              <Route path="/admin/journey">
                <JourneyStages />
              </Route>
              <Route path="/admin/analytics">
                <AnalyticsReport />
              </Route>
              <Route path="/admin/settings">
                <div className="p-4 bg-card rounded-lg shadow">
                  <h2 className="text-2xl font-bold mb-4">
                    {language === 'ar' ? 'الإعدادات' : 'Settings'}
                  </h2>
                  <p className="text-muted-foreground">
                    {language === 'ar' 
                      ? 'سيتم إضافة إعدادات إضافية قريبًا.' 
                      : 'Additional settings will be added soon.'}
                  </p>
                </div>
              </Route>
              <Route>
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <h2 className="text-2xl font-bold mb-2">
                    {language === 'ar' ? 'لم يتم العثور على الصفحة' : 'Page Not Found'}
                  </h2>
                  <Link href="/admin">
                    <a className="text-primary hover:underline">
                      {language === 'ar' ? 'العودة إلى لوحة التحكم' : 'Return to Dashboard'}
                    </a>
                  </Link>
                </div>
              </Route>
            </Switch>
          </QueryClientProvider>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;