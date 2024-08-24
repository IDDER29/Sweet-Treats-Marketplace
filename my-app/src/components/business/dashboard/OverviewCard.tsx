import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icons from "./Icons";

// Mock data
const overviewData = {
  totalSales: 15000,
  totalOrders: 150,
  bestSeller: "Chocolate Cake",
};
let sectionTitle: any = null;
let overviewDataValue: any = null;
const OverviewCard = ({ title }: { title: string }) => {
  setoverviewValues(title);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{sectionTitle}</CardTitle>
        <Icons title={title} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{overviewDataValue}</div>
      </CardContent>
    </Card>
  );
};

const setoverviewValues = (title: string) => {
  switch (title) {
    case "totalSales":
      sectionTitle = "Total Sales";
      overviewDataValue = `$${overviewData.totalSales}`;
      break;
    case "totalOrders":
      sectionTitle = "Total Orders";
      overviewDataValue = overviewData.totalOrders;
      break;
    case "bestSeller":
      sectionTitle = "Best Seller";
      overviewDataValue = overviewData.bestSeller;
      break;
    default:
      return null;
  }
};

export default OverviewCard;
