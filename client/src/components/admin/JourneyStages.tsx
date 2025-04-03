import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { MoreHorizontal, PlusCircle, ChevronUp, ChevronDown, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define schema for journey stage
const journeyStageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  order: z.coerce.number().min(1, "Order must be at least 1"),
  color: z.string().min(1, "Color is required"),
  isActive: z.boolean().default(true),
});

type JourneyStage = {
  id: number;
  name: string;
  description: string | null;
  order: number;
  color: string;
  isActive: boolean;
};

const JourneyStages = () => {
  const { language } = useContext(AppContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<JourneyStage | null>(null);
  const isRtl = language === 'ar';

  // Fetch journey stages
  const { data: stages = [], isLoading, error } = useQuery({
    queryKey: ['/api/journey-stages'],
    select: (data: JourneyStage[]) => data.sort((a, b) => a.order - b.order),
  });

  // Form for adding/editing stages
  const form = useForm<z.infer<typeof journeyStageSchema>>({
    resolver: zodResolver(journeyStageSchema),
    defaultValues: {
      name: "",
      description: "",
      order: stages.length + 1,
      color: "#4E89AE",
      isActive: true,
    },
  });

  // Add new journey stage
  const addStageMutation = useMutation({
    mutationFn: (values: z.infer<typeof journeyStageSchema>) => {
      return apiRequest("/api/journey-stages", {
        method: "POST",
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/journey-stages'] });
      toast({
        title: language === 'ar' ? "تم الإضافة بنجاح" : "Successfully added",
        description: language === 'ar' ? "تمت إضافة مرحلة الرحلة الجديدة" : "New journey stage has been added",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "حدث خطأ أثناء إضافة مرحلة الرحلة" : "There was an error adding the journey stage",
        variant: "destructive",
      });
    },
  });

  // Update journey stage
  const updateStageMutation = useMutation({
    mutationFn: (data: { id: number; values: z.infer<typeof journeyStageSchema> }) => {
      return apiRequest(`/api/journey-stages/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.values),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/journey-stages'] });
      toast({
        title: language === 'ar' ? "تم التحديث بنجاح" : "Successfully updated",
        description: language === 'ar' ? "تم تحديث مرحلة الرحلة" : "Journey stage has been updated",
      });
      setIsDialogOpen(false);
      setEditingStage(null);
    },
    onError: () => {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "حدث خطأ أثناء تحديث مرحلة الرحلة" : "There was an error updating the journey stage",
        variant: "destructive",
      });
    },
  });

  // Change order mutation
  const changeOrderMutation = useMutation({
    mutationFn: (data: { id: number; newOrder: number }) => {
      return apiRequest(`/api/journey-stages/${data.id}/order`, {
        method: "PATCH",
        body: JSON.stringify({ order: data.newOrder }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/journey-stages'] });
    },
    onError: () => {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "حدث خطأ أثناء تغيير الترتيب" : "There was an error changing the order",
        variant: "destructive",
      });
    },
  });

  // Open dialog for adding new stage
  const openAddDialog = () => {
    form.reset({
      name: "",
      description: "",
      order: stages.length + 1,
      color: "#4E89AE",
      isActive: true,
    });
    setEditingStage(null);
    setIsDialogOpen(true);
  };

  // Open dialog for editing stage
  const openEditDialog = (stage: JourneyStage) => {
    form.reset({
      name: stage.name,
      description: stage.description || "",
      order: stage.order,
      color: stage.color,
      isActive: stage.isActive,
    });
    setEditingStage(stage);
    setIsDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = (values: z.infer<typeof journeyStageSchema>) => {
    if (editingStage) {
      updateStageMutation.mutate({ id: editingStage.id, values });
    } else {
      addStageMutation.mutate(values);
    }
  };

  // Move stage up or down
  const moveStage = (id: number, direction: "up" | "down") => {
    const stageIndex = stages.findIndex((s) => s.id === id);
    if (stageIndex === -1) return;

    const stage = stages[stageIndex];
    let newOrder: number;

    if (direction === "up" && stageIndex > 0) {
      const prevStage = stages[stageIndex - 1];
      newOrder = prevStage.order;
      changeOrderMutation.mutate({ id: stage.id, newOrder });
    } else if (direction === "down" && stageIndex < stages.length - 1) {
      const nextStage = stages[stageIndex + 1];
      newOrder = nextStage.order;
      changeOrderMutation.mutate({ id: stage.id, newOrder });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-medium">
          {language === 'ar' ? "خطأ في تحميل مراحل الرحلة" : "Error loading journey stages"}
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/journey-stages'] })}
        >
          {language === 'ar' ? "إعادة المحاولة" : "Try Again"}
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isRtl ? 'rtl' : 'ltr'}`}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {language === 'ar' ? 'مراحل رحلة العميل' : 'Client Journey Stages'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' 
                ? 'إدارة مراحل الرحلة التي يمر بها العملاء' 
                : 'Manage the stages clients go through in their journey'}
            </CardDescription>
          </div>
          <Button onClick={openAddDialog} className="flex gap-2 items-center">
            <PlusCircle className="h-4 w-4" />
            {language === 'ar' ? 'إضافة مرحلة' : 'Add Stage'}
          </Button>
        </CardHeader>
        <CardContent>
          {stages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg font-medium mb-2">
                {language === 'ar' ? 'لا توجد مراحل رحلة' : 'No journey stages yet'}
              </p>
              <p className="text-muted-foreground mb-6">
                {language === 'ar' 
                  ? 'أضف مراحل الرحلة لتتبع تقدم العملاء' 
                  : 'Add journey stages to track client progress'}
              </p>
              <Button onClick={openAddDialog}>
                {language === 'ar' ? 'إضافة أول مرحلة' : 'Add First Stage'}
              </Button>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      {language === 'ar' ? '#' : '#'}
                    </TableHead>
                    <TableHead>
                      {language === 'ar' ? 'الاسم' : 'Name'}
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      {language === 'ar' ? 'الوصف' : 'Description'}
                    </TableHead>
                    <TableHead className="w-24">
                      {language === 'ar' ? 'اللون' : 'Color'}
                    </TableHead>
                    <TableHead className="w-24">
                      {language === 'ar' ? 'الحالة' : 'Status'}
                    </TableHead>
                    <TableHead className="text-right">
                      {language === 'ar' ? 'الإجراءات' : 'Actions'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stages.map((stage) => (
                    <TableRow key={stage.id}>
                      <TableCell>{stage.order}</TableCell>
                      <TableCell className="font-medium">
                        {stage.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {stage.description || '-'}
                      </TableCell>
                      <TableCell>
                        <div 
                          className="w-6 h-6 rounded-full" 
                          style={{ backgroundColor: stage.color }}
                        ></div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          stage.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {stage.isActive 
                            ? (language === 'ar' ? 'نشط' : 'Active') 
                            : (language === 'ar' ? 'غير نشط' : 'Inactive')}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => moveStage(stage.id, "up")}
                            disabled={stage.order === 1}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => moveStage(stage.id, "down")}
                            disabled={stage.order === stages.length}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditDialog(stage)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {language === 'ar' ? 'تحرير' : 'Edit'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                {language === 'ar' ? 'حذف' : 'Delete'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog for adding/editing stages */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStage 
                ? (language === 'ar' ? 'تحرير مرحلة الرحلة' : 'Edit Journey Stage') 
                : (language === 'ar' ? 'إضافة مرحلة جديدة' : 'Add New Journey Stage')}
            </DialogTitle>
            <DialogDescription>
              {language === 'ar' 
                ? 'قم بتعبئة التفاصيل الخاصة بمرحلة رحلة العميل' 
                : 'Fill in the details for the client journey stage'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'ar' ? 'اسم المرحلة' : 'Stage Name'}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'ar' ? 'الوصف' : 'Description'}
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'ar' ? 'الترتيب' : 'Order'}
                      </FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'ar' ? 'اللون' : 'Color'}
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input type="color" {...field} className="w-12 h-10 p-1" />
                          <Input 
                            type="text" 
                            {...field} 
                            placeholder="#RRGGBB" 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {language === 'ar' ? 'نشط' : 'Active'}
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' 
                          ? 'المراحل النشطة فقط ستظهر في تتبع تقدم العميل' 
                          : 'Only active stages will appear in client progress tracking'}
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button 
                  type="submit"
                  disabled={addStageMutation.isPending || updateStageMutation.isPending}
                >
                  {(addStageMutation.isPending || updateStageMutation.isPending) ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      {language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
                    </span>
                  ) : editingStage ? (
                    language === 'ar' ? 'تحديث' : 'Update'
                  ) : (
                    language === 'ar' ? 'إضافة' : 'Add'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JourneyStages;