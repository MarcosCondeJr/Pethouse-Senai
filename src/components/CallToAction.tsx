
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <section className="py-20 bg-primary relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-400 opacity-90"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Comece a cuidar melhor do seu pet hoje mesmo
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de tutores que já melhoraram a saúde e o bem-estar de seus pets com nossa plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white/10">
              Criar conta gratuita
            </Button>
            <Button size="lg" variant="outline" className="text-primary border-white hover:bg-white/10">
              Saber mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
