
import { useState } from "react";
import { usePet, Reminder } from "@/contexts/PetContext";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Plus, Bell, Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Schema de validação para o formulário de lembrete
const reminderFormSchema = z.object({
  petId: z.string({
    required_error: "Selecione um pet",
  }),
  type: z.enum(["vaccine", "appointment", "medication"], {
    required_error: "Selecione um tipo",
  }),
  title: z.string().min(2, "O título deve ter pelo menos 2 caracteres"),
  date: z.string().min(1, "A data é obrigatória"),
  notes: z.string().optional(),
});

type ReminderFormValues = z.infer<typeof reminderFormSchema>;

const ReminderPage = () => {
  const { pets, reminders, addReminder, updateReminder, deleteReminder, completeReminder } = usePet();
  const [isOpen, setIsOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      petId: "",
      type: "appointment",
      title: "",
      date: new Date().toISOString().split('T')[0],
      notes: "",
    },
  });

  const openAddDialog = () => {
    form.reset({
      petId: pets.length > 0 ? pets[0].id : "",
      type: "appointment",
      title: "",
      date: new Date().toISOString().split('T')[0],
      notes: "",
    });
    setEditingReminder(null);
    setIsOpen(true);
  };

  const openEditDialog = (reminder: Reminder) => {
    form.reset({
      petId: reminder.petId,
      type: reminder.type,
      title: reminder.title,
      date: reminder.date,
      notes: reminder.notes || "",
    });
    setEditingReminder(reminder);
    setIsOpen(true);
  };

  const onSubmit = (values: ReminderFormValues) => {
    if (editingReminder) {
      updateReminder(editingReminder.id, values);
    } else {
      addReminder({
        ...values,
        completed: false,
      });
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este lembrete?")) {
      deleteReminder(id);
    }
  };

  const handleComplete = (id: string) => {
    completeReminder(id);
  };

  // Filtragem de lembretes
  const filteredReminders = reminders.filter(reminder => {
    if (filter === "all") return true;
    if (filter === "pending") return !reminder.completed;
    if (filter === "completed") return reminder.completed;
    return true;
  });

  // Ordenar por data (mais próximo primeiro)
  const sortedReminders = [...filteredReminders].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Função para verificar se um lembrete está atrasado
  const isOverdue = (date: string) => {
    const reminderDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return reminderDate < today;
  };

  // Função para encontrar o nome do pet pelo ID
  const getPetName = (petId: string) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : "Pet desconhecido";
  };

  // Traduzir o tipo do lembrete
  const translateType = (type: string) => {
    switch (type) {
      case "vaccine": return "Vacina";
      case "appointment": return "Consulta";
      case "medication": return "Medicamento";
      default: return type;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Lembretes</h1>
            <div className="flex flex-wrap gap-2">
              <div className="flex rounded-md overflow-hidden">
                <button 
                  className={`px-4 py-2 ${filter === "all" ? "bg-primary text-white" : "bg-gray-200"}`}
                  onClick={() => setFilter("all")}
                >
                  Todos
                </button>
                <button 
                  className={`px-4 py-2 ${filter === "pending" ? "bg-primary text-white" : "bg-gray-200"}`}
                  onClick={() => setFilter("pending")}
                >
                  Pendentes
                </button>
                <button 
                  className={`px-4 py-2 ${filter === "completed" ? "bg-primary text-white" : "bg-gray-200"}`}
                  onClick={() => setFilter("completed")}
                >
                  Concluídos
                </button>
              </div>
              
              <Button onClick={openAddDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Lembrete
              </Button>
            </div>
          </div>

          {reminders.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-xl">
              <Bell className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">Nenhum lembrete</h3>
              <p className="text-gray-500 mt-2">
                Adicione lembretes para acompanhar as necessidades de saúde dos seus pets.
              </p>
              <Button variant="outline" onClick={openAddDialog} className="mt-4">
                Criar Lembrete
              </Button>
            </div>
          ) : sortedReminders.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-xl">
              <Check className="mx-auto h-16 w-16 text-green-500" />
              <h3 className="mt-4 text-lg font-semibold">Nenhum lembrete {filter === "pending" ? "pendente" : "concluído"}</h3>
              <p className="text-gray-500 mt-2">
                {filter === "pending" 
                  ? "Todos os seus lembretes foram concluídos. Parabéns!" 
                  : "Você ainda não concluiu nenhum lembrete."}
              </p>
              {filter !== "all" && (
                <Button variant="outline" onClick={() => setFilter("all")} className="mt-4">
                  Ver Todos
                </Button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Pet</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Observações</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedReminders.map((reminder) => (
                    <TableRow key={reminder.id} className={reminder.completed ? "bg-gray-50" : ""}>
                      <TableCell>
                        {reminder.completed ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="mr-1 h-3 w-3" />
                            Concluído
                          </span>
                        ) : isOverdue(reminder.date) ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Atrasado
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pendente
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{getPetName(reminder.petId)}</TableCell>
                      <TableCell>{translateType(reminder.type)}</TableCell>
                      <TableCell className="font-medium">{reminder.title}</TableCell>
                      <TableCell>
                        {new Date(reminder.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{reminder.notes || "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!reminder.completed && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 border-green-600"
                              onClick={() => handleComplete(reminder.id)}
                            >
                              <Check className="mr-1 h-3 w-3" />
                              Concluir
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openEditDialog(reminder)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(reminder.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      {/* Formulário para adicionar/editar lembrete */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingReminder ? "Editar Lembrete" : "Criar Novo Lembrete"}</DialogTitle>
            <DialogDescription>
              Crie um lembrete para não esquecer os cuidados com seu pet.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="petId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um pet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pets.map(pet => (
                          <SelectItem key={pet.id} value={pet.id}>
                            {pet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="vaccine">Vacina</SelectItem>
                        <SelectItem value="appointment">Consulta</SelectItem>
                        <SelectItem value="medication">Medicamento</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título*</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Vacina Antirrábica, Consulta de Rotina" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Input placeholder="Observações adicionais" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">{editingReminder ? "Salvar Alterações" : "Criar Lembrete"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ReminderPage;
