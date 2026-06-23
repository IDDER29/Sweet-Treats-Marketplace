import type { Metadata } from "next";
import { APP_CONFIG } from "@/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${APP_CONFIG.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Last updated: June 2026
      </p>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly, such as your name,
            contact details, delivery address, and order history, as well as
            limited technical information needed to operate the Service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            2. How We Use Information
          </h2>
          <p>
            We use your information to process orders, arrange delivery, provide
            customer support, and improve the Service. We do not sell your
            personal information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            3. Sharing
          </h2>
          <p>
            Order details are shared with the relevant seller and delivery
            provider solely to fulfill your order. We may share information with
            service providers who help us operate the Service, under appropriate
            confidentiality obligations.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            4. Data Retention
          </h2>
          <p>
            We retain your information for as long as your account is active or
            as needed to provide the Service and comply with our legal
            obligations.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            5. Your Rights
          </h2>
          <p>
            Depending on your location, you may have the right to access,
            correct, or delete your personal information. Contact us to exercise
            these rights.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            6. Contact
          </h2>
          <p>
            For privacy questions, contact us at {APP_CONFIG.supportEmail}.
          </p>
        </section>
      </div>
    </div>
  );
}
