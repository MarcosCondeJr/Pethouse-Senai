
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Assistant = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50" id="assistant">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Assistente Virtual Inteligente</h2>
            <p className="text-lg text-gray-600">
              Avaliação de sintomas e orientações imediatas para ajudar a cuidar melhor do seu pet
            </p>
          </div>

          <Card className="rounded-xl shadow-lg overflow-hidden">
            <div className="bg-primary p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Pet House Assistant</h3>
              </div>
              <p className="opacity-90">
                Nosso assistente virtual pode ajudar a avaliar a condição do seu pet e orientar sobre os próximos passos
              </p>
            </div>

            <div className="p-6 bg-white">
              <div className="space-y-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg max-w-[80%]">
                  <p className="text-sm font-medium mb-1">Pet House Assistant</p>
                  <p>Olá! Como posso ajudar você e seu pet hoje?</p>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg max-w-[80%] ml-auto">
                  <p className="text-sm font-medium mb-1">Você</p>
                  <p>Meu cachorro está vomitando desde ontem</p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg max-w-[80%]">
                  <p className="text-sm font-medium mb-1">Pet House Assistant</p>
                  <p>Entendi. Vamos avaliar a situação. Poderia me responder algumas perguntas para entender melhor o que está acontecendo?</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg max-w-[80%]">
                  <p className="text-sm font-medium mb-1">Pet House Assistant</p>
                  <p>Com que frequência seu pet está vomitando? O vômito contém sangue ou é de alguma cor incomum?</p>
                </div>
              </div>

              <div className="border-t pt-4 flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="text-sm">
                  Várias vezes ao dia
                </Button>
                <Button variant="outline" size="sm" className="text-sm">
                  Uma ou duas vezes apenas
                </Button>
                <Button variant="outline" size="sm" className="text-sm">
                  Sim, contém sangue
                </Button>
                <Button variant="outline" size="sm" className="text-sm">
                  Não, é normal
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-6 border-t">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  O assistente fornece orientações iniciais, mas não substitui uma consulta veterinária.
                </p>
                <Link to="/assistant">
                  <Button className="bg-primary hover:bg-primary-600">
                    Iniciar conversa
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <InfoCard
              title="Avaliação de Sintomas"
              description="Questionários inteligentes para entender o que pode estar acontecendo com seu pet"
            />
            <InfoCard
              title="Orientação Imediata"
              description="Sugestões sobre cuidados iniciais que podem ser tomados em casa"
            />
            <InfoCard
              title="Triagem de Urgências"
              description="Identificação de casos que exigem atendimento veterinário imediato"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard = ({ title, description }: InfoCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
