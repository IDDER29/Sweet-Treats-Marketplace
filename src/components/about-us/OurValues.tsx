import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const OurValues = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Our Values</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          <li>Support local businesses and artisans</li>
          <li>Deliver exceptional quality and taste</li>
          <li>Foster a community of food lovers</li>
          <li>Promote sustainability in food delivery</li>
          <li>Innovate in the world of online food marketplaces</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default OurValues;
