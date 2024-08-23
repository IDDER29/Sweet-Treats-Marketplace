import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "John Smith",
    role: "CTO",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Alice Johnson",
    role: "Head of Operations",
    image: "/placeholder.svg?height=100&width=100",
  },
];

const OurTeam = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Our Team</CardTitle>
        <CardDescription>
          Meet the people behind SweetTreats Marketplace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center"
            >
              <Avatar className="h-24 w-24 mb-2">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OurTeam;
