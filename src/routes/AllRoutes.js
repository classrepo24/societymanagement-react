import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import {Complaints} from "../pages/Complaints/Complaints";
import {ComplaintSettings} from "../pages/Complaints/ComplaintSettings";
import RaiseComplaint from "../pages/Complaints/RaiseComplaint";

import { MyComplaints } from "../pages/Complaints/MyComplaints";
import { ComplaintCategories } from "../pages/Complaints/ComplaintCategories";
import { Messages } from "../pages/dashboard/Messages";
import { HelpAndSupport } from "../pages/dashboard/HelpAndSupport";
import { Amenity } from "../pages/Amenity/Amenity";
import { AddNewAmenities } from "../pages/Amenity/AddNewAmenities";
import  AmenityDetails  from "../pages/Amenity/AmenityDetails";
import { AmenityBookings } from "../pages/Amenity/AmenitySchedule/AmenityBookings";
import  AmenitySchedule  from "../pages/Amenity/AmenitySchedule/AmenitySchedule";
import { EditAmenities } from "../pages/Amenity/EditAmenities";
import { AvailabilityTiming } from "../pages/Amenity/AvailabilityTiming";
import {AmenityBooking} from "../pages/Amenity/AmenityBooking/AmenityBooking";
import { RescheduleBooking } from "../pages/Amenity/AmenitySchedule/RescheduleBooking";
import CancelBooking from "../pages/Amenity/AmenitySchedule/CancelBooking";

import { ContactResident } from "../pages/Amenity/AmenitySchedule/ContactResident";
import { BookingSettings } from "../pages/Amenity/BookingSettings";

const AllRoutes = () => {
  return (
   <Routes>
  <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path = "/dashboard/messages" element={<Messages />} />
  <Route path="/dashboard/help-support" element={<HelpAndSupport />} />

  {/* Complaints modeule */}
  <Route path="/complaints" element={<Complaints />} />
  <Route path="/complaints/settings" element={<ComplaintSettings />} />

  <Route path="/complaints/raise" element={<RaiseComplaint />}/>
<Route path="/complaints/my-complaints" element={<MyComplaints />} />
<Route path="/complaints/categories" element={<ComplaintCategories />} />

{/* Amenity */}
<Route path="/amenities" element={<Amenity/>} />
<Route path="/amenities/add" element={<AddNewAmenities/>}/>
<Route path="/amenities/edit/:id" element={<EditAmenities />} />
<Route path="/amenities/view/:id" element={<AmenityDetails />}/>
<Route  path="/amenities/booking"element={< AmenityBookings/>}/>
<Route  path="/amenities/AmenitySchedule/schedule"element={< AmenitySchedule/>}/>
<Route path="/amenities/timing/:id" element={< AvailabilityTiming/>}/>
<Route path="/amenities/amenitybooking" element={<AmenityBooking />}
/>




<Route
  path="/amenities/booking"
  element={<AmenityBookings />}
/>

<Route
  path="/amenities/booking/reschedule"
  element={<RescheduleBooking />}
/>

<Route
  path="/amenities/booking/cancel"
  element={<CancelBooking/>}
/>

<Route
  path="/amenities/booking/contact"
  element={<ContactResident />}
/>


<Route
  path="/amenities/edit/:id/booking-settings"
  element={<BookingSettings />}
/>
</Routes>




  );
};

export default AllRoutes;