import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

type LeadsDataPoint = {
  month: string;
  closedWon: number;
  closedLost: number;
  leadsCame: number;
  totalDealsSize: number;
};

const baseLeadsTrackingData: LeadsDataPoint[] = [
  { month: 'Mar', closedWon: 65, closedLost: 50, leadsCame: 120, totalDealsSize: 55000 },
  { month: 'Apr', closedWon: 52, closedLost: 38, leadsCame: 100, totalDealsSize: 48000 },
  { month: 'May', closedWon: 78, closedLost: 60, leadsCame: 150, totalDealsSize: 72000 },
  { month: 'Jun', closedWon: 60, closedLost: 10, leadsCame: 110, totalDealsSize: 60000 },
  { month: 'Jul', closedWon: 85, closedLost: 35, leadsCame: 160, totalDealsSize: 80000 },
  { month: 'Aug', closedWon: 30, closedLost: 95, leadsCame: 90, totalDealsSize: 45000 },
];

// Function to generate more varied data
const generateComplexData = (baseData: LeadsDataPoint[]): LeadsDataPoint[] => {
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
  const extendedData = [...baseData];
  for (let i = 0; i < Math.floor(Math.random() * 4) + 2; i++) { // Add 2-5 more months
    const prev = extendedData[extendedData.length -1];
    extendedData.push({
      month: months[i % months.length],
      closedWon: Math.max(10, prev.closedWon + Math.floor(Math.random() * 40) - 20),
      closedLost: Math.max(5, prev.closedLost + Math.floor(Math.random() * 30) - 15),
      leadsCame: Math.max(50, prev.leadsCame + Math.floor(Math.random() * 50) - 25),
      totalDealsSize: Math.max(20000, prev.totalDealsSize + Math.floor(Math.random() * 30000) - 15000),
    });
  }
  return extendedData.slice(- (6 + Math.floor(Math.random()*2))); // show last 6-7 months for consistency
};

type ActiveTab = 'leadsConverted' | 'leadsCame' | 'totalDealsSize';

const LeadsTrackingGraph: React.FC<{ className?: string }> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('leadsConverted');
  const chartData = useMemo(() => generateComplexData(baseLeadsTrackingData), []);

  const totalClosed = chartData.reduce((sum, item) => sum + item.closedWon, 0);
  const totalLost = chartData.reduce((sum, item) => sum + item.closedLost, 0);

  const getPrimaryDataKey = (): keyof LeadsDataPoint => {
    if (activeTab === 'leadsCame') return 'leadsCame';
    if (activeTab === 'totalDealsSize') return 'totalDealsSize';
    return 'closedWon';
  };

  const primaryDataKey = getPrimaryDataKey();
  const showSecondaryLine = activeTab === 'leadsConverted';
  const yAxisLabel = activeTab === 'totalDealsSize' ? '$' : '';

  const primaryLineName = 
    activeTab === 'leadsConverted' ? 'Closed won'
    : activeTab === 'leadsCame' ? 'Leads Came'
    : 'Total Deals Size';

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="text-lg font-semibold text-prd-primary-text">Leads tracking</CardTitle>
                <div className="flex items-baseline space-x-4 mt-1">
                    <div>
                        <span className="text-2xl md:text-3xl font-bold text-prd-primary-text">{totalClosed.toLocaleString()}</span>
                        <span className="text-xs md:text-sm text-prd-secondary-text ml-1">total closed</span>
                    </div>
                    <div>
                        <span className="text-2xl md:text-3xl font-bold text-prd-primary-text">{totalLost.toLocaleString()}</span>
                        <span className="text-xs md:text-sm text-prd-secondary-text ml-1">total lost</span>
                    </div>
                </div>
            </div>
            <Tabs defaultValue="leadsConverted" onValueChange={(value) => setActiveTab(value as ActiveTab)} className="w-full sm:w-auto">
                <TabsList className="bg-muted grid w-full grid-cols-3 sm:inline-flex">
                    <TabsTrigger value="leadsCame" className="text-xs px-2.5 py-1.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">Leads came</TabsTrigger>
                    <TabsTrigger value="leadsConverted" className="text-xs px-2.5 py-1.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">Leads Converted</TabsTrigger>
                    <TabsTrigger value="totalDealsSize" className="text-xs px-2.5 py-1.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">Total deals size</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 25 }}>
              <defs>
                  <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3498DB" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3498DB" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D32F2F" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#D32F2F" stopOpacity={0.05}/>
                  </linearGradient>
                   <linearGradient id="colorPrimaryArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                  </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                dy={10}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${yAxisLabel}${typeof value === 'number' ? value.toLocaleString() : value}`}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                dx={-5}
                width={yAxisLabel ? 65 : 50}
              />
              <RechartsTooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    color: 'hsl(var(--popover-foreground))',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: number, name: string) => {
                    const formattedValue = activeTab === 'totalDealsSize' ? `$${value.toLocaleString()}` : value.toLocaleString();
                    return [formattedValue, name];
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                align="left" 
                wrapperStyle={{ paddingTop: '20px', paddingLeft: '20px' }} 
                iconType="circle"
                iconSize={8}
                formatter={(value, entry: any) => {
                  const name = entry.payload?.name || value;
                  let colorClass = 'text-primary';
                  if (name === 'Closed won') colorClass = 'text-chart-3';
                  else if (name === 'Closed lost') colorClass = 'text-destructive';
                  return <span className={`text-sm ${colorClass}`}>{name}</span>;
                }}
              />
              <Area
                  type="monotone"
                  dataKey={primaryDataKey}
                  stroke={activeTab === 'leadsConverted' ? '#3498DB' : 'hsl(var(--primary))'}
                  fill={activeTab === 'leadsConverted' ? 'url(#colorClosedWon)' : 'url(#colorPrimaryArea)'}
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 2, fill: activeTab === 'leadsConverted' ? '#3498DB' : 'hsl(var(--primary))', stroke: 'hsl(var(--card))' }}
                  activeDot={{ r: 6, strokeWidth: 2, fill: activeTab === 'leadsConverted' ? '#3498DB' : 'hsl(var(--primary))', stroke: 'hsl(var(--card))' }}
                  name={primaryLineName}
              />
              {showSecondaryLine && (
                  <Area
                      type="monotone"
                      dataKey="closedLost"
                      stroke={'#D32F2F'}
                      fill="url(#colorClosedLost)"
                      strokeWidth={2.5}
                      dot={{ r: 4, strokeWidth: 2, fill: '#D32F2F', stroke: 'hsl(var(--card))' }}
                      activeDot={{ r: 6, strokeWidth: 2, fill: '#D32F2F', stroke: 'hsl(var(--card))' }}
                      name="Closed lost"
                  />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingGraph;
