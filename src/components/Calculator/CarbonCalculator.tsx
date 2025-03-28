import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Factory, Truck, Shovel, Zap, Flame, ChevronRight, Download } from 'lucide-react';

type EmissionCategory = {
  name: string;
  value: number;
  color: string;
  icon: React.ReactNode;
};

const CarbonCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("mining");
  
  const [miningEmissions, setMiningEmissions] = useState({
    excavation: 15000,
    transportation: 12000,
    equipment: 8000,
    blasting: 5000,
    processing: 7000,
  });
  
  const [operationalValues, setOperationalValues] = useState({
    dieselConsumption: 2500, // kiloliters
    electricityConsumption: 18000, // MWh
    explosivesMaterial: 1200, // tonnes
    coalProduction: 1.5, // million tonnes
    employeeCount: 850, // people
  });

  const totalEmissions = Object.values(miningEmissions).reduce((a, b) => a + b, 0);
  
  const emissionCategories: EmissionCategory[] = [
    { name: 'Excavation', value: miningEmissions.excavation, color: '#0F7A6C', icon: <Shovel size={16} /> },
    { name: 'Transportation', value: miningEmissions.transportation, color: '#6B9080', icon: <Truck size={16} /> },
    { name: 'Equipment', value: miningEmissions.equipment, color: '#84A98C', icon: <Factory size={16} /> },
    { name: 'Blasting', value: miningEmissions.blasting, color: '#A4C3B2', icon: <Flame size={16} /> },
    { name: 'Processing', value: miningEmissions.processing, color: '#CCE3DE', icon: <Zap size={16} /> },
  ];

  const handleInputChange = (category: string, value: number) => {
    let newMiningEmissions = { ...miningEmissions };
    
    if (category === 'dieselConsumption') {
      const diesel_factor = 2.7;
      newMiningEmissions.transportation = Math.round(value * diesel_factor);
    } else if (category === 'electricityConsumption') {
      const electricity_factor = 0.82;
      newMiningEmissions.equipment = Math.round(value * electricity_factor);
      newMiningEmissions.processing = Math.round(value * electricity_factor * 0.5);
    } else if (category === 'explosivesMaterial') {
      const explosives_factor = 4;
      newMiningEmissions.blasting = Math.round(value * explosives_factor);
    } else if (category === 'coalProduction') {
      const excavation_factor = 10000;
      newMiningEmissions.excavation = Math.round(value * excavation_factor);
    }
    
    setMiningEmissions(newMiningEmissions);
    
    setOperationalValues({
      ...operationalValues,
      [category]: value
    });
  };

  const perCapitaEmissions = operationalValues.employeeCount ? 
    Math.round(totalEmissions / operationalValues.employeeCount * 10) / 10 : 0;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-carbmit-dark">Carbon Calculator</h1>
        <p className="text-gray-500">Quantify your mine's carbon footprint by activity</p>
      </div>

      <Tabs defaultValue="mining" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mining">Mining Activities</TabsTrigger>
          <TabsTrigger value="reports">Results & Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mining" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Operational Details</CardTitle>
              <CardDescription>Enter your mine's operational data to calculate emissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="dieselConsumption">Diesel Consumption (kiloliters/year)</Label>
                    <Input
                      id="dieselConsumption"
                      type="number"
                      value={operationalValues.dieselConsumption}
                      onChange={(e) => handleInputChange('dieselConsumption', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="electricityConsumption">Electricity Consumption (MWh/year)</Label>
                    <Input
                      id="electricityConsumption"
                      type="number"
                      value={operationalValues.electricityConsumption}
                      onChange={(e) => handleInputChange('electricityConsumption', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="explosivesMaterial">Explosives Used (tonnes/year)</Label>
                    <Input
                      id="explosivesMaterial"
                      type="number"
                      value={operationalValues.explosivesMaterial}
                      onChange={(e) => handleInputChange('explosivesMaterial', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="coalProduction">Annual Coal Production (million tonnes)</Label>
                    <Input
                      id="coalProduction"
                      type="number"
                      step="0.1"
                      value={operationalValues.coalProduction}
                      onChange={(e) => handleInputChange('coalProduction', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="employeeCount">Number of Employees</Label>
                    <Input
                      id="employeeCount"
                      type="number"
                      value={operationalValues.employeeCount}
                      onChange={(e) => setOperationalValues({
                        ...operationalValues,
                        employeeCount: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="default" 
                      className="w-full bg-carbmit-primary hover:bg-carbmit-primary/90"
                      onClick={() => setActiveTab("reports")}
                    >
                      Calculate Emissions
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Emissions Summary</CardTitle>
                <CardDescription>Based on your operational data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-carbmit-accent rounded-md">
                  <p className="text-sm text-carbmit-dark mb-2">Total CO₂ Emissions</p>
                  <h3 className="text-3xl font-bold text-carbmit-primary">
                    {totalEmissions.toLocaleString()} <span className="text-lg font-normal">tCO₂e</span>
                  </h3>
                </div>
                
                <div className="py-2">
                  <p className="text-sm text-gray-500 mb-1">Per Capita Emissions</p>
                  <p className="font-medium">{perCapitaEmissions.toLocaleString()} tCO₂e/employee</p>
                </div>
                
                <div className="py-2">
                  <p className="text-sm text-gray-500 mb-1">Emissions Intensity</p>
                  <p className="font-medium">
                    {operationalValues.coalProduction ? 
                      (totalEmissions / (operationalValues.coalProduction * 1000000)).toFixed(2) : 0} 
                    tCO₂e/tonne of coal
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Emission Distribution</CardTitle>
                <CardDescription>Breakdown by mining activity</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emissionCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emissionCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value.toLocaleString()} tCO₂e`, 'Emissions']}
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      formatter={(value, entry, index) => {
                        const category = emissionCategories[index!];
                        const percentage = Math.round((category.value / totalEmissions) * 100);
                        return (
                          <span className="flex items-center">
                            <span className="mr-2">{category.icon}</span>
                            <span>{value}: {percentage}%</span>
                          </span>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
            
          <Card>
            <CardHeader>
              <CardTitle>Detailed Breakdown</CardTitle>
              <CardDescription>Analyze and adjust emission estimates for each activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {emissionCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2" 
                          style={{ backgroundColor: category.color }}
                        />
                        <Label>{category.name}</Label>
                      </div>
                      <div className="font-medium">
                        {category.value.toLocaleString()} tCO₂e
                      </div>
                    </div>
                    <Slider
                      defaultValue={[category.value]}
                      max={totalEmissions * 1.5}
                      step={100}
                      onValueChange={(value) => {
                        setMiningEmissions({
                          ...miningEmissions,
                          [category.name.toLowerCase()]: value[0]
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CarbonCalculator;
