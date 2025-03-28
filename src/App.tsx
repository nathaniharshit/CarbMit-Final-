
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import CarbonCalculator from "./components/Calculator/CarbonCalculator";
import NeutralityPathways from "./components/Pathways/NeutralityPathways";
import Reports from "./components/Reports/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col md:flex-row min-h-screen">
          <Navigation />
          <main className="flex-1 md:ml-64 pt-16 md:pt-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calculator" element={<CarbonCalculator />} />
              <Route path="/pathways" element={<NeutralityPathways />} />
              <Route path="/reports" element={<Reports />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
