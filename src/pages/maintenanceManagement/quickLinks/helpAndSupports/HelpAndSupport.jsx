import React from "react";
//import { TopCards } from "./components/TopCards";
import { FAQSection } from "./FAQSection";
import { SubmitRequest } from "./SubmitRequest";
import { ContactSupport } from "./ContactSupport";
import { EmergencyContact } from "./EmergencyContact";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { InfoCard } from "../../../../components/cards/InfoCard";

export const HelpAndSupport = () => {
  const cards = [
  {
    id: 1,
    title: "FAQs",
    description: "Find quick answers to commonly asked questions.",
    button: "View FAQs",
    icon: "bi bi-question-circle",
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    id: 2,
    title: "User Guides",
    description: "Step-by-step guides to help you use the system better.",
    button: "View Guides",
    icon: "bi bi-file-earmark-text",
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    id: 3,
    title: "Video Tutorials",
    description: "Watch helpful videos to learn key features.",
    button: "Watch Videos",
    icon: "bi bi-play-btn",
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
  {
    id: 4,
    title: "What's New",
    description: "See the latest updates and new features.",
    button: "View Updates",
    icon: "bi bi-megaphone",
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <Breadcrumb
                    items={[
                      { label: "Dashboard" },
                      { label: "Help & Support" },
                    ]}
                    title="Help & Support"
                    subtitle=" We're here to help you. Find answers or get in touch with our support team."
                  />

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => (
        <InfoCard
          key={card.id}
          {...card}
          onClick={() => console.log(card.title)}
        />
      ))}
    </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* Left Side */}
        <div className="xl:col-span-2 space-y-6">
          <FAQSection />
          <SubmitRequest />
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <ContactSupport />
          <EmergencyContact />
        </div>
      </div>
    </div>
  );
};