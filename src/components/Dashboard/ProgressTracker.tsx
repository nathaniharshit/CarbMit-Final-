
import React from 'react';
import { Progress } from "@/components/ui/progress";

type ProgressTrackerProps = {
  currentEmissions: number;
  targetEmissions: number;
  neutralityDate: string;
};

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  currentEmissions, 
  targetEmissions, 
  neutralityDate 
}) => {
  // Calculate progress percentage
  const progressPercentage = Math.min(
    Math.round((1 - currentEmissions / (currentEmissions + targetEmissions)) * 100),
    100
  );

  return (
    <div className="p-6 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-4">Carbon Neutrality Progress</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Current: {currentEmissions} tCO₂e</span>
          <span>Target: {targetEmissions} tCO₂e</span>
        </div>
        
        <Progress value={progressPercentage} className="h-3" />
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Progress: {progressPercentage}%</span>
          <span className="text-carbmit-primary font-medium">
            Target Date: {neutralityDate}
          </span>
        </div>
      </div>
      
      <div className="mt-6 px-4 py-3 bg-carbmit-accent rounded-md">
        <p className="text-sm text-carbmit-primary">
          <span className="font-medium">Tip:</span> Consider expanding your 
          afforestation efforts to accelerate progress by an additional 15%.
        </p>
      </div>
    </div>
  );
};

export default ProgressTracker;
