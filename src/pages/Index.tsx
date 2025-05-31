import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import FunnelChart from '../components/Dashboard/FunnelChart';
import SourcesPieChart from '../components/Dashboard/SourcesPieChart';
import LeadsTrackingGraph from '../components/Dashboard/LeadsTrackingGraph';
import ReasonAnalysis from '../components/Dashboard/ReasonAnalysis';
import MetricsCards from '../components/Dashboard/MetricsCards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LeadsDashboardPage: React.FC = () => {
  return (
    <MainAppLayout title="Dashboard">
      <div className="space-y-6 md:space-y-8">
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="inline-flex h-auto items-center justify-start border-b border-border p-0 bg-transparent space-x-1 sm:space-x-2 mb-6">
            <TabsTrigger 
              value="sales" 
              className="relative px-3 sm:px-4 py-2.5 text-sm font-medium border-b-2 border-transparent rounded-none -mb-[1px] data-[state=active]:text-primary data-[state=active]:border-primary text-muted-foreground hover:text-primary focus-visible:ring-offset-0 focus-visible:ring-0 data-[state=active]:shadow-none bg-transparent hover:bg-transparent transition-none"
            >
              Sales
            </TabsTrigger>
            <TabsTrigger 
              value="leads"
              className="relative px-3 sm:px-4 py-2.5 text-sm font-medium border-b-2 border-transparent rounded-none -mb-[1px] data-[state=active]:text-primary data-[state=active]:border-primary text-muted-foreground hover:text-primary focus-visible:ring-offset-0 focus-visible:ring-0 data-[state=active]:shadow-none bg-transparent hover:bg-transparent transition-none"
            >
              Leads
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales">
            <div className="flex items-center justify-center h-96 border border-dashed rounded-lg bg-muted/20">
              <div className="text-center p-10">
                <h2 className="text-xl font-semibold text-prd-primary-text">Sales Data Not Implemented</h2>
                <p className="text-prd-secondary-text mt-2">This section is a placeholder for sales-related information.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6 md:space-y-8">
            {/* Row 1: FunnelChart and SourcesPieChart */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <FunnelChart />
              <SourcesPieChart />
            </div>

            {/* Row 2: LeadsTrackingGraph (full width) */}
            <LeadsTrackingGraph /> 

            {/* Row 3: ReasonAnalysis and MetricsCards (Other data) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <ReasonAnalysis />
              <MetricsCards />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainAppLayout>
  );
};

export default LeadsDashboardPage;
