import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePet } from "@/contexts/PetContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Dog, Cat } from "lucide-react";

const PetsPage = () => {
  const { pets, addPet, deletePet } = usePet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    species: "dog",
    breed: "",
    birthdate: "",
    weight: 0,
    gender: "male",
  });

  const [petToDelete, setPetToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleOpenDeleteDialog = (petId: string) => {
    setPetToDelete(petId);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setPetToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const confirmDeletePet = () => {
    if (petToDelete) {
      deletePet(petToDelete);
      toast({
        title: "Pet removido",
        description: "O pet foi removido com sucesso.",
      });
      handleCloseDeleteDialog();
    }
  };

const handleAddPet = () => {
  // Validate required fields
  if (!newPet.name || !newPet.species) {
    toast({
      title: "Erro ao adicionar pet",
      description: "Nome e espécie são campos obrigatórios.",
      variant: "destructive",
    });
    return;
  }
  
  // Create the pet with required fields
  addPet({
    name: newPet.name,
    species: newPet.species,
    breed: newPet.breed || "",
    birthdate: newPet.birthdate || "",
    weight: newPet.weight || 0,
    gender: newPet.gender || "male",
  });
  
  // Reset form and close dialog
  setNewPet({
    name: "",
    species: "dog",
    breed: "",
    birthdate: "",
    weight: 0,
    gender: "male",
  });
  setIsDialogOpen(false);
  
  toast({
    title: "Pet adicionado com sucesso",
    description: `${newPet.name} foi adicionado à sua lista de pets.`,
  });
};

  const PetCard = ({ pet }: { pet: any }) => {
    const getPetBorderClass = () => {
      switch (pet.species) {
        case "dog":
          return "pet-card dog";
        case "cat":
          return "pet-card cat";
        default:
          return "pet-card other";
      }
    };

    return (
      <Card className={getPetBorderClass()}>
        <Navigation />
        <CardHeader>
          <CardTitle>{pet.name}</CardTitle>
          <CardDescription>
            {pet.species === "dog" ? "Cachorro" : pet.species === "cat" ? "Gato" : "Outro"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Raça: {pet.breed || "Não informada"}</p>
          <p>Data de Nascimento: {pet.birthdate ? new Date(pet.birthdate).toLocaleDateString() : "Não informada"}</p>
          <p>Peso: {pet.weight || "Não informado"} kg</p>
          <p>Gênero: {pet.gender === "male" ? "Macho" : "Fêmea"}</p>
        </CardContent>
        <div className="flex justify-between p-4">
          <Link to={`/vaccination-card/${pet.id}`}>
            <Button variant="secondary">Carteira de Vacinação</Button>
          </Link>
          <Button variant="destructive" onClick={() => handleOpenDeleteDialog(pet.id)}>
            Remover
          </Button>
          <Footer />
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meus Pets</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Adicionar Pet</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar um novo pet</DialogTitle>
              <DialogDescription>
                Preencha o formulário abaixo para adicionar um novo pet à sua lista.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={newPet.name}
                  onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="species" className="text-right">
                  Espécie
                </Label>
                <Select onValueChange={(value) => setNewPet({ ...newPet, species: value })} defaultValue={newPet.species}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Cachorro</SelectItem>
                    <SelectItem value="cat">Gato</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="breed" className="text-right">
                  Raça
                </Label>
                <Input
                  type="text"
                  id="breed"
                  value={newPet.breed}
                  onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="birthdate" className="text-right">
                  Data de Nascimento
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 pl-3 font-normal text-left",
                        !newPet.birthdate && "text-muted-foreground"
                      )}
                    >
                      {newPet.birthdate ? format(new Date(newPet.birthdate), "PPP") : <span>Selecione a data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center" side="bottom">
                    <Calendar
                      mode="single"
                      selected={newPet.birthdate ? new Date(newPet.birthdate) : undefined}
                      onSelect={(date) => setNewPet({ ...newPet, birthdate: date?.toISOString() || "" })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Peso (kg)
                </Label>
                <Input
                  type="number"
                  id="weight"
                  value={newPet.weight ? newPet.weight.toString() : ""}
                  onChange={(e) => setNewPet({ ...newPet, weight: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gênero
                </Label>
                <Select onValueChange={(value) => setNewPet({ ...newPet, gender: value })} defaultValue={newPet.gender}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Macho</SelectItem>
                    <SelectItem value="female">Fêmea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddPet}>Adicionar Pet</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remover Pet</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja remover este pet? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={handleCloseDeleteDialog}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeletePet}>
              Remover
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PetsPage;
