import React, { useState } from "react";
import { MemberCard } from "./MemberCard";

const members = [
  {
    id: 1,
    name: "Rahul Sharma",
    flat: "A-101",
    block: "Block A",
    due: "₹5,750.00",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    flat: "B-204",
    block: "Block B",
    due: "₹0.00",
  },
  {
    id: 3,
    name: "Priya Sharma",
    flat: "C-305",
    block: "Block C",
    due: "₹2,250.00",
  },
];

export const SelectMember = () => {
  const [selectedMember, setSelectedMember] = useState(members[0]);

  const handleChange = (e) => {
    const member = members.find((m) => m.id === Number(e.target.value));
    setSelectedMember(member);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 min-h-[356px]">

      <h2 className="text-lg font-bold text-[#1E2A5A] mb-6">
        Select Member
      </h2>

      <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
        Member / Flat
        <span className="text-red-500">*</span>
      </label>

      <select
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
        onChange={handleChange}
        value={selectedMember.id}
      >
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name} ({member.flat})
          </option>
        ))}
      </select>

      <div className="mt-6">
        <MemberCard member={selectedMember} />
      </div>
    </div>
  );
};