import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    text: "The croissants from La Maison Bakery were absolutely incredible. I never thought I'd find something this good outside of Paris!",
    author: "Sarah M.",
    role: "Regular customer",
    rating: 5,
  },
  {
    id: 2,
    text: "This platform helped my small bakery triple our online orders in just two months. The setup was painless and the support is fantastic.",
    author: "John D.",
    role: "Bakery owner",
    rating: 5,
  },
  {
    id: 3,
    text: "Ordering is so easy, and the delivery is always on time. It's become my go-to for birthday cakes and weekend treats.",
    author: "Emily L.",
    role: "Loyal customer",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">
          What Our Community Says
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          From happy customers to thriving bakery owners — hear what people love
          about Sweet Treats Marketplace.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <div className="flex mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
