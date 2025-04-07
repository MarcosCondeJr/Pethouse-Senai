
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dog, Cat, Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navClasses = scrolled 
    ? "bg-white shadow-md border-b transition-all duration-300" 
    : "bg-white/90 backdrop-blur-sm border-b transition-all duration-300";

  return (
    <header className={`sticky top-0 z-40 ${navClasses}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-r from-primary to-accent rounded-full w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                <div className="text-white flex items-center justify-center">
                  <Dog className="w-6 h-6 absolute transition-opacity duration-300 group-hover:opacity-0" />
                  <Cat className="w-6 h-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">PetHouse</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-gray-700">
            <NavLink to="/" isActive={isActive('/')}>
              Início
            </NavLink>
            <NavLink to="/pets" isActive={isActive('/pets')}>
              Meus Pets
            </NavLink>
            <NavLink to="/reminders" isActive={isActive('/reminders')}>
              Lembretes
            </NavLink>
            <NavLink to="/assistant" isActive={isActive('/assistant')}>
              Assistente
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-600 hover:to-accent-600 text-white">Entrar</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700 hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)} isActive={isActive('/')}>
            Início
          </MobileNavLink>
          <MobileNavLink to="/pets" onClick={() => setIsMenuOpen(false)} isActive={isActive('/pets')}>
            Meus Pets
          </MobileNavLink>
          <MobileNavLink to="/reminders" onClick={() => setIsMenuOpen(false)} isActive={isActive('/reminders')}>
            Lembretes
          </MobileNavLink>
          <MobileNavLink to="/assistant" onClick={() => setIsMenuOpen(false)} isActive={isActive('/assistant')}>
            Assistente
          </MobileNavLink>
          <div className="pt-4">
            <Button className="w-full bg-gradient-to-r from-primary to-accent">Entrar</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, isActive, children }: NavLinkProps) => {
  return (
    <Link 
      to={to}
      className={`relative font-medium hover:text-accent transition-colors ${
        isActive 
          ? 'text-accent after:content-[""] after:absolute after:bottom-[-18px] after:left-0 after:w-full after:h-1 after:bg-accent' 
          : 'text-gray-700'
      }`}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const MobileNavLink = ({ to, onClick, isActive, children }: MobileNavLinkProps) => {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md ${
        isActive 
          ? 'bg-gradient-to-r from-primary-50 to-accent-50 text-accent font-medium border-l-4 border-accent' 
          : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
