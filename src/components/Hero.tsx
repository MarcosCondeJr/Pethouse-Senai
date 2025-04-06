
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800">
              Cuidado inteligente para seu pet
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              Guias informativos, lembretes de vacinas e assistente virtual para ajudar você a cuidar melhor do seu animal de estimação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button className="bg-primary hover:bg-primary-600 text-white font-medium rounded-md px-6 py-6 text-lg flex gap-2 items-center">
                Começar agora
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="font-medium text-lg px-6 py-6">
                Saiba mais
              </Button>
            </div>
          </div>
          <div className="relative h-80 md:h-auto flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                alt="Gato fofo"
                className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-lg animate-bounce-slow"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating stats cards */}
      <div className="container mx-auto px-4 -mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <StatCard
            number="30%"
            text="Das consultas emergenciais poderiam ser evitadas com orientação adequada"
            color="primary"
          />
          <StatCard
            number="25%"
            text="Aumento na adesão aos calendários de vacinação com nosso sistema"
            color="secondary"
          />
          <StatCard
            number="40%"
            text="Redução em custos com tratamentos que poderiam ser evitados"
            color="accent"
          />
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  number: string;
  text: string;
  color: "primary" | "secondary" | "accent";
}

const StatCard = ({ number, text, color }: StatCardProps) => {
  const bgColor = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center card-hover">
      <div className={`${bgColor[color]} rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
        <span className="text-2xl font-bold text-white">{number}</span>
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};
