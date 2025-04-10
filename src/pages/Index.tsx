
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Reminders } from "@/components/Reminders";
import { Guides } from "@/components/Guides";
import { Assistant } from "@/components/Assistant";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { usePet } from "@/contexts/PetContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dog, Syringe, Bell, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const { pets, reminders } = usePet();
  const [upcomingReminders, setUpcomingReminders] = useState<any[]>([]);
  
  // Encontrar lembretes dos próximos 7 dias
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    const upcoming = reminders
      .filter(r => !r.completed)
      .filter(r => {
        const reminderDate = new Date(r.date);
        return reminderDate >= today && reminderDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
    
    setUpcomingReminders(upcoming);
  }, [reminders]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        
        {/* Dashboard summary for logged in users */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Painel Pet House</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Pet summary card */}
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Dog className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Meus Pets</h3>
                </div>
                
                <div className="space-y-4">
                  {pets.length === 0 ? (
                    <p className="text-gray-500">Nenhum pet cadastrado ainda.</p>
                  ) : (
                    <ul className="space-y-2">
                      {pets.slice(0, 3).map(pet => (
                        <li key={pet.id} className="flex justify-between items-center">
                          <span>{pet.name}</span>
                          <span className="text-sm text-gray-500">{pet.species === 'dog' ? 'Cachorro' : pet.species === 'cat' ? 'Gato' : 'Outro'}</span>
                        </li>
                      ))}
                      {pets.length > 3 && (
                        <p className="text-sm text-gray-500">E mais {pets.length - 3} pets...</p>
                      )}
                    </ul>
                  )}
                </div>
                
                <Link to="/pets">
                  <Button className="w-full mt-4 bg-blue-500">
                    {pets.length === 0 ? "Adicionar Pet" : "Gerenciar Pets"}
                  </Button>
                </Link>
              </Card>
              
              {/* Vaccination card */}
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Syringe className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">Carteira de Vacinas</h3>
                </div>
                
                {pets.length === 0 ? (
                  <p className="text-gray-500">Adicione um pet para gerenciar vacinas.</p>
                ) : (
                  <>
                    <p className="mb-2">Total de vacinas registradas:</p>
                    {pets.map(pet => (
                      <div key={pet.id} className="flex justify-between items-center mb-2 text-sm">
                        <span>{pet.name}</span>
                        <span className="font-medium">{pet.vaccines.length} {pet.vaccines.length === 1 ? 'vacina' : 'vacinas'}</span>
                      </div>
                    ))}
                  </>
                )}
                
                <Link to={pets.length > 0 ? `/vaccination-card/${pets[0].id}` : "/pets"}>
                  <Button variant="secondary" className="w-full mt-4 bg-green-400">
                    {pets.length === 0 ? "Adicionar Pet" : "Ver Carteira de Vacinas"}
                  </Button>
                </Link>
              </Card>
              
              {/* Reminders card */}
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Bell className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Próximos Lembretes</h3>
                </div>
                
                <div className="space-y-3">
                  {upcomingReminders.length === 0 ? (
                    <p className="text-gray-500">Nenhum lembrete para os próximos 7 dias.</p>
                  ) : (
                    upcomingReminders.map(reminder => {
                      const pet = pets.find(p => p.id === reminder.petId);
                      return (
                        <div key={reminder.id} className="bg-gray-50 p-3 rounded-md">
                          <p className="font-medium">{reminder.title}</p>
                          <div className="flex justify-between text-sm">
                            <span>{pet?.name || "Pet desconhecido"}</span>
                            <span>{new Date(reminder.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                
                <Link to="/reminders">
                  <Button variant="outline" className="w-full mt-4 bg-orange-500 text-white">
                    {reminders.length === 0 ? "Criar Lembretes" : "Gerenciar Lembretes"}
                  </Button>
                </Link>
              </Card>
              
              {/* Assistant card */}
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Assistente Virtual</h3>
                </div>
                
                <p className="mb-4 text-gray-600">Tire suas dúvidas sobre a saúde do seu pet e receba orientações imediatas.</p>
                
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <p className="text-sm italic">
                    "O assistente virtual pode ajudar a identificar sintomas e avaliar quando é necessário buscar atendimento veterinário."
                  </p>
                </div>
                
                <Link to="/assistant">
                  <Button className="w-full bg-blue-500">
                    Conversar com o Assistente
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>
        
        <Features />
        <Reminders />
        <Guides />
        <Assistant />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
