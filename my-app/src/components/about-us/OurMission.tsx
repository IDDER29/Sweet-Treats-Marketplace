import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const OurMission = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Our Mission</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">
          At SweetTreats Marketplace, our mission is to connect local bakeries
          and sweet shops with dessert enthusiasts, creating a thriving
          community of food lovers and small businesses. We strive to make every
          day a little sweeter by bringing delightful treats to your doorstep.
        </p>
      </CardContent>
    </Card>
  );
};

export default OurMission;
