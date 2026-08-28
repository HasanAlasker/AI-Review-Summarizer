import { AiCallout, LegalPageLayout } from "@/components/legal/LegalComps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Matjr, our demo AI-powered e-commerce storefront.",
};

const LAST_UPDATED = "August 28, 2026";

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Service"
      description="These Terms govern your access to and use of Matjr. Please read them carefully before using the Service."
      lastUpdated={LAST_UPDATED}
      sections={[
        {
          id: "acceptance",
          title: "Acceptance of Terms",
          content: (
            <p>
              By accessing or using Matjr (the &ldquo;Service&rdquo;), you agree
              to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If
              you do not agree to these Terms, do not use the Service. We may
              update these Terms from time to time as described in the
              &ldquo;Changes to These Terms&rdquo; section below.
            </p>
          ),
        },
        {
          id: "description-of-service",
          title: "Description of the Service",
          content: (
            <>
              <p>
                Matjr is a demo e-commerce storefront built to showcase what a
                modern shopping experience can look like, including AI-powered
                features such as a review summarizer, with more features planned
                over time. Unless explicitly stated otherwise on the site, Matjr
                is provided for demonstration and evaluation purposes.
              </p>
              <AiCallout>
                This is a demo store — no real orders will be placed or charged
              </AiCallout>
            </>
          ),
        },
        {
          id: "eligibility",
          title: "Eligibility",
          content: (
            <p>
              You must be at least 16 years old, or the age of majority in your
              jurisdiction, to use the Service. By using the Service, you
              represent that you meet this requirement and that any information
              you provide is accurate and complete.
            </p>
          ),
        },
        {
          id: "accounts",
          title: "Account Registration",
          content: (
            <>
              <p>
                Some features require an account. You are responsible for
                maintaining the confidentiality of your login credentials and
                for all activity that occurs under your account. Notify us
                immediately of any unauthorized use.
              </p>
              <ul>
                <li>
                  Provide accurate, current information when creating an
                  account.
                </li>
                <li>Do not share your account credentials with others.</li>
                <li>
                  We may suspend or terminate accounts that violate these Terms.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "orders",
          title: "Orders & Transactions",
          content: (
            <p>
              Product listings, pricing, and availability are for demonstration
              purposes unless stated otherwise and may change without notice.
              Where real orders and payments are enabled, a contract for sale is
              formed only once we confirm your order; we reserve the right to
              refuse or cancel any order, including for pricing errors,
              suspected fraud, or stock issues.
            </p>
          ),
        },
        {
          id: "ai-generated-content",
          title: "AI-Generated Content",
          content: (
            <>
              <p>
                The Service includes AI-generated content, such as review
                summaries produced by our review summarizer. AI-generated
                content is created automatically from user-submitted reviews and
                is provided for convenience only.
              </p>
              <AiCallout>
                AI summaries may be incomplete, out of date, or occasionally
                inaccurate, and do not represent Matjr&rsquo;s endorsement of
                any opinion expressed in the underlying reviews. Always refer to
                individual reviews and product details before making a purchase
                decision.
              </AiCallout>
              <p>
                As we introduce additional AI-powered features, this section
                will be updated to describe how they work and any specific
                limitations that apply.
              </p>
            </>
          ),
        },
        {
          id: "user-content",
          title: "User Content & Conduct",
          content: (
            <>
              <p>
                You retain ownership of content you submit, such as reviews, but
                grant Matjr a non-exclusive, worldwide, royalty-free license to
                use, display, reproduce, and create summaries (including
                AI-generated summaries) of that content in connection with
                operating the Service.
              </p>
              <p>You agree not to:</p>
              <ul>
                <li>
                  Post false, misleading, defamatory, or unlawful content.
                </li>
                <li>
                  Infringe the intellectual property or privacy rights of
                  others.
                </li>
                <li>
                  Attempt to manipulate reviews, ratings, or the AI review
                  summarizer.
                </li>
                <li>
                  Interfere with the security or normal operation of the
                  Service.
                </li>
                <li>
                  Use automated means to scrape or extract data without our
                  consent.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "intellectual-property",
          title: "Intellectual Property",
          content: (
            <p>
              The Service, including its design, text, graphics, logos, and
              underlying software, is owned by Matjr or its licensors and is
              protected by intellectual property laws. Except as expressly
              permitted, you may not copy, modify, distribute, or create
              derivative works from the Service without our prior written
              consent.
            </p>
          ),
        },
        {
          id: "third-party-links",
          title: "Third-Party Links & Services",
          content: (
            <p>
              The Service may contain links to third-party websites or integrate
              third-party services (including AI providers used to generate
              review summaries). We do not control and are not responsible for
              the content, policies, or practices of any third party.
            </p>
          ),
        },
        {
          id: "disclaimers",
          title: "Disclaimers",
          content: (
            <p>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
              AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS
              OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT
              AI-GENERATED CONTENT, INCLUDING REVIEW SUMMARIES, WILL BE
              ACCURATE, COMPLETE, OR ERROR-FREE.
            </p>
          ),
        },
        {
          id: "limitation-of-liability",
          title: "Limitation of Liability",
          content: (
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, MATJR AND ITS AFFILIATES
              WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA,
              OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE,
              EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          ),
        },
        {
          id: "indemnification",
          title: "Indemnification",
          content: (
            <p>
              You agree to indemnify and hold Matjr harmless from any claims,
              damages, liabilities, and expenses (including reasonable legal
              fees) arising from your use of the Service or violation of these
              Terms.
            </p>
          ),
        },
        {
          id: "termination",
          title: "Termination",
          content: (
            <p>
              We may suspend or terminate your access to the Service at any
              time, with or without notice, for conduct that we believe violates
              these Terms or is otherwise harmful to other users or the Service.
              You may stop using the Service and, where applicable, request
              deletion of your account at any time.
            </p>
          ),
        },
        {
          id: "governing-law",
          title: "Governing Law",
          content: (
            <p>
              These Terms are governed by the laws of{" "}
              <strong>Jordan</strong>, without regard to conflict of law
            </p>
          ),
        },
        {
          id: "changes-to-terms",
          title: "Changes to These Terms",
          content: (
            <p>
              We may modify these Terms from time to time. Material changes will
              be reflected by updating the &ldquo;Last updated&rdquo; date
              above. Continued use of the Service after changes take effect
              constitutes acceptance of the revised Terms.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact Us",
          content: (
            <p>
              Questions about these Terms can be sent to{" "}
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
