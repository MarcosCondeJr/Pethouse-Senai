import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Check, Dog, Syringe } from "lucide-react";
export const Reminders = () => {
  return <section className="py-20 bg-gray-50" id="reminders">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sistema de Lembretes Inteligentes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nunca mais esqueça datas importantes para a saúde do seu pet
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <Tabs defaultValue="vaccines" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-[acc] bg-accent-500">
              <TabsTrigger value="vaccines" className="text-sm md:text-base text-gray-950 bg-[a] bg-accent-500 hover:bg-accent-400">Vacinas</TabsTrigger>
              <TabsTrigger value="medications" className="text-sm md:text-base bg-gray-50 text-gray-950">Medicamentos</TabsTrigger>
              <TabsTrigger value="appointments" className="text-sm md:text-base text-gray-950 bg-gray-50">Consultas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vaccines" className="mt-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Syringe className="h-6 w-6 text-primary" />
                    Lembretes de Vacinação
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Nosso sistema envia lembretes personalizados com base na espécie, raça e idade do seu pet, garantindo que todas as vacinas importantes estejam em dia.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <ListItem text="Lembretes automáticos por e-mail ou SMS" />
                    <ListItem text="Calendário personalizado por espécie e idade" />
                    <ListItem text="Histórico completo de vacinação" />
                    <ListItem text="Informações detalhadas sobre cada vacina" />
                  </ul>
                  <Button className="bg-primary hover:bg-primary-600">
                    Configurar lembretes
                  </Button>
                </div>
                <div className="relative rounded-xl overflow-hidden">
                  <div className="bg-primary/10 absolute inset-0"></div>
                  <img src="https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Calendário de vacinas" className="w-full h-auto object-cover relative z-10 rounded-xl" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="medications" className="mt-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Dog className="h-6 w-6 text-secondary" />
                    Controle de Medicamentos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Acompanhe facilmente os medicamentos que seu pet precisa tomar, com lembretes de horários e dosagens para não perder nenhuma dose.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <ListItem text="Alertas para reposição de medicamentos" />
                    <ListItem text="Lembretes de horários de administração" />
                    <ListItem text="Registro de dosagens e períodos" />
                    <ListItem text="Instruções de administração" />
                  </ul>
                  <Button className="bg-secondary hover:bg-secondary-600">
                    Gerenciar medicamentos
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-xl p-6">
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Vermífugo Mensal</h4>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Em 3 dias</span>
                    </div>
                    <p className="text-sm text-gray-500">Dose: 1 comprimido</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Antipulgas</h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Em dia</span>
                    </div>
                    <p className="text-sm text-gray-500">Aplicar a cada 30 dias</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Vitamina B12</h4>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Atrasado</span>
                    </div>
                    <p className="text-sm text-gray-500">1ml por dia durante 5 dias</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments" className="mt-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-accent" />
                    Agendamento de Consultas
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Receba lembretes para consultas de rotina e exames periódicos, mantendo seu pet sempre com a saúde em dia.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <ListItem text="Sugestões para check-ups preventivos" />
                    <ListItem text="Integração com calendário pessoal" />
                    <ListItem text="Histórico de consultas anteriores" />
                    <ListItem text="Recomendações baseadas em idade e raça" />
                  </ul>
                  <Button className="bg-accent hover:bg-accent-600">
                    Agendar consultas
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <button className="text-sm py-1 px-3 rounded bg-primary text-white">&lt; Abril</button>
                    <h4 className="font-bold text-lg">Maio 2025</h4>
                    <button className="text-sm py-1 px-3 rounded bg-primary text-white">Junho &gt;</button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    <span className="text-xs text-gray-500">D</span>
                    <span className="text-xs text-gray-500">S</span>
                    <span className="text-xs text-gray-500">T</span>
                    <span className="text-xs text-gray-500">Q</span>
                    <span className="text-xs text-gray-500">Q</span>
                    <span className="text-xs text-gray-500">S</span>
                    <span className="text-xs text-gray-500">S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-sm">
                    {[...Array(31)].map((_, i) => {
                    if (i < 3) return <span key={i} className="p-2"></span>; // Empty cells
                    const day = i - 2;
                    const isConsultation = day === 15;
                    const isToday = day === 6;
                    return <span key={i} className={`p-2 rounded-full flex items-center justify-center ${isConsultation ? "bg-accent text-white" : isToday ? "border border-primary text-primary" : ""}`}>
                          {day}
                        </span>;
                  })}
                  </div>
                  <div className="mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-accent rounded-full"></span>
                      <span>Consulta veterinária - 15/05 às 14:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>;
};
interface ListItemProps {
  text: string;
}
const ListItem = ({
  text
}: ListItemProps) => <li className="flex items-start gap-2">
    <span className="mt-1">
      <Check className="h-5 w-5 text-green-500" />
    </span>
    <span className="text-[a] text-accent-500">{text}</span>
  </li>;