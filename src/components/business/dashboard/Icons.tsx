import React from "react";
import { DollarSign, ShoppingCart, Star } from "lucide-react";

const Icons = ({ title }: { title: string }) => {
  switch (title) {
    case "totalSales":
      return <DollarSign className="h-4 w-4 text-muted-foreground" />;
    case "totalOrders":
      return <ShoppingCart className="h-4 w-4 text-muted-foreground" />;
    case "bestSeller":
      return <Star className="h-4 w-4 text-muted-foreground" />;
    default:
      return null;
  }
};

export default Icons;
