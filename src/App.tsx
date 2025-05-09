
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Dashboard from "./pages/Dashboard";

// Dashboard pages
import Calls from "./pages/dashboard/Calls";
import Analytics from "./pages/dashboard/Analytics";

// Admin pages
import CallAnalytics from "./pages/admin/CallAnalytics";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import RestaurantOrders from "./pages/admin/RestaurantOrders";
import Reservations from "./pages/admin/Reservations";
import Help from "./pages/admin/Help";

// Super Admin pages
import SuperAdmin from "./pages/SuperAdmin";
import CustomerView from "./pages/SuperAdmin/CustomerView";
import NewCustomer from "./pages/SuperAdmin/NewCustomer";

const queryClient = new QueryClient();

// Layout component to handle conditional rendering of NavBar and Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isSuperAdminRoute = location.pathname.startsWith('/super-admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && !isDashboardRoute && !isSuperAdminRoute && <NavBar />}
      <main className={`flex-grow ${!isAdminRoute && !isDashboardRoute && !isSuperAdminRoute ? "" : "p-0"}`}>
        {children}
      </main>
      {!isAdminRoute && !isDashboardRoute && !isSuperAdminRoute && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/cookies" element={<Cookies />} />
                  
                  {/* Dashboard Routes - protected */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/calls" element={
                    <ProtectedRoute>
                      <Calls />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/analytics" element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  } />
                  
                  {/* Admin Routes - protected */}
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/call-analytics" element={
                    <ProtectedRoute>
                      <CallAnalytics />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/reports" element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/restaurant-orders" element={
                    <ProtectedRoute requiredRole="business_owner">
                      <RestaurantOrders />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/reservations" element={
                    <ProtectedRoute requiredRole="business_owner">
                      <Reservations />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/help" element={
                    <ProtectedRoute>
                      <Help />
                    </ProtectedRoute>
                  } />
                  
                  {/* Super Admin Routes - protected */}
                  <Route path="/super-admin" element={
                    <ProtectedRoute requiredRole="super_admin">
                      <SuperAdmin />
                    </ProtectedRoute>
                  } />
                  <Route path="/super-admin/customer/:customerId" element={
                    <ProtectedRoute requiredRole="super_admin">
                      <CustomerView />
                    </ProtectedRoute>
                  } />
                  <Route path="/super-admin/new-customer" element={
                    <ProtectedRoute requiredRole="super_admin">
                      <NewCustomer />
                    </ProtectedRoute>
                  } />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
