
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Product', path: '/product' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-background bg-opacity-95 backdrop-blur-sm shadow-sm">
      <div className="maxom-container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-bold text-2xl">
              <span className="gradient-text">Maxom.ai</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-maxom-orange'
                    : 'text-foreground hover:text-maxom-orange'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/login" className="text-base font-medium text-foreground hover:text-maxom-orange transition-colors duration-200">
              Login
            </Link>
            <Link to="/contact" className="btn-primary">
              Request Access
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden rounded-md p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-maxom-orange'
                    : 'text-foreground hover:text-maxom-orange'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <div className="px-3 py-2">
                <ThemeToggle />
              </div>
              <Link 
                to="/login" 
                className="px-3 py-2 text-base font-medium text-foreground hover:text-maxom-orange"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/contact" 
                className="btn-primary mx-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Request Access
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
