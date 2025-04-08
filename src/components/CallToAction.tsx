import { Button } from "@/components/ui/button";
export const CallToAction = () => {
  return <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-[#FFBA94] opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 bg-sky-500"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Comece a cuidar melhor do seu pet hoje mesmo
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de tutores que já melhoraram a saúde e o bem-estar de seus pets com nossa plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-white/90 text-accent font-bold border-none mx-[11px] rounded-xl">
              Criar conta gratuita
            </Button>
            <Button size="lg" variant="outline" className="border-white bg-slate-100 text-[accent-5] text-accent-500 font-semibold">
              Saber mais
            </Button>
          </div>
        </div>
      </div>
    </section>;
};