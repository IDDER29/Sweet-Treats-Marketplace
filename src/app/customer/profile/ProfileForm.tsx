"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Plus, Trash2 } from "lucide-react";

import { getMyProfile, updateMyProfile } from "@/services/customers";
import type { Address, Customer } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";

interface ProfileFormState {
  name: string;
  phone: string;
  addresses: Address[];
}

function emptyAddress(): Address {
  return { line1: "", city: "" };
}

function toFormState(profile: Customer): ProfileFormState {
  return {
    name: profile.name ?? "",
    phone: profile.phone ?? "",
    addresses: profile.addresses ?? [],
  };
}

export default function ProfileForm({
  sessionEmail,
}: {
  sessionEmail?: string;
}) {
  const queryClient = useQueryClient();
  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useQuery<Customer>({
    queryKey: ["customer", "me"],
    queryFn: getMyProfile,
  });

  const [form, setForm] = useState<ProfileFormState>({
    name: "",
    phone: "",
    addresses: [],
  });

  // Seed the controlled form once the profile resolves.
  useEffect(() => {
    if (profile) {
      setForm(toFormState(profile));
    }
  }, [profile]);

  const mutation = useMutation<Customer, Error, ProfileFormState>({
    mutationFn: (values) =>
      updateMyProfile({
        name: values.name,
        phone: values.phone,
        addresses: values.addresses,
      }),
    onSuccess: (updated) => {
      queryClient.setQueryData(["customer", "me"], updated);
      toast.success("Profile updated.");
    },
    onError: () => {
      toast.error("Could not save your profile. Please try again.");
    },
  });

  if (isLoading) {
    return <LoadingState rows={5} />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Couldn't load your profile"
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  const email = profile?.email ?? sessionEmail ?? "";

  const handleField =
    (field: "name" | "phone") => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleAddressField =
    (index: number, field: keyof Address) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setForm((prev) => ({
        ...prev,
        addresses: prev.addresses.map((addr, i) =>
          i === index ? { ...addr, [field]: value } : addr
        ),
      }));
    };

  const addAddress = () => {
    setForm((prev) => ({
      ...prev,
      addresses: [...prev.addresses, emptyAddress()],
    }));
  };

  const removeAddress = (index: number) => {
    setForm((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Account details</CardTitle>
          <CardDescription>
            Update your contact information. Your email is managed by your
            sign-in and can&apos;t be changed here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={handleField("name")}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              readOnly
              disabled
              className="bg-muted"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={handleField("phone")}
              placeholder="+212 600-000000"
              autoComplete="tel"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Delivery addresses</CardTitle>
              <CardDescription>
                Where we&apos;ll deliver your sweet treats.
              </CardDescription>
            </div>
            <Button type="button" variant="outline" onClick={addAddress}>
              <Plus className="mr-2 h-4 w-4" />
              Add address
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {form.addresses.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No addresses saved yet. Add one so checkout is faster.
            </p>
          ) : (
            form.addresses.map((address, index) => (
              <div key={index} className="space-y-4">
                {index > 0 && <Separator />}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">
                    Address {index + 1}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAddress(index)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor={`line1-${index}`}>Street address</Label>
                    <Input
                      id={`line1-${index}`}
                      value={address.line1}
                      onChange={handleAddressField(index, "line1")}
                      placeholder="123 Baker Street"
                    />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor={`line2-${index}`}>
                      Apartment, suite (optional)
                    </Label>
                    <Input
                      id={`line2-${index}`}
                      value={address.line2 ?? ""}
                      onChange={handleAddressField(index, "line2")}
                      placeholder="Apt 4B"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`city-${index}`}>City</Label>
                    <Input
                      id={`city-${index}`}
                      value={address.city}
                      onChange={handleAddressField(index, "city")}
                      placeholder="Casablanca"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`postalCode-${index}`}>Postal code</Label>
                    <Input
                      id={`postalCode-${index}`}
                      value={address.postalCode ?? ""}
                      onChange={handleAddressField(index, "postalCode")}
                      placeholder="20000"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
