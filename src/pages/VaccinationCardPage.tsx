import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePet } from "@/contexts/PetContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const VaccinationCardPage = () => {
  const { petId } = useParams<{ petId: string }>();
  const { pets, addVaccine } = usePet();
  const [pet, setPet] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [vaccineData, setVaccineData] = useState({
    name: "",
    date: "",
    nextDate: "",
    veterinarian: "",
    notes: "",
  });

  useEffect(() => {
    if (petId && pets) {
      const foundPet = pets.find((p) => p.id === petId);
      setPet(foundPet);
    }
  }, [petId, pets]);

  if (!pet) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Carteira de Vacinação</h2>
        <p>Pet não encontrado. <Link to="/pets" className="text-blue-500">Voltar para a lista de pets</Link>.</p>
      </div>
    );
  }

  const handleAddVaccine = () => {
    // Validate required fields
    if (!vaccineData.name || !vaccineData.date) {
      toast({
        title: "Erro ao adicionar vacina",
        description: "Nome e data são campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Add vaccine with required fields
    addVaccine(pet.id, {
      name: vaccineData.name,
      date: vaccineData.date,
      nextDate: vaccineData.nextDate || "",
      veterinarian: vaccineData.veterinarian || "",
      notes: vaccineData.notes || "",
    });

    // Reset form and close dialog
    setVaccineData({
      name: "",
      date: "",
      nextDate: "",
      veterinarian: "",
      notes: "",
    });
    setIsDialogOpen(false);

    toast({
      title: "Vacina adicionada",
      description: "A vacina foi adicionada com sucesso.",
    });
  };

  const VaccineForm = () => {
    const [date, setDate] = useState<Date>();
    const [nextDate, setNextDate] = useState<Date>();

    return (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nome
          </Label>
          <Input id="name" value={vaccineData.name} onChange={(e) => setVaccineData({ ...vaccineData, name: e.target.value })} className="col-span-3" />
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
                  "col-span-3 pl-3 font-normal " +
                  (date ? "text-foreground" : "text-muted-foreground")
                }
              >
                {date ? format(date, "PPP") : <span>Escolher Data</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                onDayClick={(date) => {
                  setDate(date);
                  setVaccineData({ ...vaccineData, date: date.toISOString() });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="nextDate" className="text-right">
            Próxima Dose
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "col-span-3 pl-3 font-normal " +
                  (nextDate ? "text-foreground" : "text-muted-foreground")
                }
              >
                {nextDate ? format(nextDate, "PPP") : <span>Escolher Data</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={nextDate}
                onSelect={setNextDate}
                onDayClick={(nextDate) => {
                  setNextDate(nextDate);
                  setVaccineData({ ...vaccineData, nextDate: nextDate.toISOString() });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="veterinarian" className="text-right">
            Veterinário
          </Label>
          <Input id="veterinarian" value={vaccineData.veterinarian} onChange={(e) => setVaccineData({ ...vaccineData, veterinarian: e.target.value })} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="notes" className="text-right mt-2">
            Observações
          </Label>
          <Textarea id="notes" value={vaccineData.notes} onChange={(e) => setVaccineData({ ...vaccineData, notes: e.target.value })} className="col-span-3" />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{pet.name} - Carteira de Vacinação</h2>
          <p className="text-gray-500">Gerencie as vacinas do seu pet.</p>
        </div>
        <Link to="/pets">
          <Button variant="outline">Voltar para Meus Pets</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vacinas Registradas</CardTitle>
          <CardDescription>Lista de todas as vacinas registradas para {pet.name}.</CardDescription>
        </CardHeader>
        <CardContent>
          {pet.vaccines && pet.vaccines.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vacina
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Próxima Dose
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Veterinário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Observações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pet.vaccines.map((vaccine, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vaccine.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vaccine.date ? new Date(vaccine.date).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vaccine.nextDate ? new Date(vaccine.nextDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vaccine.veterinarian || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vaccine.notes || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Nenhuma vacina registrada para este pet.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4">Adicionar Vacina</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Nova Vacina</DialogTitle>
            <DialogDescription>
              Adicione uma nova vacina à carteira de vacinação de {pet.name}.
            </DialogDescription>
          </DialogHeader>
          <VaccineForm />
          <Button className="mt-4" onClick={handleAddVaccine}>
            Salvar Vacina
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VaccinationCardPage;
