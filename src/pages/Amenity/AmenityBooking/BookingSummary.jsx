import React from "react";

const BookingSummary = ({
  amenity,
  selectedDate,
  selectedSlot,
 
  securityDeposit
}) => {

  const cleaningCharges = 500;

  const slotPrice = selectedSlot?.price || 0;

 const totalAmount =
  slotPrice +
  cleaningCharges +
  (securityDeposit || 0);


  const formatDate = (date) => {

    if (!date) return "-";

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      weekday: "long",
    });

  };


  return (

    <div className="
      bg-white 
      border border-[#E2E8F0] 
      rounded-2xl 
      shadow-sm 
      p-5 sm:p-6
      min-h-[540px]
    ">


      {/* Header */}

      <h2 className="
        text-[20px] 
        sm:text-[22px] 
        font-bold 
        text-[#0F172A]
        mb-7
      ">
        Booking Summary
      </h2>



      {!selectedSlot ? (

        <div className="
          flex 
          flex-col 
          items-center 
          justify-center 
          min-h-[350px]
          text-center
        ">

          <i className="
            bi bi-calendar-check 
            text-4xl 
            text-[#94A3B8]
          "></i>


          <p className="
            text-sm 
            text-[#64748B]
            mt-4
            max-w-[220px]
          ">
            Select date and time slot to view booking summary
          </p>


        </div>


      ) : (


      <div className="space-y-6">



        {/* Amenity */}

        <div className="
          flex 
          justify-between 
          gap-4
          items-start
        ">

          <span className="text-[14px] sm:text-[15px] text-[#64748B]">
            Amenity
          </span>


          <span className="
            text-right
            break-words
            font-semibold 
            text-[#0F172A]
            text-[14px] sm:text-[15px]
          ">
            {amenity?.name || "-"}
          </span>


        </div>



        {/* Date */}

        <div className="
          flex 
          justify-between 
          gap-4
          items-start
        ">

          <span className="text-[14px] sm:text-[15px] text-[#64748B]">
            Date
          </span>


          <span className="
            text-right
            break-words
            font-semibold 
            text-[#0F172A]
            text-[14px] sm:text-[15px]
          ">
            {formatDate(selectedDate)}
          </span>


        </div>




        {/* Time */}

        <div className="
          flex 
          justify-between 
          gap-4
          items-start
        ">

          <span className="text-[14px] sm:text-[15px] text-[#64748B]">
            Time
          </span>


          <span className="
            text-right
            font-semibold 
            text-[#0F172A]
            text-[14px] sm:text-[15px]
          ">
            {selectedSlot?.time}
          </span>


        </div>




        {/* Price */}

        <div className="
          flex 
          justify-between
          gap-4
        ">

          <span className="text-[14px] sm:text-[15px] text-[#64748B]">
            Price (Per Hour)
          </span>


          <span className="
            font-semibold 
            text-[#0F172A]
            text-[14px] sm:text-[15px]
          ">
            ₹{slotPrice.toLocaleString("en-IN")}.00
          </span>


        </div>





        {/* Space */}

        <div className="pt-2"></div>





        {/* Sub Total */}

        <div className="
          flex 
          justify-between
          gap-4
        ">

          <span className="text-[14px] sm:text-[15px] text-[#64748B]">
            Sub Total
          </span>


          <span className="font-semibold text-[#0F172A]">
            ₹{slotPrice.toLocaleString("en-IN")}.00
          </span>


        </div>





        {/* Cleaning Charges */}

        <div className="
          flex 
          justify-between
          gap-4
        ">


          <span className="text-[14px] sm:text-[15px] text-[#64748B]">
            Cleaning Charges
          </span>


          <span className="font-semibold text-[#0F172A]">
            ₹{cleaningCharges.toLocaleString("en-IN")}.00
          </span>


        </div>






        {/* Divider */}

        <div className="
          border-t 
          border-[#E2E8F0]
          pt-5
          mt-5
        "></div>





        {/* Total Amount */}

        <div className="
          flex 
          justify-between 
          items-center
          gap-4
        ">


          <span className="
            text-[16px]
            sm:text-[17px]
            font-bold
            text-[#0F172A]
          ">
            Total Amount
          </span>


          <span className="
            text-[20px]
            sm:text-[22px]
            font-bold
            text-[#2563EB]
          ">
            ₹{totalAmount.toLocaleString("en-IN")}.00
          </span>


        </div>



      </div>


      )}


    </div>

  );
};


export default BookingSummary;