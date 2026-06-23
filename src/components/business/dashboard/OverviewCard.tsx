import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icons from "./Icons";

// Mock data — TODO(Phase 3): replace with real metrics from the analytics API.
const overviewData = {
  totalSales: 15000,
  totalOrders: 150,
  bestSeller: "Chocolate Cake",
};

const overviewConfig: Record<
  string,
  { label: string; value: string | number }
> = {
  totalSales: { label: "Total Sales", value: `$${overviewData.totalSales}` },
  totalOrders: { label: "Total Orders", value: overviewData.totalOrders },
  bestSeller: { label: "Best Seller", value: overviewData.bestSeller },
};

const OverviewCard = ({ title }: { title: string }) => {
  const config = overviewConfig[title];
  if (!config) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{config.label}</CardTitle>
        <Icons title={title} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{config.value}</div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
