"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { BoxAccompanimentModal } from "@/components/modals/BoxAccompanimentModal";
import { BaconCupcakeModal } from "@/components/modals/BaconCupcakeModal";
import { NutellaCrepesModal } from "@/components/modals/NutellaCrepeModal";

export default function ProductPage() {
  const [boxModalOpen, setBoxModalOpen] = useState(false);
  const [cupcakeModalOpen, setCupcakeModalOpen] = useState(false);
  const [crepeModalOpen, setCrepeModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setBoxModalOpen(true)}>Open Box Modal</Button>
      <Button onClick={() => setCupcakeModalOpen(true)}>
        Open Cupcake Modal
      </Button>
      <Button onClick={() => setCrepeModalOpen(true)}>Open Crepe Modal</Button>

      <BoxAccompanimentModal
        isOpen={boxModalOpen}
        setIsOpen={setBoxModalOpen}
      />
      <BaconCupcakeModal
        isOpen={cupcakeModalOpen}
        setIsOpen={setCupcakeModalOpen}
      />
      <NutellaCrepesModal
        isOpen={crepeModalOpen}
        setIsOpen={setCrepeModalOpen}
      />
    </div>
  );
}
