import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface Topping {
  name: string;
  price: string;
}

const toppings: Topping[] = [
  { name: "Chocolat Banane Noix", price: "+$1.00" },
  { name: "Vanille Fraise Organic Strawberries", price: "+$1.50" },
  { name: "Nutella", price: "+$0.50" },
  { name: "Caramel Sauce", price: "+$0.50" },
];

export function NutellaCrepesModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nutella Crêpe</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Image
            src="/placeholder.svg"
            alt="Nutella Crêpe"
            width={300}
            height={200}
            className="rounded-md w-full"
          />
          <div>
            <h3 className="font-semibold">$11.00</h3>
            <p className="text-sm text-muted-foreground">
              Chocolate creamy ganache, whipped mascarpone, crumble de Oreo et
              Nutella, Oreo crumbs, Nutella drizzle, topped with Nutella Oreo
              ice cream
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Toppings</h4>
            <p className="text-sm text-muted-foreground">Choose up to 4</p>
            {toppings.map((topping, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Checkbox id={`topping-${index}`} />
                <label
                  htmlFor={`topping-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {topping.name}{" "}
                  <span className="text-muted-foreground">
                    ({topping.price})
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full">Enter address for availability</Button>
        </DialogFooter>
        <p className="text-center text-sm text-muted-foreground mt-2">
          See details
        </p>
      </DialogContent>
    </Dialog>
  );
}
