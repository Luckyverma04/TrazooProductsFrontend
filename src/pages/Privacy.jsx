import { useEffect } from "react";
import Footer from "../components/Footer";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="bg-[#FFFDF9] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-20">
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-[#6E6A67]">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-[#6E6A67] leading-relaxed">

            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-4">1. Introduction</h2>
              <p>
                Trazoo Global LLP ("we," "us," or "our") operates the trazooglobal.com website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-4">2. Information Collection and Use</h2>
              <p>We collect several different types of information for various purposes:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Personal Data:</strong> While using our website, we may ask you to provide us with certain personally identifiable information ("Personal Data"). This may include but is not limited to:
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Company name</li>
                    <li>Cookies and usage data</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-4">3. Use of Data</h2>
              <p>Trazoo Global uses the collected data for various purposes:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>To provide and maintain our website</li>
                <li>To notify you about changes to our website</li>
                <li>To send promotional and marketing communications</li>
                <li>To respond to your inquiries and requests</li>
                <li>To monitor and analyze trends, usage, and activities</li>
                <li>To detect, prevent, and address technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-4">4. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-4">5. Links to Other Sites</h2>
              <p>
                Our website may contain links to other sites that are not operated by us. This Privacy Policy applies only to our website, and we are not responsible for the privacy practices of third-party websites. We encourage you to review the privacy policies of any third-party sites before providing your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-4">6. Children's Privacy</h2>
              <p>
                Our website is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information and terminate the child's account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-4">7. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-4">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-3">
                <strong>Trazoo Global LLP</strong><br />
                Email: contact@trazooglobal.com<br />
                Phone: +91 7024804838<br />
                Location: India
              </p>
            </section>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;