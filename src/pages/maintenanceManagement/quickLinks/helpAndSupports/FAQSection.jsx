import React, { useState } from "react";
import { initialFaqs, moreFaqs } from "./faqData";

export const FAQSection = () => {
  const [openId, setOpenId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const faqs = showAll
    ? [...initialFaqs, ...moreFaqs]
    : initialFaqs;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

      {/* Heading */}
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold text-[#172554]">
          Commonly Asked Questions
        </h2>
      </div>

      {/* Questions */}
      <div>
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border-t border-gray-200"
          >
            <button
              onClick={() =>
                setOpenId(openId === faq.id ? null : faq.id)
              }
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">

                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm">?</span>
                </div>

                <span className="font-semibold text-[#1E2A5A] text-left">
                  {faq.question}
                </span>
              </div>

              <i
                className={`bi ${
                  openId === faq.id
                    ? "bi-chevron-up"
                    : "bi-chevron-down"
                } text-gray-500`}
              ></i>
            </button>

            {openId === faq.id && (
              <div className="pb-5 pl-[72px] pr-6 text-gray-600 leading-7">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-5">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2"
        >
          {showAll ? "Show Less FAQs" : "View all FAQs"}

          <i
            className={`bi ${
              showAll
                ? "bi-arrow-up"
                : "bi-arrow-right"
            }`}
          ></i>
        </button>
      </div>
    </div>
  );
};