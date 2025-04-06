
import { useState } from "react";
import { usePet, Pet } from "@/contexts/PetContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Dog } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
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

// Schema de validação para o formulário
const petFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  species: z.enum(["dog", "cat", "other"], {
    required_error: "Selecione uma espécie",
  }),
  breed: z.string().optional(),
  birthdate: z.string().optional(),
  weight: z.number().positive().optional(),
  gender: z.enum(["male", "female"], {
    required_error: "Selecione o gênero",
  }),
});

type PetFormValues = z.infer<typeof petFormSchema>;

const PetsPage = () => {
  const { pets, addPet, updatePet, deletePet } = usePet();
  const [isOpen, setIsOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const form = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: "",
      species: "dog",
      breed: "",
      birthdate: "",
      weight: undefined,
      gender: "male",
    },
  });

  const openAddDialog = () => {
    form.reset();
    setEditingPet(null);
    setIsOpen(true);
  };

  const openEditDialog = (pet: Pet) => {
    form.reset({
      name: pet.name,
      species: pet.species,
      breed: pet.breed || "",
      birthdate: pet.birthdate || "",
      weight: pet.weight,
      gender: pet.gender,
    });
    setEditingPet(pet);
    setIsOpen(true);
  };

  const onSubmit = (values: PetFormValues) => {
    if (editingPet) {
      updatePet(editingPet.id, values);
    } else {
      addPet(values);
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este pet? Todos os registros associados serão perdidos.")) {
      deletePet(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Meus Pets</h1>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Pet
            </Button>
          </div>

          {pets.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-xl">
              <Dog className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">Nenhum pet cadastrado</h3>
              <p className="text-gray-500 mt-2">Adicione seu primeiro pet para começar a gerenciar sua saúde.</p>
              <Button variant="outline" onClick={openAddDialog} className="mt-4">
                Adicionar Pet
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <Card key={pet.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{pet.name}</h3>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(pet)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Espécie:</strong> {pet.species === "dog" ? "Cachorro" : pet.species === "cat" ? "Gato" : "Outro"}</p>
                      {pet.breed && <p><strong>Raça:</strong> {pet.breed}</p>}
                      {pet.birthdate && <p><strong>Data de Nascimento:</strong> {new Date(pet.birthdate).toLocaleDateString()}</p>}
                      {pet.weight && <p><strong>Peso:</strong> {pet.weight} kg</p>}
                      <p><strong>Gênero:</strong> {pet.gender === "male" ? "Macho" : "Fêmea"}</p>
                      <p><strong>Vacinas:</strong> {pet.vaccines.length}</p>
                    </div>
                    
                    <div className="mt-6 flex space-x-3">
                      <Link to={`/vaccination-card/${pet.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">Carteira de Vacinas</Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleDelete(pet.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Formulário para adicionar/editar pet */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingPet ? "Editar Pet" : "Adicionar Novo Pet"}</DialogTitle>
            <DialogDescription>
              Preencha os dados do seu pet. Todos os campos com * são obrigatórios.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do pet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Espécie*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a espécie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dog">Cachorro</SelectItem>
                        <SelectItem value="cat">Gato</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raça</FormLabel>
                    <FormControl>
                      <Input placeholder="Raça do pet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (kg)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1" 
                        placeholder="Peso em kg"
                        value={field.value || ''} 
                        onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gênero*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o gênero" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Macho</SelectItem>
                        <SelectItem value="female">Fêmea</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">{editingPet ? "Salvar Alterações" : "Adicionar Pet"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default PetsPage;
