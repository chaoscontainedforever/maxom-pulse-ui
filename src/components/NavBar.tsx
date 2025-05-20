
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { ThemeToggle } from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";

const NavBar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      console.log("NavBar: Signing out user");
      await signOut();
      // Navigation is now handled in the signOut function
    } catch (error) {
      console.error("NavBar: Error signing out:", error);
    }
  };

  const handleBookDemo = () => {
    navigate("/contact");
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
              <Button onClick={handleSignOut} variant="outline" className="flex items-center gap-2">
                <LogOut size={16} />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button onClick={handleBookDemo}>Book Demo</Button>
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
                  <Button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2" variant="outline">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </Button>
                ) : (
                  <Button onClick={handleBookDemo} className="w-full">Book Demo</Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
