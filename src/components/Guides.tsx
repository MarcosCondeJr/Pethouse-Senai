import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ChevronRight } from "lucide-react";
export const Guides = () => {
  return <section className="py-20 bg-white" id="guides">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Guias Informativos</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conteúdo educativo desenvolvido por especialistas para auxiliar você no cuidado diário com seu pet
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GuideCard title="Sinais de Alerta na Saúde do Pet" description="Aprenda a identificar quando seu pet precisa de atendimento veterinário urgente" category="Saúde" image="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <GuideCard title="Nutrição Adequada por Fase da Vida" description="O que seu animal de estimação deve comer em cada estágio da vida" category="Alimentação" image="https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGV0c3xlbnwwfHwwfHx8MA%3D%3D" />
          <GuideCard title="Parasitas Comuns: Prevenção e Tratamento" description="Como proteger seu pet contra pulgas, carrapatos e vermes" category="Prevenção" image="https://images.unsplash.com/photo-1548366086-7f1b76106622?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHBldHN8ZW58MHx8MHx8fDA%3D" />
          <GuideCard title="Comportamento Animal: Entendendo seu Pet" description="Interpretando os sinais que seu pet demonstra através do comportamento" category="Comportamento" image="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGV0c3xlbnwwfHwwfHx8MA%3D%3D" />
          <GuideCard title="Primeiros Socorros para Pets" description="O que fazer em situações de emergência até chegar ao veterinário" category="Emergências" image="https://plus.unsplash.com/premium_photo-1683134234977-96fabca0ba59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <GuideCard title="Exercícios e Atividades por Raça" description="Atividades ideais para manter seu pet saudável conforme suas características" category="Atividade Física" image="https://images.unsplash.com/photo-1518882174711-1de40238921b?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>

        <div className="text-center mt-10">
          <Button className="bg-secondary hover:bg-secondary-600 gap-2">
            Ver todos os guias
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>;
};
interface GuideCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
}
const GuideCard = ({
  title,
  description,
  category,
  image
}: GuideCardProps) => {
  return <Card className="overflow-hidden card-hover">
      <div className="relative h-44">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      <CardHeader className="pb-2 bg-slate-50">
        <div className="flex items-center gap-2 mb-2">
          <Book className="h-4 w-4 text-primary" />
          <p className="text-sm text-primary font-medium">Guia Informativo</p>
        </div>
        <CardTitle className="text-xl text-[#f4a905]">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="bg-gray-50">
        <Button variant="outline" className="w-full">Ler guia completo</Button>
      </CardContent>
    </Card>;
};