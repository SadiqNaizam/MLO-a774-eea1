import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  leads: number;
  value: number;
  avgTime: string;
  color: string; // Tailwind background color class e.g., 'bg-red-500'
}

const funnelDataDefinition: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', leads: 200, value: 200, avgTime: '2 days', color: 'bg-destructive' }, 
  { id: 'qualified', name: 'Qualified', leads: 100, value: 100, avgTime: '2 days', color: 'bg-chart-1' }, 
  { id: 'inConversation', name: 'In conversation', leads: 50, value: 100, avgTime: '2 days', color: 'bg-slate-600' },
  { id: 'negotiations', name: 'Negotiations', leads: 20, value: 50, avgTime: '8 days', color: 'bg-prd-accent-green' },
  { id: 'closedWon', name: 'Closed won', leads: 20, value: 50, avgTime: '10 days', color: 'bg-chart-2' }, 
];

const FunnelChart: React.FC<{ className?: string }> = ({ className }) => {
  const totalLeadsInDisplayedFunnel = funnelDataDefinition.reduce((sum, stage) => sum + stage.leads, 0);
  const totalActiveLeadsOverall = 600; // As per image, representing a broader pool or top of funnel

  return (
    <TooltipProvider>
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-prd-primary-text">Funnel count</CardTitle>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-bold text-prd-primary-text">{totalActiveLeadsOverall}</span>
            <span className="text-sm text-prd-secondary-text">active leads</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-3.5 flex rounded-full overflow-hidden mb-6 bg-muted">
            {funnelDataDefinition.map((stage) => (
              <Tooltip key={stage.id} delayDuration={100}>
                <TooltipTrigger asChild>
                  <div
                    className={cn("h-full transition-all duration-300 ease-in-out", stage.color)}
                    style={{ width: `${(stage.leads / totalLeadsInDisplayedFunnel) * 100}%` }}
                    aria-label={`${stage.name}: ${stage.leads} leads`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.leads} leads</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <ul className="space-y-3">
            {funnelDataDefinition.map((stage) => (
              <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
                <div className={cn("w-2.5 h-2.5 rounded-sm flex-shrink-0", stage.color)} />
                <span className="text-prd-primary-text truncate" title={stage.name}>{stage.name}</span>
                <span className="text-prd-secondary-text justify-self-end font-medium tabular-nums">{stage.leads}</span>
                <span className="text-prd-secondary-text justify-self-end tabular-nums">${stage.value.toLocaleString()}</span>
                {stage.id === 'inConversation' ? (
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <span className="text-prd-secondary-text justify-self-end tabular-nums cursor-default">{stage.avgTime}</span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-800 text-white text-xs p-1.5 rounded shadow-lg">
                      <p>average time on this stage</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <span className="text-prd-secondary-text justify-self-end tabular-nums">{stage.avgTime}</span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default FunnelChart;
