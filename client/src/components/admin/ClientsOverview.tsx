import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Users, 
  Search, 
  MoreHorizontal, 
  UserPlus, 
  Eye, 
  Building, 
  UserCheck 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

// Mock client data
const clients = [
  {
    id: 1,
    name: "Ahmed Al-Farsi",
    company: "TechVision Arabia",
    industry: "Technology",
    status: "active",
    initialContact: new Date(2023, 3, 15),
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Gulf Logistics Group",
    industry: "Logistics",
    status: "active",
    initialContact: new Date(2023, 5, 22),
  },
  {
    id: 3,
    name: "Mohammed Al-Qahtani",
    company: "Sands Investment Group",
    industry: "Finance",
    status: "completed",
    initialContact: new Date(2023, 1, 8),
  },
  {
    id: 4,
    name: "Fatima Al-Suwaidi",
    company: "Emirates Healthcare",
    industry: "Healthcare",
    status: "inactive",
    initialContact: new Date(2023, 7, 3),
  },
  {
    id: 5,
    name: "John Smith",
    company: "Global Retail Solutions",
    industry: "Retail",
    status: "new",
    initialContact: new Date(2023, 10, 1),
  },
];

// Analytics data
const statusData = [
  { name: "Active", value: 35, color: "#4E89AE" },
  { name: "Completed", value: 20, color: "#43A047" },
  { name: "New", value: 15, color: "#F59E0B" },
  { name: "Inactive", value: 10, color: "#787878" },
];

const industryData = [
  { name: "Technology", value: 25, color: "#4E89AE" },
  { name: "Finance", value: 20, color: "#43658B" },
  { name: "Healthcare", value: 18, color: "#ed6a5e" },
  { name: "Retail", value: 15, color: "#f4a261" },
  { name: "Logistics", value: 12, color: "#2a9d8f" },
  { name: "Other", value: 10, color: "#787878" },
];

const ClientsOverview = () => {
  const [, setLocation] = useLocation();
  const { language } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  
  const isRtl = language === 'ar';
  
  // Filter clients based on search and filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.company.toLowerCase().includes(search.toLowerCase()) ||
      client.industry.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesIndustry = industryFilter === "all" || client.industry === industryFilter;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });
  
  // Get unique industries for filter
  const uniqueIndustries = new Set<string>();
  clients.forEach(client => uniqueIndustries.add(client.industry));
  const industries = Array.from(uniqueIndustries);
  
  // Status badge variant based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">{language === 'ar' ? 'نشط' : 'Active'}</Badge>;
      case "completed":
        return <Badge className="bg-green-500">{language === 'ar' ? 'مكتمل' : 'Completed'}</Badge>;
      case "inactive":
        return <Badge variant="outline">{language === 'ar' ? 'غير نشط' : 'Inactive'}</Badge>;
      case "new":
        return <Badge className="bg-yellow-500">{language === 'ar' ? 'جديد' : 'New'}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Navigate to client journey
  const viewJourney = (clientId: number) => {
    setLocation(`/admin/clients/${clientId}`);
  };
  
  return (
    <div className={`space-y-6 ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'ar' ? 'إجمالي العملاء' : 'Total Clients'}
                </p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'ar' ? 'العملاء النشطون' : 'Active Clients'}
                </p>
                <p className="text-2xl font-bold">
                  {clients.filter((client) => client.status === "active").length}
                </p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'ar' ? 'الصناعات' : 'Industries'}
                </p>
                <p className="text-2xl font-bold">{industries.length}</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Building className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'ar' ? 'عملاء جدد (هذا الشهر)' : 'New This Month'}
                </p>
                <p className="text-2xl font-bold">
                  {clients.filter((client) => {
                    const now = new Date();
                    const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
                    return client.initialContact > monthAgo;
                  }).length}
                </p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Client list section */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'عملاء الشركة' : 'Company Clients'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' ? 'عرض وتصفية وإدارة جميع العملاء' : 'View, filter and manage all clients'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex gap-2 flex-grow max-w-md">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'ar' ? 'بحث العملاء...' : 'Search clients...'}
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue 
                    placeholder={language === 'ar' ? 'كل الحالات' : 'All Statuses'}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ar' ? 'كل الحالات' : 'All Statuses'}
                  </SelectItem>
                  <SelectItem value="active">
                    {language === 'ar' ? 'نشط' : 'Active'}
                  </SelectItem>
                  <SelectItem value="completed">
                    {language === 'ar' ? 'مكتمل' : 'Completed'}
                  </SelectItem>
                  <SelectItem value="inactive">
                    {language === 'ar' ? 'غير نشط' : 'Inactive'}
                  </SelectItem>
                  <SelectItem value="new">
                    {language === 'ar' ? 'جديد' : 'New'}
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue 
                    placeholder={language === 'ar' ? 'كل الصناعات' : 'All Industries'}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ar' ? 'كل الصناعات' : 'All Industries'}
                  </SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full md:w-auto">
              <UserPlus className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'إضافة عميل جديد' : 'Add New Client'}
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {language === 'ar' ? 'اسم العميل' : 'Client Name'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'الشركة' : 'Company'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'الصناعة' : 'Industry'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'تاريخ التواصل الأول' : 'Initial Contact'}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.company}</TableCell>
                      <TableCell>{client.industry}</TableCell>
                      <TableCell>{getStatusBadge(client.status)}</TableCell>
                      <TableCell>
                        {client.initialContact.toLocaleDateString(
                          language === 'ar' ? 'ar-SA' : 'en-US'
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => viewJourney(client.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>{language === 'ar' ? 'عرض الرحلة' : 'View Journey'}</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              {language === 'ar' ? 'تحرير العميل' : 'Edit Client'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <p className="mb-2 text-lg font-semibold">
                          {language === 'ar' ? 'لم يتم العثور على عملاء' : 'No clients found'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ar' 
                            ? 'حاول تغيير المعايير أو إضافة عملاء جدد' 
                            : 'Try changing your filters or add new clients'}
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
      
      {/* Analytics charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'العملاء حسب الحالة' : 'Clients by Status'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">
                    {language === 'ar' ? 'لا توجد بيانات متاحة' : 'No data available'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'العملاء حسب الصناعة' : 'Clients by Industry'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {industryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {industryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">
                    {language === 'ar' ? 'لا توجد بيانات متاحة' : 'No data available'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientsOverview;