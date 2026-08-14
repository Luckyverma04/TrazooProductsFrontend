import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Footer from "../components/Footer";

const faqs = [
  {
    id: 1,
    question: "What services does Trazoo Global offer?",
    answer: "We provide end-to-end corporate gifting and merchandise solutions including product sourcing, customisation, branding, packaging, quality checks, and pan-India fulfilment. Our services cover corporate gifting, festive gifting, employee kits, custom merchandise, event kits, and institutional gifting.",
  },
  {
    id: 2,
    question: "What is the minimum order quantity?",
    answer: "We work with organisations of all sizes. While we can handle small orders, bulk orders (500+ units) receive better pricing and faster turnaround. Contact us for customised quotations based on your specific requirements.",
  },
  {
    id: 3,
    question: "How long does the delivery process take?",
    answer: "Our average turnaround time is 3 days for delivery across India. However, this depends on the complexity of customisation, product availability, and destination PIN code. Custom orders may take 7-14 days. We'll provide a specific timeline during the quotation process.",
  },
  {
    id: 4,
    question: "Do you handle customisation?",
    answer: "Yes! We specialize in customisation. We can customize products with your company logo, brand colors, custom packaging, personalized messages, and more. Our in-house team manages the entire customisation process ensuring quality at every step.",
  },
  {
    id: 5,
    question: "What is your coverage area?",
    answer: "We deliver to 12,000+ PIN codes across India, covering metros, tier-1 cities, and remote areas. We have partnerships with reliable logistics providers to ensure timely and safe delivery to your doorstep.",
  },
  {
    id: 6,
    question: "How do I place an order?",
    answer: "Simply share your requirement with us through our website's 'Share Your Requirement' form or contact us directly at contact@trazooglobal.com or +91 7024804838. Our team will understand your needs and provide a customised quote.",
  },
  {
    id: 7,
    question: "Do you offer quality guarantees?",
    answer: "Absolutely! We have rigorous quality checks at every stage - from product sourcing to customisation to packaging. Each product undergoes quality verification before dispatch. We stand by our work and ensure enterprise-grade quality.",
  },
  {
    id: 8,
    question: "Can you help with product selection?",
    answer: "Yes! Our team has expertise in corporate gifting trends and can recommend products based on your budget, audience, and brand positioning. We can showcase different options and help you make the best choice for your requirement.",
  },
  {
    id: 9,
    question: "What about bulk orders?",
    answer: "We specialize in bulk orders! For large quantities (5,000+ units), we offer competitive pricing, flexible payment terms, and dedicated account management. Contact us to discuss your bulk order needs.",
  },
  {
    id: 10,
    question: "Do you provide real-time tracking?",
    answer: "Yes! Once your order is dispatched, you can track shipments in real-time through our portal. You'll get tracking IDs for each shipment and can monitor delivery status, location, and estimated delivery time.",
  },
  {
    id: 11,
    question: "What payment options are available?",
    answer: "We accept bank transfers, online payments, cheques, and credit/debit cards. For bulk orders, we offer flexible payment terms including partial advance and balance on delivery. Contact us to discuss payment arrangements suitable for your organisation.",
  },
  {
    id: 12,
    question: "Can you handle international orders?",
    answer: "Currently, we primarily focus on pan-India delivery. However, for specific international requirements or special cases, please contact us directly at contact@trazooglobal.com to discuss possibilities.",
  },
  {
    id: 13,
    question: "What if I'm not satisfied with the order?",
    answer: "Customer satisfaction is our priority. If there are quality issues or the order doesn't meet specifications, we'll work with you to resolve it. We encourage feedback and are committed to making things right.",
  },
  {
    id: 14,
    question: "Do you provide invoices and documentation?",
    answer: "Yes! We provide GST invoices, delivery certificates, and all necessary documentation. For institutional clients, we can provide customised reports and documentation as per your requirements.",
  },
  {
    id: 15,
    question: "How do I get a quote?",
    answer: "Share your requirement details (quantity, product type, customisation needs, budget, timeline) through our 'Share Your Requirement' form or contact us directly. Our team will send you a detailed quote within 24 hours.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <main className="bg-[#FFFDF9] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-20">

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-4">
              Enterprise FAQ
            </h1>
            <p className="text-lg text-[#6E6A67] max-w-2xl mx-auto">
              Got questions about our corporate gifting services? Find answers to commonly asked questions below. Can't find what you're looking for? Contact us directly at contact@trazooglobal.com
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl border border-[#DED8D2] bg-white overflow-hidden transition-all"
              >
                {/* Question */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between px-6 py-4 md:px-8 md:py-6 hover:bg-[#FDEDE7] transition-colors text-left"
                >
                  <h3 className="text-base md:text-lg font-semibold text-[#111111] pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={24}
                    className={`text-[#DF4607] flex-shrink-0 transition-transform duration-300 ${
                      openId === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                {openId === faq.id && (
                  <div className="px-6 md:px-8 pb-4 md:pb-6 border-t border-[#DED8D2] bg-[#FFFDF9]">
                    <p className="text-[#6E6A67] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 md:p-12 bg-gradient-to-r from-[#DF4607] to-[#C93E05] rounded-2xl text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Still have questions?</h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Our team is here to help! Reach out to us with any specific requirements or questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:contact@trazooglobal.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#DF4607] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Email Us
              </a>
              <a
                href="tel:+917024804838"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Call: +91 7024804838
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;