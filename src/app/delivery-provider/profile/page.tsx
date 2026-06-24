"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Upload,
  Bike,
  Car,
  Truck,
  Zap,
  Camera,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type VehicleType = "motorcycle" | "car" | "bicycle" | "scooter";

type DocumentStatus = "verified" | "required";

type Document = {
  id: string;
  label: string;
  status: DocumentStatus;
};

// ---------------------------------------------------------------------------
// Vehicle options
// ---------------------------------------------------------------------------

const vehicleOptions: {
  value: VehicleType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "motorcycle", label: "Motorcycle", icon: <Zap className="h-5 w-5" /> },
  { value: "car", label: "Car", icon: <Car className="h-5 w-5" /> },
  { value: "bicycle", label: "Bicycle", icon: <Bike className="h-5 w-5" /> },
  { value: "scooter", label: "Scooter", icon: <Truck className="h-5 w-5" /> },
];

const documents: Document[] = [
  { id: "license", label: "Driver's License", status: "verified" },
  { id: "registration", label: "Vehicle Registration", status: "verified" },
  { id: "insurance", label: "Insurance Certificate", status: "required" },
];

// ---------------------------------------------------------------------------
// Upload zone sub-component
// ---------------------------------------------------------------------------

function UploadZone({
  label,
  status,
}: {
  label: string;
  status: DocumentStatus;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-800">{label}</Label>
        {status === "verified" ? (
          <span className="flex items-center gap-1 text-xs text-green-700 font-medium">
            <CheckCircle className="h-3.5 w-3.5" />
            Verified
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-amber-700 font-medium">
            <AlertCircle className="h-3.5 w-3.5" />
            Required
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() =>
          toast.info("File upload will be available in the next release.")
        }
        className={`w-full border-2 border-dashed rounded-lg px-4 py-5 flex flex-col items-center gap-2 transition-colors cursor-pointer
          ${
            status === "verified"
              ? "border-green-300 bg-green-50 hover:bg-green-100"
              : "border-amber-300 bg-amber-50 hover:bg-amber-100"
          }`}
      >
        <Upload
          className={`h-5 w-5 ${
            status === "verified" ? "text-green-500" : "text-amber-500"
          }`}
        />
        <span className="text-xs text-muted-foreground">
          {status === "verified"
            ? "Click to replace file"
            : "Upload PDF or image"}
        </span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ProfilePage() {
  // Personal information
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+212 612 345 678");
  const [dob, setDob] = useState("1992-04-15");
  const [nationalId, setNationalId] = useState("AB-123456");

  // Vehicle information
  const [vehicleType, setVehicleType] = useState<VehicleType>("motorcycle");
  const [licensePlate, setLicensePlate] = useState("12345-A-7");
  const [vehicleMake, setVehicleMake] = useState("Honda");
  const [vehicleModel, setVehicleModel] = useState("CB 125R");
  const [vehicleColor, setVehicleColor] = useState("Red");
  const [vehicleYear, setVehicleYear] = useState("2021");

  // Delivery preferences
  const [zones, setZones] = useState("Downtown, Medina, Agdal");
  const [prefMorning, setPrefMorning] = useState(true);
  const [prefAfternoon, setPrefAfternoon] = useState(true);
  const [prefEvening, setPrefEvening] = useState(false);
  const [maxDistance, setMaxDistance] = useState("10km");

  function handleSave() {
    toast.success("Profile saved successfully!");
  }

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Back link */}
        <Link
          href="/delivery-provider/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Driver Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your personal details, vehicle info, and documents
          </p>
        </div>

        <div className="space-y-6">

          {/* ── Profile photo ────────────────────────────────────────────── */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-5 flex-wrap sm:flex-nowrap">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                    <span className="text-white text-2xl font-bold">{initials}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      toast.info("Photo upload will be available soon.")
                    }
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-amber-400 flex items-center justify-center hover:bg-amber-50 transition-colors shadow-sm"
                    aria-label="Update photo"
                  >
                    <Camera className="h-3.5 w-3.5 text-amber-600" />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-900 truncate">
                      {fullName}
                    </h2>
                    <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{email}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast.info("Photo upload will be available soon.")
                  }
                  className="gap-2 flex-shrink-0"
                >
                  <Upload className="h-4 w-4" />
                  Update Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* ── Personal Information ─────────────────────────────────────── */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Personal Information</CardTitle>
              <CardDescription>Your basic account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="nationalId">National ID / License Number</Label>
                  <Input
                    id="nationalId"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Vehicle Information ──────────────────────────────────────── */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Vehicle Information</CardTitle>
              <CardDescription>Your delivery vehicle details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Vehicle type selector */}
              <div className="space-y-2">
                <Label>Vehicle Type</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {vehicleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setVehicleType(opt.value)}
                      className={`flex flex-col items-center gap-2 rounded-lg border-2 px-3 py-4 transition-colors cursor-pointer
                        ${
                          vehicleType === opt.value
                            ? "border-amber-400 bg-amber-50 text-amber-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-amber-200 hover:bg-amber-50/50"
                        }`}
                    >
                      <span
                        className={vehicleType === opt.value ? "text-amber-600" : "text-gray-400"}
                      >
                        {opt.icon}
                      </span>
                      <span className="text-xs font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="vehicleYear">Vehicle Year</Label>
                  <Input
                    id="vehicleYear"
                    type="number"
                    min="1990"
                    max="2026"
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="vehicleMake">Make</Label>
                  <Input
                    id="vehicleMake"
                    placeholder="e.g. Honda"
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="vehicleModel">Model</Label>
                  <Input
                    id="vehicleModel"
                    placeholder="e.g. CB 125R"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="vehicleColor">Color</Label>
                  <Input
                    id="vehicleColor"
                    placeholder="e.g. Red"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Delivery Preferences ─────────────────────────────────────── */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Delivery Preferences</CardTitle>
              <CardDescription>Your working zones and schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="zones">Working Areas / Zones</Label>
                <Textarea
                  id="zones"
                  placeholder="e.g. Downtown, Medina, Agdal"
                  value={zones}
                  onChange={(e) => setZones(e.target.value)}
                  rows={2}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple areas with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label>Preferred Hours</Label>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors
                      ${prefMorning ? "border-amber-300 bg-amber-50" : "border-gray-200"}`}
                    onClick={() => setPrefMorning(!prefMorning)}
                  >
                    <Checkbox
                      id="morning"
                      checked={prefMorning}
                      onCheckedChange={(v) => setPrefMorning(!!v)}
                    />
                    <div>
                      <Label htmlFor="morning" className="cursor-pointer font-medium text-sm">
                        Morning
                      </Label>
                      <p className="text-xs text-muted-foreground">6am – 12pm</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors
                      ${prefAfternoon ? "border-amber-300 bg-amber-50" : "border-gray-200"}`}
                    onClick={() => setPrefAfternoon(!prefAfternoon)}
                  >
                    <Checkbox
                      id="afternoon"
                      checked={prefAfternoon}
                      onCheckedChange={(v) => setPrefAfternoon(!!v)}
                    />
                    <div>
                      <Label htmlFor="afternoon" className="cursor-pointer font-medium text-sm">
                        Afternoon
                      </Label>
                      <p className="text-xs text-muted-foreground">12pm – 6pm</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors
                      ${prefEvening ? "border-amber-300 bg-amber-50" : "border-gray-200"}`}
                    onClick={() => setPrefEvening(!prefEvening)}
                  >
                    <Checkbox
                      id="evening"
                      checked={prefEvening}
                      onCheckedChange={(v) => setPrefEvening(!!v)}
                    />
                    <div>
                      <Label htmlFor="evening" className="cursor-pointer font-medium text-sm">
                        Evening
                      </Label>
                      <p className="text-xs text-muted-foreground">6pm – 11pm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="maxDistance">Maximum Delivery Distance</Label>
                <Select value={maxDistance} onValueChange={setMaxDistance}>
                  <SelectTrigger id="maxDistance" className="w-full sm:w-48">
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5km">5 km</SelectItem>
                    <SelectItem value="10km">10 km</SelectItem>
                    <SelectItem value="15km">15 km</SelectItem>
                    <SelectItem value="20km+">20 km+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* ── Documents ───────────────────────────────────────────────── */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Documents</CardTitle>
              <CardDescription>
                Upload required documents to maintain your active status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-5 sm:grid-cols-3">
                {documents.map((doc) => (
                  <UploadZone key={doc.id} label={doc.label} status={doc.status} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ── Save button ──────────────────────────────────────────────── */}
          <div className="flex justify-end pb-4">
            <Button
              onClick={handleSave}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8"
              size="lg"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
