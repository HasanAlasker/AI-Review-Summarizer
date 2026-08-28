import { AiCallout, LegalPageLayout } from "@/components/legal/LegalComps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Matjr",
  description:
    "How Matjr collects, uses, and protects your information, including data used by AI features like the review summarizer.",
};

const LAST_UPDATED = "August 28, 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      description="This policy explains what information Matjr collects, how we use it, and the choices you have — including how our AI features handle your data."
      lastUpdated={LAST_UPDATED}
      sections={[
        {
          id: "introduction",
          title: "Introduction",
          content: (
            <>
              <p>
                Matjr (&ldquo;Matjr,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
                or &ldquo;our&rdquo;) is a demo e-commerce storefront that
                showcases modern shopping experiences, including AI-powered
                features such as our review summarizer. This Privacy Policy
                describes how we collect, use, disclose, and safeguard
                information when you visit or interact with our website, mobile
                experience, or related services (collectively, the
                &ldquo;Service&rdquo;).
              </p>
              <p>
                By using the Service, you agree to the collection and use of
                information in accordance with this policy. If you do not agree,
                please discontinue use of the Service.
              </p>
            </>
          ),
        },
        {
          id: "information-we-collect",
          title: "Information We Collect",
          content: (
            <>
              <p>We collect a few categories of information:</p>
              <ul>
                <li>
                  <strong>Account information</strong> — name, email address,
                  password (stored as a hash), and optional profile details you
                  provide when creating an account.
                </li>
                <li>
                  <strong>Order and transaction information</strong> — shipping
                  address, billing details, and order history. As a demo
                  storefront, Matjr may simulate checkout without processing
                  real payments; where real payment processing is enabled, card
                  data is handled by our payment processor and is never stored
                  on our servers.
                </li>
                <li>
                  <strong>Content you submit</strong> — product reviews,
                  ratings, wishlist items, support messages, and any text or
                  images you upload.
                </li>
                <li>
                  <strong>Usage data</strong> — pages viewed, products searched,
                  clicks, device type, browser, approximate location (derived
                  from IP address), and referring URLs.
                </li>
                <li>
                  <strong>Cookies and similar technologies</strong> — see the
                  &ldquo;Cookies &amp; Tracking&rdquo; section below.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "how-we-use-information",
          title: "How We Use Your Information",
          content: (
            <>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Create and manage your account, and process orders.</li>
                <li>
                  Operate, maintain, and improve the Service, including
                  personalizing product recommendations.
                </li>
                <li>
                  Power AI-driven features, such as summarizing customer reviews
                  (see the dedicated section below).
                </li>
                <li>
                  Communicate with you about orders, updates, security alerts,
                  and — where you&rsquo;ve opted in — marketing.
                </li>
                <li>
                  Detect, investigate, and prevent fraud, abuse, and security
                  incidents.
                </li>
                <li>Comply with legal obligations.</li>
              </ul>
            </>
          ),
        },
        {
          id: "ai-features",
          title: "AI Features & Data Processing",
          content: (
            <>
              <p>
                Matjr uses artificial intelligence to enhance the shopping
                experience. The most notable example today is our{" "}
                <strong>AI review summarizer</strong>, which reads publicly
                submitted product reviews and generates a concise summary of
                common themes, praise, and complaints. Additional AI-powered
                features may be introduced over time as the platform grows.
              </p>
              <AiCallout>
                Our review summarizer processes the text of product reviews
                already submitted to the Service (including reviews you write)
                to generate summaries shown to other shoppers. It does not use
                your private account details, payment information, or browsing
                history as input.
              </AiCallout>
              <p>
                AI-generated summaries are produced automatically and may
                occasionally be imprecise or incomplete. We recommend reading
                individual reviews for details that matter to your purchase
                decision. If we use a third-party AI provider to generate
                summaries, review text is sent to that provider solely to
                produce the summary and is handled under that provider&rsquo;s
                own data-processing terms, which we require to be consistent
                with this policy.
              </p>
              <p>
                We do not use your reviews to train third-party foundation
                models unless we clearly disclose that practice and, where
                required by law, obtain your consent.
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          title: "Cookies & Tracking",
          content: (
            <>
              <p>We use cookies and similar technologies to:</p>
              <ul>
                <li>Keep you signed in and remember your cart contents.</li>
                <li>Understand how visitors use the Service (analytics).</li>
                <li>
                  Measure the performance of marketing campaigns, where
                  applicable.
                </li>
              </ul>
              <p>
                You can control cookies through your browser settings. Some
                features of the Service, like staying signed in or keeping items
                in your cart, may not work properly if cookies are disabled.
              </p>
            </>
          ),
        },
        {
          id: "sharing",
          title: "How We Share Information",
          content: (
            <>
              <p>
                We do not sell your personal information. We may share it with:
              </p>
              <ul>
                <li>
                  <strong>Service providers</strong> who help us operate the
                  Service — for example, hosting, payment processing, email
                  delivery, analytics, and AI providers used for features like
                  the review summarizer.
                </li>
                <li>
                  <strong>Legal and safety purposes</strong> — when required by
                  law, or to protect the rights, property, or safety of Matjr,
                  our users, or others.
                </li>
                <li>
                  <strong>Business transfers</strong> — if Matjr is involved in
                  a merger, acquisition, or asset sale, your information may be
                  transferred as part of that transaction.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "data-retention",
          title: "Data Retention",
          content: (
            <p>
              We retain personal information for as long as your account is
              active or as needed to provide the Service, comply with legal
              obligations, resolve disputes, and enforce our agreements.
              Publicly posted content, such as reviews, may remain visible after
              account deletion unless you request removal, subject to legitimate
              business or legal reasons for retaining it.
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "Your Rights & Choices",
          content: (
            <>
              <p>
                Depending on where you live, you may have rights to access,
                correct, delete, or export your personal information, and to
                object to or restrict certain processing. To exercise these
                rights, contact us using the details below.
              </p>
              <ul>
                <li>
                  You can review and update your account details at any time
                  from your account settings.
                </li>
                <li>
                  You can opt out of marketing emails using the unsubscribe link
                  in any message.
                </li>
                <li>
                  You can request deletion of your account and associated data.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "security",
          title: "Data Security",
          content: (
            <p>
              We use reasonable administrative, technical, and physical
              safeguards designed to protect your information. No method of
              transmission or storage is completely secure, and we cannot
              guarantee absolute security.
            </p>
          ),
        },
        {
          id: "childrens-privacy",
          title: "Children's Privacy",
          content: (
            <p>
              The Service is not directed to children under 16, and we do not
              knowingly collect personal information from children. If you
              believe a child has provided us with personal information, please
              contact us so we can delete it.
            </p>
          ),
        },
        {
          id: "international-transfers",
          title: "International Data Transfers",
          content: (
            <p>
              We may process and store information in countries other than your
              own. Where required, we rely on appropriate safeguards, such as
              standard contractual clauses, to protect information transferred
              internationally.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to This Policy",
          content: (
            <p>
              We may update this Privacy Policy from time to time. Material
              changes will be indicated by updating the &ldquo;Last
              updated&rdquo; date above, and where appropriate, we will provide
              additional notice.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact Us",
          content: (
            <p>
              Questions about this Privacy Policy can be sent to{" "}
              <a href="mailto:hasanalasker.contact@gmail.com">
                hasanalasker.contact@gmail.com
              </a>
            </p>
          ),
        },
      ]}
    />
  );
}
