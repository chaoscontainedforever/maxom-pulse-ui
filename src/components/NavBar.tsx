import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { ThemeToggle } from "./ThemeToggle";
import { useMobileScreen } from "@/hooks/use-mobile-screen";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NavBar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMobileScreen();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Handle login button click - clear any stored mock admin data first
  const handleLoginClick = () => {
    // Clear any stored mock admin to ensure proper login flow
    localStorage.removeItem('mockSuperAdmin');
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold gradient-text">Maxom.ai</h2>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link to="/solutions" className="text-sm font-medium transition-colors hover:text-foreground/80">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-sm font-medium transition-colors hover:text-foreground/80">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-foreground/80">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm font-medium transition-colors hover:text-foreground/80">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm font-medium transition-colors hover:text-foreground/80">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Button onClick={() => navigate("/dashboard")} variant="ghost">Dashboard</Button>
              <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button onClick={handleLoginClick} variant="ghost">Login</Button>
              <Button onClick={() => navigate("/register")}>Sign Up</Button>
            </div>
          )}
          
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-2/3 md:w-1/2">
              <SheetHeader className="space-y-2">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Explore our services and options.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Link to="/solutions" className="text-sm font-medium transition-colors hover:text-foreground/80 block">
                  Solutions
                </Link>
                <Link to="/product" className="text-sm font-medium transition-colors hover:text-foreground/80 block">
                  Product
                </Link>
                <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-foreground/80 block">
                  Pricing
                </Link>
                <Link to="/about" className="text-sm font-medium transition-colors hover:text-foreground/80 block">
                  About
                </Link>
                <Link to="/contact" className="text-sm font-medium transition-colors hover:text-foreground/80 block">
                  Contact
                </Link>
                {user ? (
                  <>
                    <Button onClick={() => navigate("/dashboard")} className="w-full" variant="ghost">Dashboard</Button>
                    <Button onClick={handleSignOut} className="w-full" variant="outline">Sign Out</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleLoginClick} className="w-full" variant="ghost">Login</Button>
                    <Button onClick={() => navigate("/register")} className="w-full">Sign Up</Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
          
        </div>
      </div>

      
      {isOpen && (
        <div className="container pb-4 md:hidden">
          
          <nav>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/solutions" className="text-sm font-medium transition-colors hover:text-foreground/80 block">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-sm font-medium transition-colors hover:text-foreground/80 block">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-foreground/80 block">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm font-medium transition-colors hover:text-foreground/80 block">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm font-medium transition-colors hover:text-foreground/80 block">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="mt-4 flex flex-col gap-2">
            {user ? (
              <>
                <Button onClick={() => navigate("/dashboard")} className="w-full" variant="ghost">Dashboard</Button>
                <Button onClick={handleSignOut} className="w-full" variant="outline">Sign Out</Button>
              </>
            ) : (
              <>
                <Button onClick={handleLoginClick} className="w-full" variant="ghost">Login</Button>
                <Button onClick={() => navigate("/register")} className="w-full">Sign Up</Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
