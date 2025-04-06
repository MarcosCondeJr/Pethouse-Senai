
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Calendar, Dog, Menu, MessageCircle, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <Dog className="h-8 w-8 text-primary" />
          <span className="font-display font-bold text-xl md:text-2xl text-primary">
            PET HOUSE
          </span>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-primary" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setShowLogin(true)}
              variant="outline" 
              className="font-medium"
            >
              Entrar
            </Button>
            <Button className="font-medium bg-primary hover:bg-primary-600">
              Cadastrar
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden"
        )}
      >
        <div className="container mx-auto flex flex-col gap-4">
          <MobileNavLinks />
          <div className="flex flex-col gap-2 mt-2">
            <Button 
              onClick={() => {
                setShowLogin(true);
                setIsMenuOpen(false);
              }}
              variant="outline" 
              className="w-full font-medium"
            >
              Entrar
            </Button>
            <Button className="w-full font-medium bg-primary hover:bg-primary-600">
              Cadastrar
            </Button>
          </div>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Acesse sua conta</DialogTitle>
            <DialogDescription>
              Entre com seus dados para acessar o sistema Pet House
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="email" className="text-sm font-medium">E-mail</label>
              <input
                id="email"
                type="email"
                className="border rounded-md p-2"
                placeholder="exemplo@email.com"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="password" className="text-sm font-medium">Senha</label>
              <input
                id="password"
                type="password"
                className="border rounded-md p-2"
                placeholder="********"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full bg-primary hover:bg-primary-600">Entrar</Button>
            <div className="text-center text-sm text-gray-500 mt-2">
              Não tem uma conta? <a href="#" className="text-primary hover:underline">Cadastre-se</a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

const navItems = [
  { name: "Início", href: "#", icon: <Dog className="h-5 w-5" /> },
  { name: "Lembretes", href: "#reminders", icon: <Bell className="h-5 w-5" /> },
  { name: "Calendário", href: "#calendar", icon: <Calendar className="h-5 w-5" /> },
  { name: "Guias", href: "#guides", icon: <MessageCircle className="h-5 w-5" /> },
  { name: "Perfil", href: "#profile", icon: <User className="h-5 w-5" /> },
];

const NavLinks = () => {
  return (
    <>
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors font-medium"
        >
          {item.name}
        </a>
      ))}
    </>
  );
};

const MobileNavLinks = () => {
  return (
    <>
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="flex items-center gap-2 p-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors font-medium"
        >
          {item.icon}
          {item.name}
        </a>
      ))}
    </>
  );
};
