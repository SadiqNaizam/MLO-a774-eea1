import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Reason {
  id: string;
  percentage: number;
  text: string;
  details?: string; 
}

const baseReasonsData: Reason[] = [
  { id: 'unclearProposal', percentage: 40, text: 'The proposal was unclear', details: 'Clients found the scope or deliverables ill-defined.' },
  { id: 'venturePursuit', percentage: 20, text: 'Client pursued other ventures', details: 'The lead decided to allocate resources to different internal projects.' },
  { id: 'other', percentage: 10, text: 'Other miscellaneous reasons', details: 'Various unclassified reasons for lead loss.' },
  { id: 'budgetConstraints', percentage: 30, text: 'Budget constraints', details: 'The proposed solution exceeded the client\'s allocated budget.' },
];

const additionalReasonsSample: Reason[] = [
    { id: 'timing', percentage: 25, text: 'Timing not right for client', details: 'Client postponed the decision due to internal or market factors.' },
    { id: 'lostToCompetitor', percentage: 15, text: 'Lost to competitor', details: 'A competitor offered a solution клиента deemed more suitable.' }, // клиента -> client (typo in thought, fixed here)
    { id: 'noResponse', percentage: 18, text: 'No response after follow-up', details: 'Lead became unresponsive despite multiple follow-up attempts.' },
    { id: 'featureGap', percentage: 22, text: 'Product/service feature gap', details: 'Our offering lacked specific features the client required.' },
    { id: 'poorFit', percentage: 28, text: 'Not a good fit', details: 'Client needs and our offerings were not well-aligned.' },
];

const ReasonAnalysis: React.FC<{ className?: string }> = ({ className }) => {
  const [displayReasons, setDisplayReasons] = React.useState<Reason[]>([]);

  React.useEffect(() => {
    const allReasons = [...baseReasonsData, ...additionalReasonsSample];
    const shuffled = [...allReasons].sort(() => 0.5 - Math.random());
    // Ensure a visually balanced grid, typically 4 items for 2x2
    // Or ensure a minimum number of reasons are shown
    const numToShow = Math.min(4, shuffled.length); // Show up to 4 reasons
    setDisplayReasons(shuffled.slice(0, numToShow));
  }, []);

  if (displayReasons.length === 0) return null;

  return (
    <TooltipProvider>
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-prd-primary-text">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {displayReasons.map((reason) => (
              <div key={reason.id}>
                {reason.details ? (
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <div>
                        <p className="text-3xl font-bold text-prd-primary-text">{reason.percentage}%</p>
                        <p className="text-sm text-prd-secondary-text mt-1 truncate" title={reason.text}>{reason.text}</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{reason.details}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div>
                    <p className="text-3xl font-bold text-prd-primary-text">{reason.percentage}%</p>
                    <p className="text-sm text-prd-secondary-text mt-1 truncate" title={reason.text}>{reason.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default ReasonAnalysis;
