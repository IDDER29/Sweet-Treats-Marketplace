import React from "react";
import { Phone, Mail, MapPin, Contact } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const ContactUs = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            <span>contact@sweettreats.com</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            <span>123 Sugar Lane, Sweet City, SC 12345</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactUs;
