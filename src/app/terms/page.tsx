import type { Metadata } from "next";
import { APP_CONFIG } from "@/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${APP_CONFIG.name}.`,
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Last updated: June 2026
      </p>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using {APP_CONFIG.name} (the &quot;Service&quot;),
            you agree to be bound by these Terms of Service. If you do not agree
            to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            2. Accounts
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activity that occurs under your
            account. You agree to provide accurate and complete information when
            creating an account.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            3. Orders and Payments
          </h2>
          <p>
            Placing an order constitutes an offer to purchase the selected
            items. Prices, availability, and delivery estimates are provided by
            the relevant seller and may change. Payment is processed through our
            supported payment methods.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            4. Seller Responsibilities
          </h2>
          <p>
            Sellers are responsible for the accuracy of their product listings,
            the quality and safety of the items they sell, and compliance with
            all applicable food-safety and labeling regulations.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            5. Prohibited Conduct
          </h2>
          <p>
            You agree not to misuse the Service, including by attempting to
            disrupt it, access it without authorization, or use it for unlawful
            purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            6. Limitation of Liability
          </h2>
          <p>
            The Service is provided on an &quot;as is&quot; basis. To the extent
            permitted by law, {APP_CONFIG.name} is not liable for indirect or
            consequential damages arising from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            7. Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            Service after changes take effect constitutes acceptance of the
            revised Terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            8. Contact
          </h2>
          <p>
            Questions about these Terms can be sent to {APP_CONFIG.supportEmail}.
          </p>
        </section>
      </div>
    </div>
  );
}
