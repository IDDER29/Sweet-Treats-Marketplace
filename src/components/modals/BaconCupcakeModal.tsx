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
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export function BaconCupcakeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bacon Cupcake</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Image
            src="/placeholder.svg"
            alt="Bacon Cupcake"
            width={300}
            height={200}
            className="rounded-md w-full"
          />
          <p className="text-sm text-muted-foreground">
            Cream cheese frosting, chocolate chips, corn flakes, baking powder,
            and topped with whipped cream cheese
          </p>
          <div>
            <h4 className="font-semibold mb-2">Preferences</h4>
            <Textarea placeholder="Add Special Instructions (Optional)" />
          </div>
          <div className="flex items-center justify-between">
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
            <Button>Add to cart - $4.00</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
