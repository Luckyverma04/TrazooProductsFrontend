import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What does Trazoo offer?",
      answer:
        "Trazoo provides end-to-end corporate gifting and custom merchandise solutions, including product sourcing, branding, customisation, packaging, kits and Pan-India delivery."
    },
    {
      question: "Can Trazoo create customised corporate gifts?",
      answer:
        "Yes. We can customise products with your company branding, logos, packaging and curated combinations based on your requirements."
    },
    {
      question: "Do you provide employee joining kits?",
      answer:
        "Yes. Trazoo provides employee onboarding and joining kits with customised merchandise, packaging and branding."
    },
    {
      question: "Can you handle bulk corporate gifting orders?",
      answer:
        "Yes. We handle bulk gifting requirements for employees, clients, events, festive campaigns and institutional programmes."
    },
    {
      question: "Do you deliver across India?",
      answer:
        "Yes. Trazoo provides Pan-India fulfilment, including sourcing, packing, shipping and delivery coordination."
    },
    {
      question: "How long does a corporate gifting order take?",
      answer:
        "The timeline depends on the products, quantity, branding and packaging requirements. Once we understand your requirement, our team can provide an estimated turnaround time."
    },
    {
      question: "Can you help with product selection?",
      answer:
        "Yes. You can share your budget, quantity, occasion and target audience, and our team can recommend suitable products and gifting combinations."
    },
    {
      question: "How can I request a corporate gifting proposal?",
      answer:
        "You can submit your requirements through the Request a Proposal section on our website. Our team will review your requirement and get back to you."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <SEO
        title="Corporate Gifting FAQ | Trazoo"
        description="Find answers to common questions about Trazoo corporate gifting, custom merchandise, employee kits, bulk orders, branding, packaging and delivery across India."
        path="/faq"
      />

      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="px-6 pt-32 pb-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Frequently Asked Questions
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Corporate gifting, answered.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Everything you need to know about Trazoo, corporate gifting,
              custom merchandise, employee kits, bulk orders and fulfilment.
            </p>
          </div>
        </section>

        {/* FAQ List */}
        <section className="px-6 pb-24 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </span>

                    <span className="flex-shrink-0 text-2xl text-gray-500">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  {openIndex === index && (
                    <div className="pb-6 pr-10 text-base leading-7 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-5xl rounded-3xl bg-gray-100 px-8 py-12 text-center sm:px-12">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
              Still have questions?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              Tell us what you are planning and our team can help you build
              the right corporate gifting solution.
            </p>

            <a
              href="/requirements"
              className="mt-7 inline-flex rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:opacity-80"
            >
              Request a Proposal
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FAQ;