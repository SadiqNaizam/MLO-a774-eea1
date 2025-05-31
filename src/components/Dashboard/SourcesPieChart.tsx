import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SourceData {
  name: string;
  value: number; // Corresponds to $ amount in image
  leads: number; // Actual value for pie chart segments
  color: string; // Hex color for Recharts
  tailwindColor: string; // Tailwind bg class for legend dot
}

const initialPieData: SourceData[] = [
  { name: 'Clutch', value: 3000, leads: 50, color: '#E67E22', tailwindColor: 'bg-chart-4' },
  { name: 'Behance', value: 1000, leads: 40, color: '#F9A826', tailwindColor: 'bg-chart-1' },
  { name: 'Instagram', value: 1000, leads: 10, color: '#3498DB', tailwindColor: 'bg-chart-3' },
  { name: 'Dribbble', value: 1000, leads: 10, color: '#388E3C', tailwindColor: 'bg-prd-accent-green' },
];

const additionalPieDataSample: SourceData[] = [
    { name: 'Google Ads', value: 2500, leads: 30, color: '#e74c3c', tailwindColor: 'bg-red-600' },
    { name: 'Referral', value: 1800, leads: 25, color: '#9b59b6', tailwindColor: 'bg-purple-600' },
    { name: 'Organic Search', value: 4200, leads: 60, color: '#2ecc71', tailwindColor: 'bg-emerald-500' },
    { name: 'LinkedIn', value: 1500, leads: 18, color: '#0077b5', tailwindColor: 'bg-sky-600' },
];

const SourcesPieChart: React.FC<{ className?: string }> = ({ className }) => {
  const [chartData, setChartData] = React.useState<SourceData[]>(initialPieData);

  React.useEffect(() => {
    // Create a more complex dataset by combining initial and a random selection from additional samples
    const shuffledAdditional = [...additionalPieDataSample].sort(() => 0.5 - Math.random());
    // Take 0 to 2 additional sources to make it dynamic but not too cluttered
    const numberOfAdditionalSources = Math.floor(Math.random() * 3);
    const finalData = [...initialPieData, ...shuffledAdditional.slice(0, numberOfAdditionalSources)];
    setChartData(finalData);
  }, []);

  const totalLeads = chartData.reduce((sum, item) => sum + item.leads, 0);

  return (
    <TooltipProvider>
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-prd-primary-text">Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[220px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={85}
                  innerRadius={55} // Donut chart
                  fill="#8884d8"
                  dataKey="leads"
                  stroke="hsl(var(--card))"
                  strokeWidth={3}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    color: 'hsl(var(--popover-foreground))',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value: number, name: string) => [`${value} leads (${((value / totalLeads) * 100).toFixed(0)}%)`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-2.5">
            {chartData.map((source, index) => (
              <li key={source.name} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-2.5 text-sm">
                <div className={cn("w-2.5 h-2.5 rounded-sm flex-shrink-0", source.tailwindColor)} />
                <span className="text-prd-primary-text truncate" title={source.name}>{source.name}</span>
                <span className="text-prd-secondary-text justify-self-end font-medium tabular-nums">${source.value.toLocaleString()}</span>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span className="text-prd-secondary-text justify-self-end tabular-nums w-12 text-right">
                      {((source.leads / totalLeads) * 100).toFixed(0)}%
                    </span>
                  </TooltipTrigger>
                  {/* Show tooltip for the last item in the initial list as per image's visual hint */}
                  {(initialPieData.length > 0 && source.name === initialPieData[initialPieData.length -1].name && index < initialPieData.length) && (
                    <TooltipContent side="top" className="bg-slate-800 text-white text-xs p-1.5 rounded shadow-lg">
                      <p>from leads total</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default SourcesPieChart;
