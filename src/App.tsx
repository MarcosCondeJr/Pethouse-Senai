
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PetsPage from "./pages/PetsPage";
import VaccinationCardPage from "./pages/VaccinationCardPage";
import ReminderPage from "./pages/ReminderPage";
import AssistantPage from "./pages/AssistantPage";
import { PetProvider } from "./contexts/PetContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pets" element={<PetsPage />} />
            <Route path="/vaccination-card/:petId?" element={<VaccinationCardPage />} />
            <Route path="/reminders" element={<ReminderPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PetProvider>
  </QueryClientProvider>
);

export default App;
