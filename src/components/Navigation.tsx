
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white w-5 h-5"
                >
                  <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5M8 14v.5M16 14v.5M11.25 16.25h1.5L12 17l-.75-.75z" />
                  <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-primary">PetHouse</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-gray-700">
            <Link to="/" className="hover:text-primary font-medium">Início</Link>
            <Link to="/pets" className="hover:text-primary font-medium">Meus Pets</Link>
            <Link to="/reminders" className="hover:text-primary font-medium">Lembretes</Link>
            <Link to="/assistant" className="hover:text-primary font-medium">Assistente</Link>
            <a href="#features" className="hover:text-primary font-medium">Recursos</a>
          </nav>

          <div className="hidden md:flex items-center">
            <Button>Entrar</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
          <Link
            to="/pets"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Meus Pets
          </Link>
          <Link
            to="/reminders"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Lembretes
          </Link>
          <Link
            to="/assistant"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Assistente
          </Link>
          <a
            href="#features"
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Recursos
          </a>
          <div className="pt-4">
            <Button className="w-full">Entrar</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
