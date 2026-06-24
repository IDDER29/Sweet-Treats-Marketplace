import { Users, Award, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Users,
    title: "Support Local Businesses",
    description:
      "Help your community thrive by ordering directly from local bakeries and artisans.",
  },
  {
    icon: Award,
    title: "Freshly Made by Artisans",
    description:
      "Enjoy high-quality, freshly baked goods made with passion and expertise — never mass-produced.",
  },
  {
    icon: Zap,
    title: "Fast, Reliable Delivery",
    description:
      "Convenient delivery right to your doorstep, ensuring your treats arrive fresh and on time.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Why Choose Us</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          We connect sweet-tooth lovers with the best local bakeries — because
          great treats deserve great service.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
