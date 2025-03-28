
import React from 'react';
import { Factory, Recycle, TreePine, CloudRain } from 'lucide-react';
import StatsCard from './StatsCard';
import EmissionsChart from './EmissionsChart';
import ProgressTracker from './ProgressTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data
const statsData = [
  { 
    title: 'Total Emissions', 
    value: '75,420', 
    unit: 'tCO₂e',
    change: 12.4,
    trend: 'up' as const,
    icon: <Factory size={18} />
  },
  { 
    title: 'Per Capita Emissions', 
    value: '14.2', 
    unit: 'tCO₂e',
    change: 3.8,
    trend: 'down' as const,
    icon: <CloudRain size={18} />
  },
  { 
    title: 'Carbon Offsets', 
    value: '20,150', 
    unit: 'tCO₂e',
    change: 28.6,
    trend: 'up' as const,
    icon: <TreePine size={18} />
  },
  { 
    title: 'Net Emissions', 
    value: '55,270', 
    unit: 'tCO₂e',
    change: -5.2,
    trend: 'down' as const,
    icon: <Recycle size={18} />
  }
];

const emissionsData = [
  { name: 'Excavation', emissions: 24200, reduction: 7200 },
  { name: 'Transportation', emissions: 18500, reduction: 6800 },
  { name: 'Equipment', emissions: 12800, reduction: 4500 },
  { name: 'Blasting', emissions: 8200, reduction: 2100 },
  { name: 'Processing', emissions: 11720, reduction: 3400 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-carbmit-dark">Dashboard</h1>
        <p className="text-gray-500">Overview of your mine's carbon footprint and progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatsCard 
            key={stat.title}
            title={stat.title}
            value={stat.value}
            unit={stat.unit}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmissionsChart data={emissionsData} />
        <ProgressTracker 
          currentEmissions={55270} 
          targetEmissions={55270} 
          neutralityDate="December 2027" 
        />
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Immediate Actions</CardTitle>
            <CardDescription>Suggested steps to reduce your carbon footprint</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-carbmit-primary text-white flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">1</div>
                <p>Upgrade transportation fleet to CNG or electric vehicles to reduce emissions by up to 30%</p>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-carbmit-primary text-white flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">2</div>
                <p>Implement methane capture systems at key venting points</p>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-carbmit-primary text-white flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">3</div>
                <p>Expand afforestation in designated areas around the mining site</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Potential Carbon Credits</CardTitle>
            <CardDescription>Offset opportunities based on current activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Afforestation Projects</span>
                <span className="font-medium">₹12.6M</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Renewable Energy Adoption</span>
                <span className="font-medium">₹8.2M</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Methane Capture</span>
                <span className="font-medium">₹5.4M</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center font-medium">
                <span>Estimated Annual Value</span>
                <span className="text-carbmit-primary">₹26.2M</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
