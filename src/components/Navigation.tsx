
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Calculator, 
  TreePine, 
  FileText, 
  History, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';

type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { title: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { title: 'Carbon Calculator', path: '/calculator', icon: <Calculator size={20} /> },
    { title: 'Neutrality Pathways', path: '/pathways', icon: <TreePine size={20} /> },
    { title: 'Reports', path: '/reports', icon: <FileText size={20} /> },
    // { title: 'Historical Data', path: '/history', icon: <History size={20} /> },
    // { title: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleMenu}
          className="rounded-full bg-carbmit-primary text-white hover:bg-carbmit-primary/90"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Logo for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50 flex items-center gap-2">
        <TreePine size={24} className="text-carbmit-primary" />
        <span className="text-xl font-bold text-carbmit-primary">CarbMit</span>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <div className="hidden md:flex flex-col h-screen w-64 fixed inset-y-0 left-0 bg-carbmit-primary text-white p-4">
        <div className="flex items-center gap-2 mb-8 mt-4">
          <TreePine size={32} />
          <h1 className="text-2xl font-bold">CarbMit</h1>
        </div>
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "secondary" : "ghost"}
              className={`justify-start h-12 ${
                isActive(item.path) 
                  ? "bg-white/10 text-white" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => navigateTo(item.path)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.title}
            </Button>
          ))}
        </div>
        <div className="mt-auto mb-4">
          <div className="px-4 py-2 rounded-md bg-white/10">
            <p className="text-sm text-white/80">Carbon Management Tool</p>
            <p className="text-xs text-white/60">for Indian Coal Mines</p>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-carbmit-primary z-40 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-16 p-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "secondary" : "ghost"}
                className={`justify-start h-12 ${
                  isActive(item.path) 
                    ? "bg-white/10 text-white" 
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => navigateTo(item.path)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </Button>
            ))}
          </div>
          <div className="mt-auto mb-4">
            <div className="px-4 py-2 rounded-md bg-white/10">
              <p className="text-sm text-white/80">Carbon Management Tool</p>
              <p className="text-xs text-white/60">for Indian Coal Mines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
