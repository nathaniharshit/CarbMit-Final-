
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

type EmissionData = {
  name: string;
  emissions: number;
  reduction: number;
};

type EmissionsChartProps = {
  data: EmissionData[];
};

const EmissionsChart: React.FC<EmissionsChartProps> = ({ data }) => {
  return (
    <div className="chart-container h-96">
      <h3 className="text-lg font-semibold mb-4">Emissions by Activity</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend />
          <Bar 
            dataKey="emissions" 
            name="CO₂ Emissions" 
            fill="#0F7A6C" 
            barSize={30}
          />
          <Bar 
            dataKey="reduction" 
            name="Potential Reduction" 
            fill="#6B9080" 
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionsChart;
