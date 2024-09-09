import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Link from "next/link";

const HeaderSection = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="flex items-center space-x-2">
        <Input type="text" placeholder="Search products" className="max-w-sm" />
        <Link href="/business/dashboard/products/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderSection;
