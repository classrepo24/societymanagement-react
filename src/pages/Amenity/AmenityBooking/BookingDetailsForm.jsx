import React from "react";

const BookingDetailsForm = ({
  formData,
  setFormData,
  errors,
  amenity,
}) => {


    const residents = [
  {
    id: 1,
    name: "Rajesh Kumar",
    flatNumber: "A-101",
    apartmentName: "Green View Apartment",
    mobile: "8010516363",
    email: "rajesh@gmail.com",
  },
  {
    id: 2,
    name: "Amit Sharma",
    flatNumber: "B-202",
    apartmentName: "Sunrise Residency",
    mobile: "9876543210",
    email: "amit@gmail.com",
  },
];
const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "residentName") {
    const resident = residents.find(
      (item) => `${item.name} (${item.flatNumber})` === value
    );

    if (resident) {
      setFormData({
        ...formData,
        residentName: `${resident.name} (${resident.flatNumber})`,
        flatNumber: resident.flatNumber,
        apartmentName: resident.apartmentName,
        mobile: resident.mobile,
        email: resident.email,
      });

      return;
    }
  }

  setFormData({
    ...formData,
    [name]: value,
  });
};



  const wordCount = formData.notes
    ? formData.notes.trim().split(/\s+/).filter(Boolean).length
    : 0;

const showPurposeField = [
  "Club House",
  "Community Hall",
  "Banquet Hall",
  "Party Lawn",
].includes(amenity?.name);

  return (

    <div className="
      bg-white
      border border-[#E2E8F0]
      rounded-2xl
      shadow-sm
      p-5 sm:p-6
    ">


      <h2 className="
        text-[20px]
        sm:text-[22px]
        font-bold
        text-[#0F172A]
        mb-6
      ">
        Booking Details
      </h2>



      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
      ">



        {/* Purpose Dropdown */}

        {showPurposeField && (
  <div>
    <label className="text-sm font-medium text-[#334155] block mb-2">
      Purpose / Event
      <span className="text-red-500 ml-1">*</span>
    </label>

    <select
      name="purpose"
      value={formData.purpose}
      onChange={handleChange}
      className="
        w-full
        h-11
        px-4
        rounded-xl
        border border-[#E2E8F0]
        bg-white
        text-sm
        outline-none
        focus:border-[#2563EB]
      "
    >
      <option value="">Select event</option>
      <option value="Birthday Party">Birthday Party</option>
      <option value="Wedding Function">Wedding Function</option>
      <option value="Meeting">Meeting</option>
      <option value="Other">Other</option>
    </select>

    {errors?.purpose && (
      <p className="text-xs text-red-500 mt-1">
        {errors.purpose}
      </p>
    )}
  </div>
)}







        {/* Expected Attendees Dropdown */}

        <div>

          <label className="text-sm font-medium text-[#334155] block mb-2">
            Expected Attendees
            <span className="text-red-500 ml-1">*</span>
          </label>


          <select
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            className="
              w-full
              h-11
              px-4
              rounded-xl
              border border-[#E2E8F0]
              bg-white
              text-sm
              outline-none
              focus:border-[#2563EB]
            "
          >

            <option value="">
              Select attendees
            </option>

            <option value="1-25">
              1 - 25 People
            </option>

            <option value="26-50">
              26 - 50 People
            </option>

            <option value="51-100">
              51 - 100 People
            </option>

            <option value="100+">
              100+ People
            </option>

          </select>
          {errors?.numberOfPeople && (
  <p className="text-xs text-red-500 mt-1">
    {errors.numberOfPeople}
  </p>
)}


        </div>








        {/* Resident Dropdown */}

        <div>

          <label className="text-sm font-medium text-[#334155] block mb-2">

            Resident / Booker
            <span className="text-red-500 ml-1">*</span>

          </label>

<select
  name="residentName"
  value={formData.residentName}
  onChange={handleChange}
  className="
    w-full
    h-11
    px-4
    rounded-xl
    border border-[#E2E8F0]
    bg-white
    text-sm
    outline-none
    focus:border-[#2563EB]
  "
>
  <option value="">
    Select resident
  </option>

  {residents.map((resident) => (
    <option
      key={resident.id}
      value={`${resident.name} (${resident.flatNumber})`}
    >
      {resident.name} ({resident.flatNumber})
    </option>
  ))}
</select>
{errors?.residentName && (
  <p className="text-xs text-red-500 mt-1">
    {errors.residentName}
  </p>
)}

        </div>








        {/* Contact */}

        <div>

          <label className="text-sm font-medium text-[#334155] block mb-2">

            Contact Number
            <span className="text-red-500 ml-1">*</span>

          </label>


          <input
  type="text"
  name="mobile"
  value={formData.mobile}
  onChange={handleChange}
  placeholder="Enter contact number"
  readOnly
  className="
    w-full
    h-11
    px-4
    rounded-xl
    border border-[#E2E8F0]
    bg-[#F8FAFC]
    text-sm
    outline-none
  "
/>
{errors?.mobile && (
  <p className="text-xs text-red-500 mt-1">
    {errors.mobile}
  </p>
)}

        </div>








        {/* Special Requirement */}

        <div className="md:col-span-2">


          <label className="text-sm font-medium text-[#334155] block mb-2">

            Special Requirements

          </label>


          <textarea

            name="notes"

            value={formData.notes}

            onChange={(e)=>{

              const words = e.target.value
                .trim()
                .split(/\s+/)
                .filter(Boolean);


              if(words.length <= 250){

                handleChange(e);

              }

            }}

            placeholder="Enter special requirements"

            rows="4"

            className="
              w-full
              px-4
              py-3
              rounded-xl
              border border-[#E2E8F0]
              text-sm
              outline-none
              resize-none
              focus:border-[#2563EB]
            "

          />


          <div className="
            text-right
            text-xs
            text-[#64748B]
            mt-2
          ">
            {wordCount}/250 words
          </div>


        </div>



      </div>


    </div>

  );

};


export default BookingDetailsForm;