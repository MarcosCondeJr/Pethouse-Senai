
import { useState, useEffect } from "react";
import { usePet, Pet, Vaccine } from "@/contexts/PetContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Plus, ArrowDown, ArrowUp, Syringe } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Schema de validação para o formulário de vacina
const vaccineFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  date: z.string().min(1, "A data é obrigatória"),
  nextDate: z.string().optional(),
  veterinarian: z.string().optional(),
  notes: z.string().optional(),
});

type VaccineFormValues = z.infer<typeof vaccineFormSchema>;

const VaccinationCardPage = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const { pets, addVaccine, updateVaccine, deleteVaccine } = usePet();
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<Vaccine | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Vaccine;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const form = useForm<VaccineFormValues>({
    resolver: zodResolver(vaccineFormSchema),
    defaultValues: {
      name: "",
      date: new Date().toISOString().split('T')[0],
      nextDate: "",
      veterinarian: "",
      notes: "",
    },
  });

  // Encontrar o pet atual
  useEffect(() => {
    if (petId) {
      const pet = pets.find(p => p.id === petId);
      if (pet) {
        setCurrentPet(pet);
      } else {
        navigate("/pets");
      }
    } else if (pets.length > 0) {
      setCurrentPet(pets[0]);
    }
  }, [petId, pets, navigate]);

  const openAddDialog = () => {
    form.reset({
      name: "",
      date: new Date().toISOString().split('T')[0],
      nextDate: "",
      veterinarian: "",
      notes: "",
    });
    setEditingVaccine(null);
    setIsOpen(true);
  };

  const openEditDialog = (vaccine: Vaccine) => {
    form.reset({
      name: vaccine.name,
      date: vaccine.date,
      nextDate: vaccine.nextDate || "",
      veterinarian: vaccine.veterinarian || "",
      notes: vaccine.notes || "",
    });
    setEditingVaccine(vaccine);
    setIsOpen(true);
  };

  const onSubmit = (values: VaccineFormValues) => {
    if (!currentPet) return;
    
    if (editingVaccine) {
      updateVaccine(currentPet.id, editingVaccine.id, values);
    } else {
      addVaccine(currentPet.id, values);
    }
    setIsOpen(false);
  };

  const handleDelete = (vaccineId: string) => {
    if (!currentPet) return;
    
    if (confirm("Tem certeza que deseja remover este registro de vacina?")) {
      deleteVaccine(currentPet.id, vaccineId);
    }
  };

  // Função para ordenar as vacinas
  const handleSort = (key: keyof Vaccine) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedVaccines = currentPet ? [...currentPet.vaccines].sort((a, b) => {
    if (!sortConfig) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  }) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Carteira de Vacinação</h1>
              {currentPet && <p className="text-gray-600">Pet: {currentPet.name}</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              {pets.length > 1 && (
                <select 
                  className="px-3 py-2 border rounded-md"
                  value={currentPet?.id || ""}
                  onChange={(e) => navigate(`/vaccination-card/${e.target.value}`)}
                >
                  {pets.map(pet => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name}
                    </option>
                  ))}
                </select>
              )}
              
              {currentPet && (
                <Button onClick={openAddDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Vacina
                </Button>
              )}
            </div>
          </div>

          {!currentPet && (
            <div className="text-center py-12 border-2 border-dashed rounded-xl">
              <Syringe className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">Nenhum pet cadastrado</h3>
              <p className="text-gray-500 mt-2">Adicione um pet primeiro para registrar suas vacinas.</p>
              <Link to="/pets">
                <Button variant="outline" className="mt-4">
                  Adicionar Pet
                </Button>
              </Link>
            </div>
          )}

          {currentPet && currentPet.vaccines.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed rounded-xl">
              <Syringe className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">Nenhuma vacina registrada</h3>
              <p className="text-gray-500 mt-2">Registre as vacinas do seu pet para manter seu histórico atualizado.</p>
              <Button variant="outline" onClick={openAddDialog} className="mt-4">
                Registrar Vacina
              </Button>
            </div>
          )}

          {currentPet && currentPet.vaccines.length > 0 && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                      <div className="flex items-center">
                        Vacina
                        {sortConfig?.key === 'name' && (
                          sortConfig.direction === 'ascending' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
                      <div className="flex items-center">
                        Data
                        {sortConfig?.key === 'date' && (
                          sortConfig.direction === 'ascending' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Próxima Dose</TableHead>
                    <TableHead>Veterinário</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedVaccines.map((vaccine) => (
                    <TableRow key={vaccine.id}>
                      <TableCell className="font-medium">{vaccine.name}</TableCell>
                      <TableCell>{new Date(vaccine.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {vaccine.nextDate 
                          ? new Date(vaccine.nextDate).toLocaleDateString()
                          : "Não programada"}
                      </TableCell>
                      <TableCell>{vaccine.veterinarian || "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openEditDialog(vaccine)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(vaccine.id)}
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

      {/* Formulário para adicionar/editar vacina */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingVaccine ? "Editar Vacina" : "Adicionar Vacina"}</DialogTitle>
            <DialogDescription>
              Registre os dados da vacinação do seu pet.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Vacina*</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Antirrábica, V10" {...field} />
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
                    <FormLabel>Data da Aplicação*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="nextDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data da Próxima Dose</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="veterinarian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veterinário Responsável</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do veterinário" {...field} />
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
                      <Input placeholder="Observações sobre a vacina" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">{editingVaccine ? "Salvar Alterações" : "Registrar Vacina"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default VaccinationCardPage;
