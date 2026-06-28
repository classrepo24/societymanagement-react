import React from 'react'
import { HiUserAdd } from 'react-icons/hi'
import { SocietyMembersCards } from '../components/SocietyMembersCards'
import { SocietyMembersTable } from '../components/SocietyMembersTable'
export const SocietyMembers = () => {
  return (
    <div>
      <div className="bg-[#fbfbfe] p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mx-6">

          {/* Left Side */}
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Society Members
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Manage all committee members and society representatives.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex gap-4">
            <button
              className="
                  flex items-center gap-2
                  px-5 py-3
                  rounded-xl
                  bg-blue-600
                  text-white
                  hover:bg-blue-700
                  font-medium
                  shadow-md
                "
            >
              <HiUserAdd className="w-7 h-7" />
              Add Member
            </button>
          </div>
        </div>
        <SocietyMembersCards />
        <SocietyMembersTable />
      </div>
    </div>
  )
}
