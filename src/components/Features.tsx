
import { Bell, Book, MessageCircle } from "lucide-react";

export const Features = () => {
  return (
    <section className="py-32 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Como o Pet House pode ajudar você?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma foi desenvolvida para facilitar o cuidado com seu pet através de três pilares principais
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Bell className="h-12 w-12 text-blue-500" />}
            title="Gestão Proativa"
            description="Lembretes automatizados de vacinação e vermifugação, personalizados por espécie, raça e idade, enviados por e-mail ou SMS."
            color="blue"
          />
          <FeatureCard
            icon={<Book className="h-12 w-12 text-green-400" />}
            title="Educação Acessível"
            description="Guias informativos com curadoria de especialistas sobre sinais de alerta, cuidados básicos e mitos da saúde animal."
            color="green"
          />
          <FeatureCard
            icon={<MessageCircle className="h-12 w-12 text-orange-500" />}
            title="Assistente Virtual"
            description="Questionários dinâmicos para avaliar sintomas e sugerir ações imediatas, além de triagem de urgências."
            color="orange"
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "green" | "orange";
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  const borderColor = {
    blue: "border-blue-500",
    green: "border-green-400",
    orange: "border-orange-500",
  };

  const bgColor = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
  };

  return (
    <div className={`border-t-4 ${borderColor[color]} rounded-xl bg-white shadow-md p-8 card-hover ${bgColor[color]}`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
