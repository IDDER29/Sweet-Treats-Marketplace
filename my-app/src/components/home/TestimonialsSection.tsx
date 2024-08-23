import React from "react";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const testimonials = [
  {
    id: 1,
    text: "The quality of the pastries is amazing! I love supporting local bakeries.",
    author: "Sarah M.",
  },
  {
    id: 2,
    text: "This platform has helped my small bakery reach so many new customers!",
    author: "John D., Sweet Treats Bakery",
  },
  {
    id: 3,
    text: "Ordering is so easy, and the delivery is always on time. Highly recommend!",
    author: "Emily L.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-muted">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  <Star className="text-yellow-400 fill-current" />
                  <Star className="text-yellow-400 fill-current" />
                  <Star className="text-yellow-400 fill-current" />
                  <Star className="text-yellow-400 fill-current" />
                  <Star className="text-yellow-400 fill-current" />
                </div>
                <p className="mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold">- {testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
