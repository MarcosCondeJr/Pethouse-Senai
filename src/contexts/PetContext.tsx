
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

// Definindo os tipos
export type Vaccine = {
  id: string;
  name: string;
  date: string;
  nextDate: string | null;
  veterinarian?: string;
  notes?: string;
};

export type Pet = {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed?: string;
  birthdate?: string;
  weight?: number;
  gender: 'male' | 'female';
  photo?: string;
  vaccines: Vaccine[];
};

export type Reminder = {
  id: string;
  petId: string;
  type: 'vaccine' | 'appointment' | 'medication';
  title: string;
  date: string;
  completed: boolean;
  notes?: string;
};

type PetContextType = {
  pets: Pet[];
  reminders: Reminder[];
  addPet: (pet: Omit<Pet, "id" | "vaccines">) => void;
  updatePet: (id: string, pet: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  addVaccine: (petId: string, vaccine: Omit<Vaccine, "id">) => void;
  updateVaccine: (petId: string, vaccineId: string, vaccine: Partial<Vaccine>) => void;
  deleteVaccine: (petId: string, vaccineId: string) => void;
  addReminder: (reminder: Omit<Reminder, "id">) => void;
  updateReminder: (id: string, reminder: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  completeReminder: (id: string) => void;
};

const PetContext = createContext<PetContextType | undefined>(undefined);

// Provider
export const PetProvider = ({ children }: { children: React.ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>(() => {
    const savedPets = localStorage.getItem('pets');
    return savedPets ? JSON.parse(savedPets) : [];
  });
  
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const savedReminders = localStorage.getItem('reminders');
    return savedReminders ? JSON.parse(savedReminders) : [];
  });

  const { toast } = useToast();

  // Persistir dados no localStorage
  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Gerar lembretes automáticos para vacinas
  useEffect(() => {
    const generateVaccineReminders = () => {
      let newReminders: Reminder[] = [];
      
      pets.forEach(pet => {
        pet.vaccines.forEach(vaccine => {
          if (vaccine.nextDate) {
            // Verificar se já existe um lembrete para esta vacina
            const existingReminder = reminders.find(
              r => r.type === 'vaccine' && r.title.includes(vaccine.name) && r.petId === pet.id
            );
            
            // Se não existir, criar um novo
            if (!existingReminder) {
              newReminders.push({
                id: crypto.randomUUID(),
                petId: pet.id,
                type: 'vaccine',
                title: `Vacina ${vaccine.name} para ${pet.name}`,
                date: vaccine.nextDate,
                completed: false,
                notes: `Revacinação para ${vaccine.name}`
              });
            }
          }
        });
      });
      
      if (newReminders.length > 0) {
        setReminders(prev => [...prev, ...newReminders]);
        toast({
          title: "Lembretes gerados",
          description: `${newReminders.length} novos lembretes de vacina foram criados.`
        });
      }
    };
    
    generateVaccineReminders();
  }, [pets, reminders, toast]);

  const addPet = (pet: Omit<Pet, "id" | "vaccines">) => {
    const newPet: Pet = {
      ...pet,
      id: crypto.randomUUID(),
      vaccines: []
    };
    setPets(prev => [...prev, newPet]);
    toast({
      title: "Pet adicionado",
      description: `${pet.name} foi adicionado com sucesso!`
    });
  };

  const updatePet = (id: string, petUpdates: Partial<Pet>) => {
    setPets(prev => prev.map(pet => 
      pet.id === id ? { ...pet, ...petUpdates } : pet
    ));
    toast({
      title: "Pet atualizado",
      description: "As informações do pet foram atualizadas com sucesso!"
    });
  };

  const deletePet = (id: string) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
    // Remover também todos os lembretes associados a este pet
    setReminders(prev => prev.filter(reminder => reminder.petId !== id));
    toast({
      title: "Pet removido",
      description: "O pet e todos os seus registros foram removidos com sucesso."
    });
  };

  const addVaccine = (petId: string, vaccine: Omit<Vaccine, "id">) => {
    const newVaccine: Vaccine = {
      ...vaccine,
      id: crypto.randomUUID()
    };
    
    setPets(prev => prev.map(pet => 
      pet.id === petId 
        ? { ...pet, vaccines: [...pet.vaccines, newVaccine] } 
        : pet
    ));
    
    // Adicionar lembrete automático para próxima dose se aplicável
    if (vaccine.nextDate) {
      const pet = pets.find(p => p.id === petId);
      if (pet) {
        addReminder({
          petId,
          type: 'vaccine',
          title: `Vacina ${vaccine.name} para ${pet.name}`,
          date: vaccine.nextDate,
          completed: false,
          notes: `Próxima dose de ${vaccine.name}`
        });
      }
    }
    
    toast({
      title: "Vacina registrada",
      description: `${vaccine.name} foi adicionada com sucesso à carteira de vacinação!`
    });
  };

  const updateVaccine = (petId: string, vaccineId: string, vaccineUpdates: Partial<Vaccine>) => {
    setPets(prev => prev.map(pet => 
      pet.id === petId 
        ? { 
            ...pet, 
            vaccines: pet.vaccines.map(v => 
              v.id === vaccineId ? { ...v, ...vaccineUpdates } : v
            ) 
          } 
        : pet
    ));
    
    toast({
      title: "Vacina atualizada",
      description: "O registro de vacinação foi atualizado com sucesso!"
    });
  };

  const deleteVaccine = (petId: string, vaccineId: string) => {
    setPets(prev => prev.map(pet => 
      pet.id === petId 
        ? { ...pet, vaccines: pet.vaccines.filter(v => v.id !== vaccineId) } 
        : pet
    ));
    
    toast({
      title: "Vacina removida",
      description: "O registro de vacinação foi removido com sucesso."
    });
  };

  const addReminder = (reminder: Omit<Reminder, "id">) => {
    const newReminder: Reminder = {
      ...reminder,
      id: crypto.randomUUID()
    };
    setReminders(prev => [...prev, newReminder]);
    
    toast({
      title: "Lembrete criado",
      description: `Um novo lembrete foi agendado para ${new Date(reminder.date).toLocaleDateString()}.`
    });
  };

  const updateReminder = (id: string, reminderUpdates: Partial<Reminder>) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, ...reminderUpdates } : reminder
    ));
    
    toast({
      title: "Lembrete atualizado",
      description: "O lembrete foi atualizado com sucesso!"
    });
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
    
    toast({
      title: "Lembrete removido",
      description: "O lembrete foi removido com sucesso."
    });
  };
  
  const completeReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, completed: true } : reminder
    ));
    
    toast({
      title: "Lembrete concluído",
      description: "O lembrete foi marcado como concluído."
    });
  };

  return (
    <PetContext.Provider value={{ 
      pets, 
      reminders,
      addPet, 
      updatePet, 
      deletePet, 
      addVaccine, 
      updateVaccine, 
      deleteVaccine, 
      addReminder, 
      updateReminder, 
      deleteReminder, 
      completeReminder
    }}>
      {children}
    </PetContext.Provider>
  );
};

// Hook para acessar o contexto
export const usePet = () => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return context;
};
