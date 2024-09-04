import OurMission from "@/components/about-us/OurMission";
import OurValues from "@/components/about-us/OurValues";
import OurTeam from "@/components/about-us/OurTeam";
import ContactUs from "@/components/about-us/ContactUs";

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About SweetTreats Marketplace</h1>
      <OurMission />
      <OurValues />
      <OurTeam />
      <ContactUs />
    </div>
  );
}
