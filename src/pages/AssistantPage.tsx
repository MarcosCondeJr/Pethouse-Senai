
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "assistant" | "user";
  content: string;
};

type QuickResponse = {
  text: string;
  response: string;
};

const AssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Como posso ajudar você e seu pet hoje?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Pré-definir algumas respostas rápidas para sintomas comuns
  const quickResponses: QuickResponse[] = [
    {
      text: "Meu pet está vomitando",
      response: "Vômitos podem ser causados por diversos fatores. Com que frequência seu pet está vomitando? O vômito contém sangue ou é de alguma cor incomum?"
    },
    {
      text: "Meu pet não quer comer",
      response: "A perda de apetite pode indicar diversos problemas. Há quanto tempo seu pet não se alimenta adequadamente? Notou outros sintomas como letargia, vômito ou diarreia?"
    },
    {
      text: "Meu pet está com diarreia",
      response: "Diarreia pode ser causada por mudanças na alimentação, estresse ou problemas de saúde. Há quanto tempo seu pet está com diarreia? A diarreia contém sangue ou muco?"
    },
    {
      text: "Meu pet está coçando muito",
      response: "Coceira excessiva pode indicar problemas dermatológicos, alergias ou parasitas. Você observou alguma área vermelha, lesão ou perda de pelo? Seu pet teve contato recente com outros animais?"
    }
  ];

  // Conjunto de perguntas de acompanhamento baseadas em sintomas
  const followUpQuestions: Record<string, string[]> = {
    "vomit": [
      "Com que frequência seu pet está vomitando?",
      "O vômito contém sangue ou é de alguma cor incomum?",
      "Seu pet consegue ingerir água sem vomitar?",
      "Você notou alguma mudança recente na alimentação ou rotina do seu pet?"
    ],
    "appetite": [
      "Há quanto tempo seu pet não está comendo normalmente?",
      "Seu pet ainda está bebendo água?",
      "Você notou alguma alteração no comportamento além da falta de apetite?",
      "Seu pet teve acesso a algum alimento diferente ou objeto que possa ter ingerido?"
    ],
    "diarrhea": [
      "Há quanto tempo seu pet está com diarreia?",
      "A diarreia contém sangue ou muco?",
      "Seu pet ainda está comendo e bebendo normalmente?",
      "Houve alguma mudança recente na alimentação do seu pet?"
    ],
    "itching": [
      "Você observou alguma área vermelha, lesão ou perda de pelo?",
      "A coceira está localizada em alguma área específica ou é generalizada?",
      "Seu pet teve contato recente com outros animais?",
      "Você mudou recentemente o shampoo, ração ou outros produtos usados no pet?"
    ]
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Adicionar a mensagem do usuário
    const userMessage: Message = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);

    // Simular processamento da IA
    setTimeout(() => {
      // Gerar resposta baseada em palavras-chave
      let response = "Entendi sua preocupação. Para ajudar melhor, preciso de mais algumas informações.";
      
      const lowerCaseInput = inputMessage.toLowerCase();
      
      if (lowerCaseInput.includes("vomit")) {
        response = "Vômitos podem indicar diversos problemas, desde indigestão simples até questões mais sérias. " +
          "É importante observar: Com que frequência está ocorrendo? Há presença de sangue ou coloração anormal? " +
          "Se os vômitos persistirem por mais de 24 horas, houver sangue ou seu pet parecer letárgico, recomendo consultar um veterinário urgentemente.";
      } 
      else if (lowerCaseInput.includes("come") || lowerCaseInput.includes("comer") || lowerCaseInput.includes("apetite")) {
        response = "A perda de apetite pode ser sinal de diversos problemas. Se seu pet não come há mais de 24 horas, " +
          "isso pode ser preocupante, especialmente em gatos. Está bebendo água normalmente? Apresenta outros sintomas como " +
          "letargia ou dor? Recomendo monitorar nas próximas horas e, se não houver melhora, consultar um veterinário.";
      }
      else if (lowerCaseInput.includes("diarreia") || lowerCaseInput.includes("fezes")) {
        response = "Diarreia pode ser causada por diversos fatores, incluindo mudanças alimentares, estresse ou infecções. " +
          "Se persistir por mais de 48 horas, contiver sangue ou seu pet apresentar outros sintomas como vômito ou letargia, " +
          "é recomendável consultar um veterinário o quanto antes. Mantenha seu pet hidratado nesse período.";
      }
      else if (lowerCaseInput.includes("coç") || lowerCaseInput.includes("coceira") || lowerCaseInput.includes("coçando")) {
        response = "Coceira excessiva pode indicar problemas dermatológicos, alergias ou presença de parasitas. " +
          "Examine a pele do seu pet procurando por vermelhidão, lesões ou parasitas visíveis. " +
          "Banhos com shampoo hipoalergênico podem ajudar temporariamente, mas se a coceira persistir, " +
          "um veterinário deve examinar para identificar a causa e prescrever o tratamento adequado.";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleQuickResponse = (text: string) => {
    // Adicionar a mensagem rápida como se fosse do usuário
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsProcessing(true);

    // Encontrar a resposta pré-definida
    const quickResponse = quickResponses.find(qr => qr.text === text);
    
    // Simular processamento da IA
    setTimeout(() => {
      if (quickResponse) {
        setMessages((prev) => [...prev, { role: "assistant", content: quickResponse.response }]);
      } else {
        setMessages((prev) => [...prev, { 
          role: "assistant", 
          content: "Entendi sua preocupação. Poderia fornecer mais detalhes para que eu possa ajudar melhor?" 
        }]);
      }
      setIsProcessing(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const emergencyAlert = () => {
    toast({
      title: "EMERGÊNCIA VETERINÁRIA",
      description: "Este caso parece ser urgente. Procure atendimento veterinário IMEDIATAMENTE!",
      variant: "destructive",
      duration: 10000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Assistente Virtual Pet House</h1>
            
            <Card className="mb-6">
              <div className="bg-blue-500 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-full">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Assistente Pet House</h3>
                </div>
                <p className="text-sm opacity-90">
                  Nosso assistente virtual pode ajudar a avaliar a condição do seu pet e orientar sobre os próximos passos.
                  <strong className="block mt-1">
                    Este serviço não substitui uma consulta veterinária. Em casos de emergência, procure atendimento imediatamente.
                  </strong>
                </p>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[400px] space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`${
                      message.role === "assistant" 
                        ? "bg-gray-100" 
                        : "bg-primary/10 ml-auto"
                    } p-4 rounded-lg max-w-[85%] ${message.role === "user" ? "ml-auto" : ""}`}
                  >
                    <p className="text-sm font-medium mb-1">
                      {message.role === "assistant" ? "Pet House Assistant" : "Você"}
                    </p>
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                ))}
                {isProcessing && (
                  <div className="bg-gray-100 p-4 rounded-lg max-w-[85%]">
                    <p className="text-sm font-medium mb-1">Pet House Assistant</p>
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "600ms"}}></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {quickResponses.map((qr, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleQuickResponse(qr.text)}
                      disabled={isProcessing}
                    >
                      {qr.text}
                    </Button>
                  ))}
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={emergencyAlert}
                  >
                    Emergência
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Textarea 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Descreva os sintomas ou dúvidas sobre seu pet..."
                    className="min-h-[80px] flex-1"
                    disabled={isProcessing}
                  />
                  <Button 
                    className="self-end bg-blue-500" 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isProcessing}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                
                <p className="mt-4 text-xs text-gray-500">
                  Este assistente fornece orientações iniciais, mas não substitui uma consulta veterinária.
                  Em casos de emergência, procure atendimento veterinário imediato.
                </p>
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
      </main>
      <Footer />
    </div>
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

export default AssistantPage;
