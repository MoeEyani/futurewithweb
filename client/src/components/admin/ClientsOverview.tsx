import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Client } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Search, 
  Plus, 
  ArrowUpRight, 
  Filter,
  Users,
  Building,
  Calendar
} from "lucide-react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

type ClientStatus = 'New' | 'Active' | 'Inactive' | 'Completed' | string;

const statusColors: Record<ClientStatus, string> = {
  'New': 'bg-blue-500',
  'Active': 'bg-green-500',
  'Inactive': 'bg-amber-500',
  'Completed': 'bg-purple-500',
  'default': 'bg-slate-500'
};

const ClientsOverview: React.FC = () => {
  const { language } = useContext(AppContext);
  const isRtl = language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const dateLocale = language === 'ar' ? ar : enUS;

  const { data: clients, isLoading, error } = useQuery<Client[]>({
    queryKey: ['/api/clients'],
  });

  // Filter clients based on search and filters
  const filteredClients = clients?.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || client.industry === industryFilter;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  // Extract unique industries for filter
  const industries = clients 
    ? Array.from(new Set(clients.filter(c => c.industry).map(c => c.industry))) 
    : [];

  // Count clients by status
  const statusCounts = clients?.reduce((counts: Record<string, number>, client) => {
    const status = client.status || 'Unknown';
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  // Count clients by industry
  const industryCounts = clients?.reduce((counts: Record<string, number>, client) => {
    const industry = client.industry || 'Unknown';
    counts[industry] = (counts[industry] || 0) + 1;
    return counts;
  }, {});

  const formatClientDate = (date: Date) => {
    return format(new Date(date), 'PP', { locale: dateLocale });
  };

  // Stats cards
  const Stats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {language === 'ar' ? 'إجمالي العملاء' : 'Total Clients'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="text-2xl font-bold">{clients?.length || 0}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {language === 'ar' ? 'العملاء النشطون' : 'Active Clients'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ArrowUpRight className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="text-2xl font-bold">{statusCounts?.['Active'] || 0}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {language === 'ar' ? 'الصناعات' : 'Industries'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="text-2xl font-bold">{industries.length || 0}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {language === 'ar' ? 'عملاء جدد (هذا الشهر)' : 'New This Month'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="text-2xl font-bold">
              {clients?.filter(c => {
                const now = new Date();
                const clientDate = new Date(c.initialContactDate);
                return clientDate.getMonth() === now.getMonth() && 
                       clientDate.getFullYear() === now.getFullYear();
              }).length || 0}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {language === 'ar' ? 'العملاء' : 'Clients'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? 'إدارة ومراقبة جميع العملاء ورحلاتهم' 
              : 'Manage and monitor all clients and their journeys'}
          </p>
        </div>
        <Button className="mt-4 sm:mt-0" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {language === 'ar' ? 'إضافة عميل جديد' : 'Add New Client'}
        </Button>
      </div>

      <Stats />

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>
            {language === 'ar' ? 'عملاء الشركة' : 'Company Clients'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' 
              ? 'عرض وتصفية وإدارة جميع العملاء' 
              : 'View, filter and manage all clients'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`} />
              <Input 
                placeholder={language === 'ar' ? 'بحث العملاء...' : 'Search clients...'}
                className={`${isRtl ? 'pr-10' : 'pl-10'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-[150px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={language === 'ar' ? 'الحالة' : 'Status'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'ar' ? 'كل الحالات' : 'All Statuses'}</SelectItem>
                    <SelectItem value="New">{language === 'ar' ? 'جديد' : 'New'}</SelectItem>
                    <SelectItem value="Active">{language === 'ar' ? 'نشط' : 'Active'}</SelectItem>
                    <SelectItem value="Inactive">{language === 'ar' ? 'غير نشط' : 'Inactive'}</SelectItem>
                    <SelectItem value="Completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[150px]">
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger>
                    <Building className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={language === 'ar' ? 'الصناعة' : 'Industry'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'ar' ? 'كل الصناعات' : 'All Industries'}</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="py-10 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-muted-foreground">
                {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
              </p>
            </div>
          ) : error ? (
            <div className="py-10 text-center text-red-500">
              {language === 'ar' 
                ? 'حدث خطأ أثناء تحميل البيانات.' 
                : 'Error loading data.'}
            </div>
          ) : (
            <>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'ar' ? 'اسم العميل' : 'Client Name'}</TableHead>
                      <TableHead>{language === 'ar' ? 'الشركة' : 'Company'}</TableHead>
                      <TableHead>{language === 'ar' ? 'الصناعة' : 'Industry'}</TableHead>
                      <TableHead>{language === 'ar' ? 'حالة العميل' : 'Status'}</TableHead>
                      <TableHead>{language === 'ar' ? 'تاريخ التواصل الأول' : 'Initial Contact'}</TableHead>
                      <TableHead className="text-right">{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center h-32">
                          <p className="text-muted-foreground mb-1">
                            {language === 'ar' ? 'لم يتم العثور على عملاء' : 'No clients found'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'ar' 
                              ? 'حاول تغيير المعايير أو إضافة عملاء جدد' 
                              : 'Try changing your filters or add new clients'}
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredClients?.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-xs text-muted-foreground">{client.email}</div>
                          </TableCell>
                          <TableCell>{client.company}</TableCell>
                          <TableCell>{client.industry || '-'}</TableCell>
                          <TableCell>
                            <Badge className={`${statusColors[client.status as ClientStatus] || statusColors.default} text-white`}>
                              {client.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatClientDate(client.initialContactDate)}</TableCell>
                          <TableCell className="text-right">
                            <Link href={`/admin/clients/${client.id}`}>
                              <Button variant="ghost" size="sm">
                                {language === 'ar' ? 'عرض الرحلة' : 'View Journey'}
                                <ArrowUpRight className={`h-4 w-4 ${isRtl ? 'mr-2' : 'ml-2'}`} />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                {language === 'ar' 
                  ? `عرض ${filteredClients?.length || 0} من ${clients?.length || 0} عميل` 
                  : `Showing ${filteredClients?.length || 0} of ${clients?.length || 0} clients`}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              {language === 'ar' ? 'العملاء حسب الحالة' : 'Clients by Status'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statusCounts && Object.keys(statusCounts).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div key={status} className="flex items-center gap-4">
                    <Badge className={`${statusColors[status as ClientStatus] || statusColors.default} text-white w-24 justify-center`}>
                      {status}
                    </Badge>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className={`${statusColors[status as ClientStatus] || statusColors.default} h-3 rounded-full`}
                        style={{ width: `${(count / (clients?.length || 1)) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right font-bold">{count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                {language === 'ar' ? 'لا توجد بيانات متاحة' : 'No data available'}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              {language === 'ar' ? 'العملاء حسب الصناعة' : 'Clients by Industry'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {industryCounts && Object.keys(industryCounts).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(industryCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([industry, count]) => (
                    <div key={industry} className="flex items-center gap-4">
                      <div className="w-24 truncate">{industry}</div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className="bg-primary h-3 rounded-full"
                          style={{ width: `${(count / (clients?.length || 1)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-right font-bold">{count}</div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                {language === 'ar' ? 'لا توجد بيانات متاحة' : 'No data available'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientsOverview;