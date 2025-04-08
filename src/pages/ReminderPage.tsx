import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePet } from "@/contexts/PetContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Dog, Cat, Syringe, Pill, Calendar as CalendarIcon, CheckCircle, AlertTriangle } from "lucide-react";

type ReminderType = "vaccine" | "medication" | "appointment" | "other";

interface Reminder {
  id: string;
  type: ReminderType;
  title: string;
  date: string;
  petId: string;
  notes: string;
  completed: boolean;
}

const ReminderPage = () => {
  const { pets, reminders, addReminder, updateReminder, deleteReminder } = usePet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reminderData, setReminderData] = useState<{
    type: ReminderType;
    title: string;
    date: string;
    notes: string;
    petId: string;
    completed: boolean;
  }>({
    type: "vaccine",
    title: "",
    date: "",
    notes: "",
    petId: "",
    completed: false,
  });
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editReminderData, setEditReminderData] = useState<Reminder>({
    id: "",
    type: "vaccine",
    title: "",
    date: "",
    notes: "",
    petId: "",
    completed: false,
  });
  const [completedReminders, setCompletedReminders] = useState<Reminder[]>([]);
  const [pendingReminders, setPendingReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    setCompletedReminders(reminders.filter(r => r.completed));
    setPendingReminders(reminders.filter(r => !r.completed));
  }, [reminders]);

  const handleAddReminder = () => {
    // Validate required fields
    if (!reminderData.type || !reminderData.title || !reminderData.date || !reminderData.petId) {
      toast({
        title: "Erro ao adicionar lembrete",
        description: "Tipo, título, data e pet são campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Create reminder with required fields
    addReminder({
      completed: false,
      type: reminderData.type,
      title: reminderData.title,
      date: reminderData.date,
      notes: reminderData.notes || "",
      petId: reminderData.petId,
    });

    // Reset form and close dialog
    setReminderData({
      type: "vaccine",
      title: "",
      date: "",
      notes: "",
      petId: "",
      completed: false,
    });
    setIsDialogOpen(false);

    toast({
      title: "Lembrete adicionado",
      description: "O lembrete foi adicionado com sucesso.",
    });
  };

  const handleEditReminder = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setEditReminderData({
      id: reminder.id,
      type: reminder.type,
      title: reminder.title,
      date: reminder.date,
      notes: reminder.notes,
      petId: reminder.petId,
      completed: reminder.completed,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateReminder = () => {
    if (!editReminderData.type || !editReminderData.title || !editReminderData.date || !editReminderData.petId) {
      toast({
        title: "Erro ao atualizar lembrete",
        description: "Tipo, título, data e pet são campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    updateReminder(editReminderData);

    setIsEditModalOpen(false);
    toast({
      title: "Lembrete atualizado",
      description: "O lembrete foi atualizado com sucesso.",
    });
  };

  const handleDeleteReminder = (id: string) => {
    deleteReminder(id);
    toast({
      title: "Lembrete excluído",
      description: "O lembrete foi excluído com sucesso.",
    });
  };

  const handleCompleteToggle = (id: string, completed: boolean) => {
    const reminderToUpdate = reminders.find(r => r.id === id);
    if (reminderToUpdate) {
      updateReminder({
        ...reminderToUpdate,
        completed: completed,
      });
    }
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto py-12">
        <div className="flex justify-between items-center mb-28">
          <h1 className="text-3xl font-bold">Lembretes</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600">Adicionar Lembrete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Lembrete</DialogTitle>
                <DialogDescription>
                  Adicione um novo lembrete para o seu pet.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipo
                  </Label>
                  <Select onValueChange={(value) => setReminderData({ ...reminderData, type: value })} defaultValue={reminderData.type} >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vaccine">Vacina</SelectItem>
                      <SelectItem value="medication">Medicação</SelectItem>
                      <SelectItem value="appointment">Consulta</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Título
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    value={reminderData.title}
                    onChange={(e) => setReminderData({ ...reminderData, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Data
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={
                          "col-span-3 justify-start text-left font-normal" +
                          (reminderData.date ? "pl-3" : "text-muted-foreground")
                        }
                      >
                        {reminderData.date ? (
                          format(new Date(reminderData.date), "PPP")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={reminderData.date ? new Date(reminderData.date) : undefined}
                        onSelect={(date) => setReminderData({ ...reminderData, date: date?.toISOString() || "" })}
                        disabled={(date) =>
                          date > new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pet" className="text-right">
                    Pet
                  </Label>
                  <Select onValueChange={(value) => setReminderData({ ...reminderData, petId: value })} >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o pet" />
                    </SelectTrigger>
                    <SelectContent>
                      {pets.map((pet) => (
                        <SelectItem key={pet.id} value={pet.id}>{pet.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="notes" className="text-right mt-2">
                    Observações
                  </Label>
                  <Textarea
                    id="notes"
                    value={reminderData.notes}
                    onChange={(e) => setReminderData({ ...reminderData, notes: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleAddReminder} className="bg-blue-600">Adicionar Lembrete</Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Pending Reminders */}
        {pendingReminders.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Próximos Lembretes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingReminders.map((reminder) => {
                const pet = pets.find(p => p.id === reminder.petId);
                return (
                  <Card key={reminder.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xl font-bold">{reminder.title}</CardTitle>
                      <Checkbox
                        id={`complete-${reminder.id}`}
                        checked={reminder.completed}
                        onCheckedChange={(checked) => {
                          handleCompleteToggle(reminder.id, checked);
                        }}
                      />
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Tipo: {reminder.type}
                      </p>
                      <p className="text-gray-600">
                        Data: {new Date(reminder.date).toLocaleDateString()}
                      </p>
                      {pet && (
                        <p className="text-gray-600">
                          Pet: {pet.name} ({pet.species})
                        </p>
                      )}
                    </CardContent>
                    <div className="flex justify-end p-4 gap-2">
                      <Button className="bg-blue-600" size="sm" onClick={() => handleEditReminder(reminder)}>
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteReminder(reminder.id)}>
                        Excluir
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Completed Reminders */}
        {completedReminders.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Lembretes Concluídos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedReminders.map((reminder) => {
                const pet = pets.find(p => p.id === reminder.petId);
                return (
                  <Card key={reminder.id} className="bg-gray-100 shadow-md rounded-lg overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xl font-bold line-through">{reminder.title}</CardTitle>
                      <Checkbox
                        id={`complete-${reminder.id}`}
                        checked={reminder.completed}
                        onCheckedChange={(checked) => {
                          handleCompleteToggle(reminder.id, checked);
                        }}
                      />
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-through">
                        Tipo: {reminder.type}
                      </p>
                      <p className="text-gray-600 line-through">
                        Data: {new Date(reminder.date).toLocaleDateString()}
                      </p>
                      {pet && (
                        <p className="text-gray-600 line-through">
                          Pet: {pet.name} ({pet.species})
                        </p>
                      )}
                    </CardContent>
                    <div className="flex justify-end p-4">
                      <Button variant="secondary" size="sm" onClick={() => handleEditReminder(reminder)}>
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteReminder(reminder.id)}>
                        Excluir
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Edit Reminder Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Lembrete</DialogTitle>
              <DialogDescription>
                Edite os detalhes do lembrete.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Select onValueChange={(value) => setEditReminderData({ ...editReminderData, type: value })} defaultValue={editReminderData.type} >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vaccine">Vacina</SelectItem>
                    <SelectItem value="medication">Medicação</SelectItem>
                    <SelectItem value="appointment">Consulta</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  type="text"
                  id="title"
                  value={editReminderData.title}
                  onChange={(e) => setEditReminderData({ ...editReminderData, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Data
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={
                        "col-span-3 justify-start text-left font-normal" +
                        (editReminderData.date ? "pl-3" : "text-muted-foreground")
                      }
                    >
                      {editReminderData.date ? (
                        format(new Date(editReminderData.date), "PPP")
                      ) : (
                        <span>Selecione a data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={editReminderData.date ? new Date(editReminderData.date) : undefined}
                      onSelect={(date) => setEditReminderData({ ...editReminderData, date: date?.toISOString() || "" })}
                      disabled={(date) =>
                        date > new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pet" className="text-right">
                  Pet
                </Label>
                <Select onValueChange={(value) => setEditReminderData({ ...editReminderData, petId: value })} defaultValue={editReminderData.petId} >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o pet" />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>{pet.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right mt-2">
                  Observações
                </Label>
                <Textarea
                  id="notes"
                  value={editReminderData.notes}
                  onChange={(e) => setEditReminderData({ ...editReminderData, notes: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleUpdateReminder}>Atualizar Lembrete</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default ReminderPage;
