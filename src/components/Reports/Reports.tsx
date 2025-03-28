
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  FileText, 
  Download, 
  ChevronRight, 
  Search, 
  Filter, 
  BarChart3 
} from 'lucide-react';
import { cn } from "@/lib/utils";

// Mock reports data
const mockReports = [
  {
    id: 1,
    title: "Q1 2023 Carbon Emissions Assessment",
    date: "2023-04-15",
    type: "quarterly",
    pages: 12,
    size: "2.4 MB"
  },
  {
    id: 2,
    title: "Annual Sustainability Report 2022",
    date: "2023-01-30",
    type: "annual",
    pages: 48,
    size: "8.2 MB"
  },
  {
    id: 3,
    title: "Carbon Neutrality Pathway Analysis",
    date: "2023-03-18",
    type: "analysis",
    pages: 24,
    size: "4.7 MB"
  },
  {
    id: 4,
    title: "Equipment Efficiency Assessment",
    date: "2023-02-22",
    type: "analysis",
    pages: 15,
    size: "3.1 MB"
  },
  {
    id: 5,
    title: "Q4 2022 Carbon Emissions Assessment",
    date: "2023-01-12",
    type: "quarterly",
    pages: 14,
    size: "2.8 MB"
  }
];

const Reports: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState(mockReports);
  
  // Filter reports based on search term
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = mockReports.filter(report => 
      report.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReports(filtered);
  };
  
  // Reset filter
  const resetFilter = () => {
    setSearchTerm("");
    setFilteredReports(mockReports);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-carbmit-dark">Reports</h1>
        <p className="text-gray-500">Generate and manage your carbon analysis reports</p>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>Create a custom report with your carbon data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reportTitle">Report Title</Label>
                    <Input
                      id="reportTitle"
                      placeholder="e.g., Q2 2023 Carbon Assessment"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Report Type</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Button variant="outline" className="justify-start hover:bg-carbmit-accent hover:text-carbmit-primary">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Emissions Summary
                      </Button>
                      <Button variant="outline" className="justify-start hover:bg-carbmit-accent hover:text-carbmit-primary">
                        <FileText className="mr-2 h-4 w-4" />
                        Full Analysis
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div>
                    <Label>Include Sections</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="emissionsSummary" className="rounded text-carbmit-primary" defaultChecked />
                        <Label htmlFor="emissionsSummary" className="font-normal">Emissions Summary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="activityBreakdown" className="rounded text-carbmit-primary" defaultChecked />
                        <Label htmlFor="activityBreakdown" className="font-normal">Activity Breakdown</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="neutralityPathways" className="rounded text-carbmit-primary" defaultChecked />
                        <Label htmlFor="neutralityPathways" className="font-normal">Neutrality Pathways</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="costAnalysis" className="rounded text-carbmit-primary" />
                        <Label htmlFor="costAnalysis" className="font-normal">Cost Analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="recommendations" className="rounded text-carbmit-primary" defaultChecked />
                        <Label htmlFor="recommendations" className="font-normal">Recommendations</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow"></div>
                  
                  <Button className="mt-auto bg-carbmit-primary hover:bg-carbmit-primary/90">
                    Generate Report
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
              <CardDescription>Sample layout of your generated report</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-md p-6 flex flex-col items-center justify-center">
                <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                  <div className="mb-4 border-b pb-4">
                    <h3 className="text-xl font-bold text-center text-carbmit-primary">Carbon Assessment Report</h3>
                    <p className="text-center text-sm text-gray-500">Q2 2023</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    
                    <div className="h-32 bg-gray-200 rounded mt-6 mb-6 flex items-center justify-center">
                      <BarChart3 className="h-12 w-12 text-gray-400" />
                    </div>
                    
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-6">
                  <Download className="mr-2 h-4 w-4" />
                  Download Sample
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>Access your previously generated reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="secondary">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetFilter}>
                    <Filter className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md">
                <div className="grid grid-cols-12 gap-2 p-3 bg-muted font-medium text-sm">
                  <div className="col-span-6">Title</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-1">Pages</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>
                
                {filteredReports.length > 0 ? (
                  filteredReports.map(report => (
                    <div key={report.id} className="grid grid-cols-12 gap-2 p-3 border-t hover:bg-gray-50">
                      <div className="col-span-6 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-carbmit-primary" />
                        <span className="truncate">{report.title}</span>
                      </div>
                      <div className="col-span-2 text-sm">{new Date(report.date).toLocaleDateString()}</div>
                      <div className="col-span-2 text-sm capitalize">{report.type}</div>
                      <div className="col-span-1 text-sm">{report.pages}</div>
                      <div className="col-span-1 flex justify-end">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No reports found matching your search.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Pre-designed templates for quick generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="mb-2 text-carbmit-primary">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium">Quarterly Summary</h3>
                  <p className="text-sm text-gray-500">Basic overview of emissions for quarterly reporting</p>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="mb-2 text-carbmit-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium">Annual Sustainability</h3>
                  <p className="text-sm text-gray-500">Comprehensive annual report with detailed analysis</p>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="mb-2 text-carbmit-primary">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium">Pathway Analysis</h3>
                  <p className="text-sm text-gray-500">Focused report on carbon neutrality pathways</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
