import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface AccompanimentItem {
  name: string;
  price: string;
}

const accompaniments: AccompanimentItem[] = [
  { name: "Chocolat glacé", price: "42,00MAD" },
  { name: "Lait chaud", price: "50,00MAD" },
  { name: "Caramel Macchiato", price: "36,00MAD" },
  { name: "Nutella Latté", price: "28,00MAD" },
  { name: "Honey Bear Latté", price: "35,00MAD" },
  { name: "Iced Honey Bear Latté", price: "42,00MAD" },
  { name: "Spanish Latté", price: "40,00MAD" },
  { name: "Iced Americano", price: "24,00MAD" },
  { name: "Iced Caffè Latté", price: "49,00MAD" },
];

export function BoxAccompanimentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Souhaitez vous accompagner votre Box de Boissons ?
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {accompaniments.map((item, index) => (
              <div
                key={index}
                className="col-span-4 flex justify-between items-center"
              >
                <span>{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">{item.price}</span>
                  <Button variant="outline" size="sm">
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">
              Boite Familiale : 12 Donuts variés
            </h3>
            <p className="text-sm text-muted-foreground">
              Une variété de 12 donuts frais et chocolatés fourrés
            </p>
          </div>
          <Image
            src="/placeholder.svg"
            alt="Donuts Box"
            width={100}
            height={100}
            className="rounded-md"
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-16 text-center"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button className="w-full mt-4">Add 1 for 189,70 MAD</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
