"use client"; // Ensures this component is client-side

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteProductById } from "@/utils/api";
import type { Product } from "@/types";

interface ActionsProps {
  product: Product;
  onChanged?: () => void;
}

const Actions = ({ product, onChanged }: ActionsProps) => {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleEdit = () => {
    router.push(`/business/dashboard/products/edit?id=${product.id}`);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProductById(product.id);
      toast.success("Product deleted.");
      setConfirmOpen(false);
      if (onChanged) {
        onChanged();
      } else {
        router.refresh();
      }
    } catch {
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex space-x-2">
      <Button size="sm" variant="outline" onClick={handleEdit}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setConfirmOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete product?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{product.name}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Actions;
