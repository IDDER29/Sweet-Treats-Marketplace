import React from "react";

import OverviewCard from "./OverviewCard";

// Mock data
const overviewData = {
  totalSales: 15000,
  totalOrders: 150,
  bestSeller: "Chocolate Cake",
};

const Overview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <OverviewCard title="totalSales" />
      <OverviewCard title="totalOrders" />
      <OverviewCard title="bestSeller" />
    </div>
  );
};

export default Overview;
