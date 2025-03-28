
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  TreePine, 
  Factory, 
  Truck,
  SunMedium, 
  Zap,
  Save, 
  Download 
} from 'lucide-react';

// Initial pathway values
const initialPathways = {
  afforestation: 30,   // Percentage of max potential
  renewableEnergy: 40, // Percentage of max potential
  electricVehicles: 25, // Percentage of max potential
  methaneCaptureAndUse: 35, // Percentage of max potential
  energyEfficiency: 50  // Percentage of max potential
};

// Max potential reduction for each pathway (in tCO₂e)
const maxReductionPotential = {
  afforestation: 25000,
  renewableEnergy: 18000,
  electricVehicles: 12000,
  methaneCaptureAndUse: 8000,
  energyEfficiency: 15000
};

// Implementation cost per unit for each pathway (in ₹ per tCO₂e)
const implementationCosts = {
  afforestation: 1200,
  renewableEnergy: 2800,
  electricVehicles: 3500,
  methaneCaptureAndUse: 2200,
  energyEfficiency: 1500
};

// Years for projection
const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const NeutralityPathways: React.FC = () => {
  const [pathways, setPathways] = useState(initialPathways);
  
  // Calculate current reductions based on pathway percentages
  const calculateCurrentReductions = () => {
    return {
      afforestation: Math.round(maxReductionPotential.afforestation * (pathways.afforestation / 100)),
      renewableEnergy: Math.round(maxReductionPotential.renewableEnergy * (pathways.renewableEnergy / 100)),
      electricVehicles: Math.round(maxReductionPotential.electricVehicles * (pathways.electricVehicles / 100)),
      methaneCaptureAndUse: Math.round(maxReductionPotential.methaneCaptureAndUse * (pathways.methaneCaptureAndUse / 100)),
      energyEfficiency: Math.round(maxReductionPotential.energyEfficiency * (pathways.energyEfficiency / 100))
    };
  };
  
  // Calculate costs for implementation
  const calculateCosts = (reductions: Record<string, number>) => {
    return {
      afforestation: reductions.afforestation * implementationCosts.afforestation,
      renewableEnergy: reductions.renewableEnergy * implementationCosts.renewableEnergy,
      electricVehicles: reductions.electricVehicles * implementationCosts.electricVehicles,
      methaneCaptureAndUse: reductions.methaneCaptureAndUse * implementationCosts.methaneCaptureAndUse,
      energyEfficiency: reductions.energyEfficiency * implementationCosts.energyEfficiency
    };
  };
  
  const currentReductions = calculateCurrentReductions();
  const costs = calculateCosts(currentReductions);
  
  // Calculate totals
  const totalCurrentEmissions = 75000; // tCO₂e
  const totalReduction = Object.values(currentReductions).reduce((a, b) => a + b, 0);
  const netEmissions = totalCurrentEmissions - totalReduction;
  const totalCost = Object.values(costs).reduce((a, b) => a + b, 0);
  const reductionPercentage = Math.round((totalReduction / totalCurrentEmissions) * 100);
  
  // Generate projection data
  const generateProjectionData = () => {
    const annualReductionRate = totalReduction / 8; // Spread over 8 years
    
    return years.map((year, index) => {
      const yearlyReduction = Math.min(annualReductionRate * (index + 1), totalCurrentEmissions);
      return {
        year,
        emissions: Math.max(totalCurrentEmissions - yearlyReduction, 0),
        target: Math.max(totalCurrentEmissions - (totalCurrentEmissions / 8) * (index + 1), 0)
      };
    });
  };
  
  const projectionData = generateProjectionData();
  
  // Handle pathway slider changes
  const handlePathwayChange = (pathway: string, value: number[]) => {
    setPathways({
      ...pathways,
      [pathway]: value[0]
    });
  };
  
  // Calculate neutrality date
  const getNeutralityYear = () => {
    const reductionRate = totalReduction / pathways.afforestation; // Using afforestation as a base rate
    const yearsToNeutrality = Math.ceil(totalCurrentEmissions / reductionRate);
    return 2023 + yearsToNeutrality;
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-carbmit-dark">Neutrality Pathways</h1>
        <p className="text-gray-500">Explore strategies to achieve carbon neutrality</p>
      </div>

      <Tabs defaultValue="simulator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simulator">Pathway Simulator</TabsTrigger>
          <TabsTrigger value="projections">Projections & Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simulator" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Card */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Carbon Reduction Summary</CardTitle>
                <CardDescription>Based on your selected pathways</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-carbmit-accent rounded-md space-y-2">
                  <div>
                    <p className="text-sm text-carbmit-dark">Current Emissions</p>
                    <p className="text-xl font-medium">{totalCurrentEmissions.toLocaleString()} tCO₂e</p>
                  </div>
                  <div>
                    <p className="text-sm text-carbmit-dark">Potential Reduction</p>
                    <p className="text-xl font-medium text-carbmit-primary">
                      {totalReduction.toLocaleString()} tCO₂e ({reductionPercentage}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-carbmit-dark">Net Emissions</p>
                    <p className="text-xl font-medium">{netEmissions.toLocaleString()} tCO₂e</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Progress to Carbon Neutrality</p>
                  <Progress value={reductionPercentage} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span>{reductionPercentage}% Complete</span>
                    <span>Target: 100%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Expected Neutrality Date</p>
                  <p className="text-lg text-carbmit-primary">{getNeutralityYear()}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Total Implementation Cost</p>
                  <p className="text-lg">₹{(totalCost / 10000000).toFixed(2)} Crore</p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Pathway Controls */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Carbon Neutrality Pathways</CardTitle>
                <CardDescription>Adjust strategies to see their impact on your carbon footprint</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Afforestation */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <TreePine className="h-5 w-5 mr-2 text-carbmit-primary" />
                      <Label>Afforestation</Label>
                    </div>
                    <div className="text-right text-sm">
                      <div>{currentReductions.afforestation.toLocaleString()} tCO₂e</div>
                      <div className="text-gray-500">₹{(costs.afforestation / 10000000).toFixed(2)} Crore</div>
                    </div>
                  </div>
                  <Slider
                    value={[pathways.afforestation]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePathwayChange('afforestation', value)}
                  />
                  <div className="text-xs text-gray-500">
                    Plant native trees around mining sites and in designated areas
                  </div>
                </div>
                
                {/* Renewable Energy */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <SunMedium className="h-5 w-5 mr-2 text-carbmit-primary" />
                      <Label>Renewable Energy</Label>
                    </div>
                    <div className="text-right text-sm">
                      <div>{currentReductions.renewableEnergy.toLocaleString()} tCO₂e</div>
                      <div className="text-gray-500">₹{(costs.renewableEnergy / 10000000).toFixed(2)} Crore</div>
                    </div>
                  </div>
                  <Slider
                    value={[pathways.renewableEnergy]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePathwayChange('renewableEnergy', value)}
                  />
                  <div className="text-xs text-gray-500">
                    Implement solar and wind power for mining operations
                  </div>
                </div>
                
                {/* Electric Vehicles */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-carbmit-primary" />
                      <Label>Electric Vehicles</Label>
                    </div>
                    <div className="text-right text-sm">
                      <div>{currentReductions.electricVehicles.toLocaleString()} tCO₂e</div>
                      <div className="text-gray-500">₹{(costs.electricVehicles / 10000000).toFixed(2)} Crore</div>
                    </div>
                  </div>
                  <Slider
                    value={[pathways.electricVehicles]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePathwayChange('electricVehicles', value)}
                  />
                  <div className="text-xs text-gray-500">
                    Transition vehicles and heavy equipment to electric alternatives
                  </div>
                </div>
                
                {/* Methane Capture */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Factory className="h-5 w-5 mr-2 text-carbmit-primary" />
                      <Label>Methane Capture & Use</Label>
                    </div>
                    <div className="text-right text-sm">
                      <div>{currentReductions.methaneCaptureAndUse.toLocaleString()} tCO₂e</div>
                      <div className="text-gray-500">₹{(costs.methaneCaptureAndUse / 10000000).toFixed(2)} Crore</div>
                    </div>
                  </div>
                  <Slider
                    value={[pathways.methaneCaptureAndUse]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePathwayChange('methaneCaptureAndUse', value)}
                  />
                  <div className="text-xs text-gray-500">
                    Capture and utilize methane emissions from mining operations
                  </div>
                </div>
                
                {/* Energy Efficiency */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-carbmit-primary" />
                      <Label>Energy Efficiency</Label>
                    </div>
                    <div className="text-right text-sm">
                      <div>{currentReductions.energyEfficiency.toLocaleString()} tCO₂e</div>
                      <div className="text-gray-500">₹{(costs.energyEfficiency / 10000000).toFixed(2)} Crore</div>
                    </div>
                  </div>
                  <Slider
                    value={[pathways.energyEfficiency]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePathwayChange('energyEfficiency', value)}
                  />
                  <div className="text-xs text-gray-500">
                    Improve energy efficiency across mining operations
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projections" className="space-y-6 mt-6">
          {/* Projection Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Emissions Reduction Projection</CardTitle>
              <CardDescription>
                Estimated emissions reduction over time based on selected pathways
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={projectionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} tCO₂e`, 'Emissions']}
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="emissions"
                    name="Projected Emissions"
                    stroke="#0F7A6C"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    name="Target Path to Neutrality"
                    stroke="#84A98C"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Analysis Card */}
          <Card>
            <CardHeader>
              <CardTitle>Pathway Analysis</CardTitle>
              <CardDescription>Cost-effectiveness comparison of different strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Most Cost-Effective Strategies</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <TreePine className="h-5 w-5 mr-2 text-carbmit-primary" />
                          <span>Afforestation</span>
                        </div>
                        <span className="font-medium">₹1,200/tCO₂e</span>
                      </li>
                      <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <Zap className="h-5 w-5 mr-2 text-carbmit-primary" />
                          <span>Energy Efficiency</span>
                        </div>
                        <span className="font-medium">₹1,500/tCO₂e</span>
                      </li>
                      <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <Factory className="h-5 w-5 mr-2 text-carbmit-primary" />
                          <span>Methane Capture</span>
                        </div>
                        <span className="font-medium">₹2,200/tCO₂e</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Recommended Strategy Mix</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-carbmit-accent rounded-md">
                        <p className="text-sm text-carbmit-primary mb-1">Short-term (1-2 years)</p>
                        <p>Focus on afforestation and energy efficiency improvements for quick wins</p>
                      </div>
                      <div className="p-3 bg-carbmit-accent rounded-md">
                        <p className="text-sm text-carbmit-primary mb-1">Medium-term (3-5 years)</p>
                        <p>Implement methane capture systems and begin renewable energy transition</p>
                      </div>
                      <div className="p-3 bg-carbmit-accent rounded-md">
                        <p className="text-sm text-carbmit-primary mb-1">Long-term (5+ years)</p>
                        <p>Complete electric vehicle transition and expand renewable energy capacity</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-carbmit-primary rounded-md bg-carbmit-accent/30 mt-4">
                  <h3 className="text-lg font-medium text-carbmit-primary mb-2">Key Insights</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="min-w-4 mr-2">•</div>
                      <p>Combining afforestation with energy efficiency measures provides the most cost-effective initial reduction of ~35%</p>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-4 mr-2">•</div>
                      <p>Electric vehicles offer significant long-term benefits despite higher upfront costs</p>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-4 mr-2">•</div>
                      <p>At current carbon credit prices, investment in these pathways could generate returns within 7-10 years</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeutralityPathways;
