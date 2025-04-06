
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Reminders } from "@/components/Reminders";
import { Guides } from "@/components/Guides";
import { Assistant } from "@/components/Assistant";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
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
