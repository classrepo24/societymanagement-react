import React from "react";

const BookingRules = ({
  formData,
  setFormData,
  errors,
}) => {


  const rules = [
    "Booking can be made up to 30 days in advance.",
    "Minimum booking duration is 1 hour.",
    "Cleaning charges will be applicable as per society rules.",
    "Any damage to property will be charged extra.",
    "Cancellations must be made at least 24 hours in advance.",
  ];



  return (

    <div className="
      bg-white
      border border-[#E2E8F0]
      rounded-2xl
      shadow-sm
      p-5 sm:p-6
    ">


      {/* Header */}

      <h2 className="
        text-[20px]
        sm:text-[22px]
        font-bold
        text-[#0F172A]
        mb-6
      ">
        Rules & Guidelines
      </h2>





      {/* Rules */}

      <div className="
        space-y-4
      ">


        {rules.map((rule,index)=>(

          <div
            key={index}
            className="
              flex
              items-start
              gap-3
            "
          >

            <div className="
              w-6
              h-6
              rounded-full
              bg-[#EFF6FF]
              flex
              items-center
              justify-center
              shrink-0
              mt-0.5
            ">

              <i className="
                bi bi-check
                text-[#2563EB]
                text-sm
              "></i>

            </div>



            <p className="
              text-sm
              sm:text-[15px]
              text-[#475569]
              leading-6
            ">
              {rule}
            </p>


          </div>


        ))}


      </div>





      {/* Agreement Checkbox */}

      <div className="
        border-t
        border-[#E2E8F0]
        mt-6
        pt-5
      ">


        <label className="
          flex
          items-start
          gap-3
          cursor-pointer
        ">
<input
  type="checkbox"
  checked={formData.agreed}
  onChange={(e) =>
    setFormData({
      ...formData,
      agreed: e.target.checked,
    })
  }
  className="
    w-4
    h-4
    mt-1
    accent-[#2563EB]
  "
/>
{errors?.agreed && (
  <p className="text-xs text-red-500 mt-2">
    {errors.agreed}
  </p>
)}


          <span className="
            text-sm
            sm:text-[15px]
            text-[#334155]
            leading-6
          ">
            I have read and agree to the rules & guidelines.
          </span>


        </label>


      </div>



    </div>

  );

};


export default BookingRules;