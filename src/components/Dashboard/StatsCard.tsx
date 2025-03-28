
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

type StatsCardProps = {
  title: string;
  value: string | number;
  unit: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
};

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  unit, 
  change, 
  trend = 'neutral',
  icon 
}) => {
  return (
    <div className="stat-card">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 rounded-full bg-carbmit-accent text-carbmit-primary">
          {icon}
        </div>
      </div>
      <div className="flex items-end">
        <p className="text-2xl font-bold">{value}</p>
        <p className="ml-1 text-sm text-gray-500">{unit}</p>
      </div>
      {change !== undefined && (
        <div className="flex items-center mt-2">
          {trend === 'up' && (
            <ArrowUp className="h-4 w-4 text-red-500 mr-1" />
          )}
          {trend === 'down' && (
            <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
          )}
          <span 
            className={`text-xs ${
              trend === 'up' ? 'text-red-500' : 
              trend === 'down' ? 'text-green-500' : 'text-gray-500'
            }`}
          >
            {change >= 0 ? '+' : ''}{change}% from last quarter
          </span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
