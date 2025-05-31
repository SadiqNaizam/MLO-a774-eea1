import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Clock, Info, TrendingUp, AlertTriangle, Percent, Zap } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MetricItem {
  id: string;
  title: string;
  value: string;
  icon: React.ElementType;
  iconColor?: string; 
  description?: string;
  tooltipText?: string;
}

const allMetricsData: MetricItem[] = [
  { 
    id: 'totalLeads', 
    title: 'total leads count', 
    value: '900', 
    icon: Users, 
    iconColor: 'text-blue-500',
  },
  { 
    id: 'avgConversionTime', 
    title: 'days in average to convert lead', 
    value: '12', 
    icon: Clock,
    iconColor: 'text-green-500',
  },
  { 
    id: 'inactiveLeads', 
    title: 'inactive leads', 
    value: '30', 
    icon: Info, // Matched with image's info icon
    iconColor: 'text-yellow-600', // Changed to yellow for Info icon
    tooltipText: 'Leads with no activity in the last 30 days'
  },
  {
    id: 'conversionRate',
    title: 'conversion rate',
    value: '25%',
    icon: Percent,
    iconColor: 'text-purple-500',
    description: '+2.1% from last month'
  },
  {
    id: 'newCustomers',
    title: 'new customers this Q',
    value: '153',
    icon: TrendingUp,
    iconColor: 'text-teal-500',
    description: 'Target: 200'
  },
  {
    id: 'atRiskLeads',
    title: 'at risk leads',
    value: '18',
    icon: AlertTriangle,
    iconColor: 'text-red-500',
    tooltipText: 'Leads showing signs of disengagement or negative sentiment'
  },
  {
    id: 'activeCampaigns',
    title: 'active campaigns',
    value: '5',
    icon: Zap,
    iconColor: 'text-orange-500',
    description: '2 new, 1 ending soon'
  },
];

interface StatCardProps extends MetricItem {}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, iconColor, description, tooltipText }) => {
  const cardContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-prd-secondary-text uppercase tracking-wide truncate" title={title}>{title}</p>
        {Icon && (
          <Icon className={cn("h-4 w-4 flex-shrink-0", iconColor || 'text-prd-secondary-text')} />
        )}
      </div>
      <p className="text-2xl md:text-3xl font-bold text-prd-primary-text mt-0.5">{value}</p>
      {description && <p className="text-xs text-prd-secondary-text mt-auto pt-1">{description}</p>}
    </div>
  );

  const cardElement = (
    <Card className="hover:shadow-lg transition-shadow duration-200 ease-in-out h-full">
      <CardContent className="p-4 h-full">
        {cardContent}
      </CardContent>
    </Card>
  );

  if (tooltipText) {
    return (
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{cardElement}</TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return cardElement;
};

const MetricsCards: React.FC<{ className?: string }> = ({ className }) => {
  const [selectedMetrics, setSelectedMetrics] = React.useState<MetricItem[]>([]);

  React.useEffect(() => {
    const shuffled = [...allMetricsData].sort(() => 0.5 - Math.random());
    // Display 3 to 6 metrics. Ensure at least 3 are shown if available.
    const minMetrics = Math.min(3, allMetricsData.length);
    const maxMetrics = Math.min(6, allMetricsData.length);
    const count = minMetrics + Math.floor(Math.random() * (maxMetrics - minMetrics + 1));
    setSelectedMetrics(shuffled.slice(0, count));
  }, []);

  if (selectedMetrics.length === 0) return null; // Don't render if no metrics (edge case)

  return (
    <TooltipProvider>
      <div className={cn("w-full", className)}>
        <h2 className="text-lg font-semibold text-prd-primary-text mb-4">Other data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedMetrics.map((metric) => (
            <StatCard key={metric.id} {...metric} />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MetricsCards;
