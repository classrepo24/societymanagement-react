import React, { createContext, useContext, useState, useEffect } from "react";
const AmenityContext = createContext();

export const AmenityProvider = ({ children }) => {
const defaultAmenities = [

  
  {
  id: 1,
  name: "Club House",
  description: "Spacious clubhouse for events and gatherings",

  category: "Recreation",
  location: "Block A, Ground Floor",

  status: "Active",
  availability: "Available",
  timings: "06:00 AM - 10:00 PM",

  icon: "bi-house-door",
  iconBg: "bg-blue-100",
  iconColor: "text-blue-700",

  bookingType: "Bookable",

  createdAt: "15 Jan 2025",
  updatedAt: "20 Jun 2025",

  capacity: "100 People",

  advanceBookingAllowed: "Yes",
  advanceBookingDays: "7 Days",
  bookingDuration: "4 Hours",
  repeatedBooking: "Yes",

 cancellationPolicy: {
  allowCancellation: true,
  cancelBeforeHours: 2,
},

  operatingHours: "06:00 AM - 10:00 PM",
  weeklyOff: "None",

  maintenanceFrequency: "Monthly",
  lastMaintenance: "10 Jun 2025",
  nextMaintenance: "10 Jul 2025",
  maintenanceBy: "Facility Team",
  maintenanceNotes:
    "Regular equipment checkup and sanitization.",





    maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0001",
    type: "Routine Inspection",
    description: "General inspection of clubhouse facilities.",
    performedOn: "18 Jun 2025",
    nextDue: "18 Jul 2025",
    cost: 2500,
    performedBy: "Facility Management Team",
    status: "Completed",
    notes: "Routine inspection completed successfully."
  },{
  id: 2,
  maintenanceId: "MH-CH-002",
  type: "Electrical Inspection",
  description:
    "Inspection of lighting, power outlets, ceiling fans, and electrical panels. Minor wiring issue rectified.",
  performedOn: "18 Jul 2026",
  nextDue: "18 Oct 2026",
  cost: 3200,
  performedBy: "Bright Electrical Services",
  status: "Completed",
  notes:
    "All electrical systems tested successfully. Emergency lights replaced."
},

{
  id: 3,
  maintenanceId: "MH-CH-003",
  type: "HVAC Servicing",
  description:
    "Complete servicing of air conditioning units including gas pressure check, filter cleaning, and performance testing.",
  performedOn: "05 Aug 2026",
  nextDue: "05 Nov 2026",
  cost: 5800,
  performedBy: "CoolAir Solutions",
  status: "In Progress",
  notes:
    "Two indoor units serviced. Remaining outdoor unit scheduled for completion."
}
],
  address: `Club House,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.8",
  totalBookings: 248,
  totalUsers: 186,
  totalHoursBooked: 520,

  facilities: [
    "Air Conditioning",
    "WiFi",
    "Audio System",
    "Projector",
    "Parking",
    "Washroom"
  ],

  rules: [
    "No smoking inside premises",
    "Booking required before use",
    "Maintain cleanliness",
    "Follow society guidelines"
  ],
  timeSlots: [
  { id: 1, time: "08:00 AM - 10:00 AM", status: "available", price: 1000 },
  { id: 2, time: "10:00 AM - 12:00 PM", status: "booked", price: 1000 },
  { id: 3, time: "12:00 PM - 02:00 PM", status: "available", price: 1000 },
  { id: 4, time: "02:00 PM - 04:00 PM", status: "maintenance", price: 1000 },
  { id: 5, time: "04:00 PM - 06:00 PM", status: "available", price: 1000 },
  { id: 6, time: "06:00 PM - 08:00 PM", status: "available", price: 1000 },
],

  weeklyAvailability: [
    { day: "Mon", status: "Open" },
    { day: "Tue", status: "Open" },
    { day: "Wed", status: "Open" },
    { day: "Thu", status: "Open" },
    { day: "Fri", status: "Open" },
    { day: "Sat", status: "Open" },
    { day: "Sun", status: "Open" }
  ],
  availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},
additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},

  images: [
    "/images/clubhouse1.jpg",
    "/images/clubhouse2.jpg",
    
  ]
},
  {
  id: 2,
  name: "Swimming Pool",
  description: "Well maintained swimming pool",

  category: "Recreation",
  location: "Behind Club House",

  status: "Active",
  availability: "Available",
  timings: "06:00 AM - 08:00 PM",

  icon: "bi-water",
  iconBg: "bg-cyan-100",
  iconColor: "text-cyan-700",

  bookingType: "Bookable",

  createdAt: "18 Jan 2025",
  updatedAt: "25 Jun 2025",

  capacity: "50 People",

  advanceBookingAllowed: "Yes",
  advanceBookingDays: "3 Days",
  bookingDuration: "2 Hours",
  repeatedBooking: "No",

 cancellationPolicy: {
  allowCancellation: true,
  cancelBeforeHours: 2,
},

  operatingHours: "06:00 AM - 08:00 PM",
  weeklyOff: "Monday",

  maintenanceFrequency: "Weekly",
  lastMaintenance: "15 Jun 2025",
  nextMaintenance: "22 Jun 2025",
  maintenanceBy: "Pool Maintenance Team",
  maintenanceNotes:
    "Regular water quality check and cleaning.",

maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0002",
    type: "Water Quality Check",
    description: "Water quality testing and chemical balancing.",
    performedOn: "15 Jun 2025",
    nextDue: "22 Jun 2025",
    cost: 3200,
    performedBy: "Aqua Care Services",
    status: "Completed",
    notes: "Water quality meets safety standards."
  }
],

    
  address: `Swimming Pool,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.6",
  totalBookings: 175,
  totalUsers: 120,
  totalHoursBooked: 340,

  facilities: [
    "Changing Room",
    "Locker Facility",
    "Shower Area",
    "Lifeguard",
    "Seating Area"
  ],

  rules: [
    "Proper swimwear is mandatory",
    "Children must be accompanied by adults",
    "No food inside pool area",
    "Follow safety instructions"
  ],

  weeklyAvailability: [
    { day: "Mon", status: "Closed" },
    { day: "Tue", status: "Open" },
    { day: "Wed", status: "Open" },
    { day: "Thu", status: "Open" },
    { day: "Fri", status: "Open" },
    { day: "Sat", status: "Open" },
    { day: "Sun", status: "Open" }
  ],
timeSlots: [
  { id: 1, time: "06:00 AM - 08:00 AM", status: "available", price: 300 },
  { id: 2, time: "08:00 AM - 10:00 AM", status: "booked", price: 300 },
  { id: 3, time: "10:00 AM - 12:00 PM", status: "available", price: 300 },
  { id: 4, time: "04:00 PM - 06:00 PM", status: "available", price: 300 },
  { id: 5, time: "06:00 PM - 08:00 PM", status: "maintenance", price: 300 },
],
availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},
additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},
  images: [
    "/images/pool1.jpg",
    
  ]
},
  {
  id: 3,
  name: "Gymnasium",
  description: "Modern gym with advanced equipment",

  category: "Fitness",
  location: "Block B, First Floor",

  status: "Active",
  availability: "Available",
  timings: "05:00 AM - 10:00 PM",

  icon: "bi-activity",
  iconBg: "bg-red-100",
  iconColor: "text-red-700",

  bookingType: "Bookable",

  createdAt: "12 Feb 2025",
  updatedAt: "18 Jun 2025",

  capacity: "40 People",

  advanceBookingAllowed: "Yes",
  advanceBookingDays: "5 Days",
  bookingDuration: "2 Hours",
  repeatedBooking: "Yes",

cancellationPolicy: {
  allowCancellation: true,
  cancelBeforeHours: 2,
},

  operatingHours: "05:00 AM - 10:00 PM",
  weeklyOff: "None",

  maintenanceFrequency: "Weekly",
  lastMaintenance: "12 Jun 2025",
  nextMaintenance: "19 Jun 2025",
  maintenanceBy: "Gym Maintenance Team",
  maintenanceNotes:
    "Equipment inspection and cleaning completed.",



    maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0003",
    type: "Equipment Servicing",
    description: "Routine servicing of gym equipment.",
    performedOn: "12 Jun 2025",
    nextDue: "12 Jul 2025",
    cost: 4800,
    performedBy: "FitTech Services",
    status: "Completed",
    notes: "All equipment inspected and lubricated."
  }
],
  address: `Gymnasium,
Block B, First Floor,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.9",
  totalBookings: 320,
  totalUsers: 210,
  totalHoursBooked: 680,

  facilities: [
    "Treadmills",
    "Weight Training",
    "Locker Room",
    "Air Conditioning",
    "Drinking Water"
  ],

  rules: [
    "Wear proper gym attire",
    "Use equipment responsibly",
    "Clean equipment after use",
    "Follow trainer instructions"
  ],

  weeklyAvailability: [
    { day: "Mon", status: "Open" },
    { day: "Tue", status: "Open" },
    { day: "Wed", status: "Open" },
    { day: "Thu", status: "Open" },
    { day: "Fri", status: "Open" },
    { day: "Sat", status: "Open" },
    { day: "Sun", status: "Open" }
  ],
  timeSlots: [
  { id: 1, time: "06:00 AM - 08:00 AM", status: "available", price: 200 },
  { id: 2, time: "08:00 AM - 10:00 AM", status: "available", price: 200 },
  { id: 3, time: "05:00 PM - 07:00 PM", status: "booked", price: 200 },
  { id: 4, time: "07:00 PM - 09:00 PM", status: "available", price: 200 },
],
availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},
additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},

  images: [
    "/images/gym1.jpg",
    
  ]
},

{
  id: 4,
  name: "Children Play Area",
  description: "Safe and fun play area for kids",

  category: "Recreation",
  location: "Central Park Area",

  status: "Active",
  availability: "Available",
  timings: "06:00 AM - 09:00 PM",

  icon: "bi-balloon",
  iconBg: "bg-pink-100",
  iconColor: "text-pink-600",

  bookingType: "Non Bookable",

  createdAt: "08 Mar 2025",
  updatedAt: "15 Jun 2025",

  capacity: "60 Children",

  advanceBookingAllowed: "No",
  advanceBookingDays: "N/A",
  bookingDuration: "N/A",
  repeatedBooking: "N/A",

  cancellationPolicy: "Not Applicable",

  operatingHours: "06:00 AM - 09:00 PM",
  weeklyOff: "None",

  maintenanceFrequency: "Monthly",
  lastMaintenance: "05 Jun 2025",
  nextMaintenance: "05 Jul 2025",
  maintenanceBy: "Facility Team",
  maintenanceNotes:
    "Play equipment safety inspection completed.",



    maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0004",
    type: "Safety Inspection",
    description: "Inspection of swings, slides and play equipment.",
    performedOn: "10 Jun 2025",
    nextDue: "10 Jul 2025",
    cost: 1800,
    performedBy: "Kids Safety Team",
    status: "Completed",
    notes: "All play equipment is safe for use."
  }
],
  address: `Children Play Area,
Central Park,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.7",
  totalBookings: 0,
  totalUsers: 145,
  totalHoursBooked: 0,

  facilities: [
    "Slides",
    "Swings",
    "Seesaw",
    "Soft Flooring",
    "Seating Area"
  ],

  rules: [
    "Children under 8 must be supervised",
    "No littering",
    "Use equipment safely",
    "Follow park timings"
  ],

  weeklyAvailability: [
    { day: "Mon", status: "Open" },
    { day: "Tue", status: "Open" },
    { day: "Wed", status: "Open" },
    { day: "Thu", status: "Open" },
    { day: "Fri", status: "Open" },
    { day: "Sat", status: "Open" },
    { day: "Sun", status: "Open" }
  ],
  timeSlots: [
  { id: 1, time: "08:00 AM - 10:00 AM", status: "available", price: 0 },
  { id: 2, time: "10:00 AM - 12:00 PM", status: "available", price: 0 },
  { id: 3, time: "04:00 PM - 06:00 PM", status: "booked", price: 0 },
  { id: 4, time: "06:00 PM - 08:00 PM", status: "available", price: 0 },
],
availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},
additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},

  images: [
    "/images/playarea1.jpg",
   
  ]
},
  {
  id: 5,
  name: "Multipurpose Hall",
  description: "Ideal for functions and community events",

  category: "Community",
  location: "Block C, Ground Floor",

  status: "Active",
  availability: "Available",
  timings: "09:00 AM - 10:00 PM",

  icon: "bi-building",
  iconBg: "bg-purple-100",
  iconColor: "text-purple-700",

  bookingType: "Bookable",

  createdAt: "20 Jan 2025",
  updatedAt: "22 Jun 2025",

  capacity: "200 People",

  advanceBookingAllowed: "Yes",
  advanceBookingDays: "15 Days",
  bookingDuration: "8 Hours",
  repeatedBooking: "Yes",

cancellationPolicy: {
  allowCancellation: true,
  cancelBeforeHours: 2,
},

  operatingHours: "09:00 AM - 10:00 PM",
  weeklyOff: "None",

  maintenanceFrequency: "Monthly",
  lastMaintenance: "15 Jun 2025",
  nextMaintenance: "15 Jul 2025",
  maintenanceBy: "Community Facility Team",
  maintenanceNotes:
    "Stage, lighting and seating inspected.",


    maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0005",
    type: "Electrical Inspection",
    description: "Inspection of lights, AC and electrical systems.",
    performedOn: "08 Jun 2025",
    nextDue: "08 Jul 2025",
    cost: 3500,
    performedBy: "Electrical Maintenance Team",
    status: "Completed",
    notes: "Electrical systems functioning normally."
  }
],
  address: `Multipurpose Hall,
Block C, Ground Floor,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.9",
  totalBookings: 142,
  totalUsers: 385,
  totalHoursBooked: 760,

  facilities: [
    "Stage",
    "Audio System",
    "Air Conditioning",
    "Projector",
    "Parking",
    "Washroom"
  ],

  rules: [
    "Prior booking required",
    "No damage to property",
    "Follow society guidelines",
    "Event must end within booking time"
  ],

  weeklyAvailability: [
    { day: "Mon", status: "Open" },
    { day: "Tue", status: "Open" },
    { day: "Wed", status: "Open" },
    { day: "Thu", status: "Open" },
    { day: "Fri", status: "Open" },
    { day: "Sat", status: "Open" },
    { day: "Sun", status: "Open" }
  ],
  timeSlots: [
  { id: 1, time: "06:00 AM - 08:00 AM", status: "available", price: 600 },
  { id: 2, time: "08:00 AM - 10:00 AM", status: "booked", price: 600 },
  { id: 3, time: "05:00 PM - 07:00 PM", status: "available", price: 600 },
  { id: 4, time: "07:00 PM - 09:00 PM", status: "maintenance", price: 600 },
],
availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},
additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},

  images: [
    "/images/hall1.jpg",
    
  ]
},

{
  id: 6,
  name: "Badminton Court",
  description: "Indoor badminton court",

  category: "Sports",
  location: "Sports Complex",

  status: "Maintenance",
  availability: "Not Available",
  timings: "Maintenance",

  icon: "bi-dribbble",
  iconBg: "bg-orange-100",
  iconColor: "text-orange-700",

  bookingType: "Bookable",

  createdAt: "05 Feb 2025",
  updatedAt: "18 Jun 2025",

  capacity: "8 Players",

  advanceBookingAllowed: "Yes",
  advanceBookingDays: "3 Days",
  bookingDuration: "1 Hour",
  repeatedBooking: "Yes",

cancellationPolicy: {
  allowCancellation: true,
  cancelBeforeHours: 2,
},

  operatingHours: "Currently Under Maintenance",
  weeklyOff: "None",

  maintenanceFrequency: "Quarterly",
  lastMaintenance: "18 Jun 2025",
  nextMaintenance: "20 Jun 2025",
  maintenanceBy: "Sports Maintenance Team",
  maintenanceNotes:
    "Floor resurfacing and lighting upgrade in progress.",


    maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0006",
    type: "Court Maintenance",
    description: "Court cleaning and net inspection.",
    performedOn: "05 Jun 2025",
    nextDue: "05 Jul 2025",
    cost: 2100,
    performedBy: "Sports Facility Team",
    status: "Completed",
    notes: "Court surface cleaned and net adjusted."
  }
],
  address: `Badminton Court,
Sports Complex,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.5",
  totalBookings: 215,
  totalUsers: 132,
  totalHoursBooked: 420,

  facilities: [
    "Indoor Court",
    "LED Lighting",
    "Seating Area",
    "Equipment Storage",
    "Drinking Water"
  ],

  rules: [
    "Sports shoes mandatory",
    "Respect booking slots",
    "Keep court clean",
    "No food on court"
  ],

  weeklyAvailability: [
    { day: "Mon", status: "Closed" },
    { day: "Tue", status: "Closed" },
    { day: "Wed", status: "Closed" },
    { day: "Thu", status: "Closed" },
    { day: "Fri", status: "Closed" },
    { day: "Sat", status: "Closed" },
    { day: "Sun", status: "Closed" }
  ],
  timeSlots: [
  { id: 1, time: "06:00 AM - 08:00 AM", status: "available", price: 500 },
  { id: 2, time: "08:00 AM - 10:00 AM", status: "booked", price: 500 },
  { id: 3, time: "05:00 PM - 07:00 PM", status: "available", price: 500 },
],
availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},
additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},

  images: [
    "/images/badminton1.jpg",
    
  ]
},
  {
  id: 7,
  name: "Tennis Court",
  description: "Outdoor tennis court",

  category: "Sports",
  location: "Sports Complex",

  status: "Active",
  availability: "Available",
  timings: "06:00 AM - 08:00 PM",

  icon: "bi-dribbble",
  iconBg: "bg-yellow-100",
  iconColor: "text-yellow-700",

  bookingType: "Bookable",

  createdAt: "10 Feb 2025",
  updatedAt: "20 Jun 2025",

  capacity: "4 Players",

  advanceBookingAllowed: "Yes",
  advanceBookingDays: "5 Days",
  bookingDuration: "2 Hours",
  repeatedBooking: "Yes",

cancellationPolicy: {
  allowCancellation: true,
  cancelBeforeHours: 2,
},

  operatingHours: "06:00 AM - 08:00 PM",
  weeklyOff: "None",

  maintenanceFrequency: "Monthly",
  lastMaintenance: "12 Jun 2025",
  nextMaintenance: "12 Jul 2025",
  maintenanceBy: "Sports Team",
  maintenanceNotes:
    "Net replacement and surface cleaning completed.",



    maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0007",
    type: "Surface Inspection",
    description: "Inspection of court surface and lighting.",
    performedOn: "03 Jun 2025",
    nextDue: "03 Jul 2025",
    cost: 2700,
    performedBy: "Sports Facility Team",
    status: "Completed",
    notes: "Court surface in good condition."
  }
],
  address: `Tennis Court,
Sports Complex,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.7",
  totalBookings: 185,
  totalUsers: 118,
  totalHoursBooked: 390,

  facilities: [
    "Outdoor Court",
    "LED Flood Lights",
    "Seating Area",
    "Equipment Storage"
  ],

  rules: [
    "Sports shoes mandatory",
    "Respect booking schedule",
    "No littering",
    "Follow court guidelines"
  ],

  weeklyAvailability: [
    { day: "Mon", status: "Open" },
    { day: "Tue", status: "Open" },
    { day: "Wed", status: "Open" },
    { day: "Thu", status: "Open" },
    { day: "Fri", status: "Open" },
    { day: "Sat", status: "Open" },
    { day: "Sun", status: "Open" }
  ],
timeSlots: [
  { id: 1, time: "06:00 AM - 07:00 AM", status: "available", price: 400 },
  { id: 2, time: "07:00 AM - 08:00 AM", status: "booked", price: 400 },
  { id: 3, time: "05:00 PM - 06:00 PM", status: "available", price: 400 },
  { id: 4, time: "06:00 PM - 07:00 PM", status: "maintenance", price: 400 },
],
availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},
additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},
  images: [
    "/images/tennis1.jpg",
    
  ]
},

{
  id: 8,
  name: "Yoga & Meditation Room",
  description: "Peaceful space for yoga and meditation",

  category: "Wellness",
  location: "Block B, Second Floor",

  status: "Active",
  availability: "Available",
  timings: "06:00 AM - 09:00 PM",

  icon: "bi-flower1",
  iconBg: "bg-green-100",
  iconColor: "text-green-700",

  bookingType: "Bookable",

  createdAt: "25 Feb 2025",
  updatedAt: "21 Jun 2025",

  capacity: "30 People",

  advanceBookingAllowed: "Yes",
  advanceBookingDays: "7 Days",
  bookingDuration: "2 Hours",
  repeatedBooking: "Yes",

cancellationPolicy: {
  allowCancellation: true,
  cancelBeforeHours: 2,
},

  operatingHours: "06:00 AM - 09:00 PM",
  weeklyOff: "None",

  maintenanceFrequency: "Monthly",
  lastMaintenance: "08 Jun 2025",
  nextMaintenance: "08 Jul 2025",
  maintenanceBy: "Wellness Team",
  maintenanceNotes:
    "Room sanitization and ventilation check completed.",


    maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0008",
    type: "Deep Cleaning",
    description: "Deep cleaning and air conditioning check.",
    performedOn: "01 Jun 2025",
    nextDue: "01 Jul 2025",
    cost: 1600,
    performedBy: "Housekeeping Team",
    status: "Completed",
    notes: "Room cleaned and sanitized."
  }
],
  address: `Yoga & Meditation Room,
Block B, Second Floor,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.9",
  totalBookings: 156,
  totalUsers: 98,
  totalHoursBooked: 280,

  facilities: [
    "Yoga Mats",
    "Air Conditioning",
    "Meditation Zone",
    "Music System",
    "Drinking Water"
  ],

  rules: [
    "Maintain silence",
    "Remove footwear before entry",
    "Keep area clean",
    "Respect meditation sessions"
  ],

  weeklyAvailability: [
    { day: "Mon", status: "Open" },
    { day: "Tue", status: "Open" },
    { day: "Wed", status: "Open" },
    { day: "Thu", status: "Open" },
    { day: "Fri", status: "Open" },
    { day: "Sat", status: "Open" },
    { day: "Sun", status: "Open" }
  ],
  timeSlots: [
  { id: 1, time: "06:00 AM - 08:00 AM", status: "available", price: 500 },
  { id: 2, time: "08:00 AM - 10:00 AM", status: "booked", price: 500 },
  { id: 3, time: "10:00 AM - 12:00 PM", status: "maintenance", price: 500 },
  { id: 4, time: "04:00 PM - 06:00 PM", status: "available", price: 500 },
  { id: 5, time: "06:00 PM - 08:00 PM", status: "available", price: 500 },
],
availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},
additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},

  images: [
    "/images/yoga1.jpg",
    
  ]
},
  {
  id: 9,
  name: "Library",
  description: "Quiet library with books and reading space",

  category: "Community",
  location: "Block A, First Floor",

  status: "Inactive",
  availability: "Not Available",
  timings: "Temporarily Closed",

  icon: "bi-book",
  iconBg: "bg-gray-200",
  iconColor: "text-gray-700",

  bookingType: "Non Bookable",

  createdAt: "05 Mar 2025",
  updatedAt: "18 Jun 2025",

  capacity: "80 People",

  advanceBookingAllowed: "No",
  advanceBookingDays: "N/A",
  bookingDuration: "N/A",
  repeatedBooking: "N/A",

  cancellationPolicy: "Not Applicable",

  operatingHours: "Temporarily Closed",
  weeklyOff: "Sunday",

  maintenanceFrequency: "Quarterly",
  lastMaintenance: "15 Jun 2025",
  nextMaintenance: "15 Sep 2025",
  maintenanceBy: "Library Management Team",
  maintenanceNotes:
    "Library is temporarily closed for renovation and catalog update.",


    maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0009",
    type: "Facility Inspection",
    description: "Inspection of shelves, furniture and lighting.",
    performedOn: "28 May 2025",
    nextDue: "28 Jun 2025",
    cost: 1400,
    performedBy: "Library Maintenance Team",
    status: "Completed",
    notes: "Furniture and lighting checked."
  }
],
  address: `Library,
Block A, First Floor,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.6",
  totalBookings: 0,
  totalUsers: 225,
  totalHoursBooked: 0,

  facilities: [
    "Reading Area",
    "Reference Books",
    "Digital Catalog",
    "Study Tables",
    "WiFi"
  ],

  rules: [
    "Maintain silence",
    "Return books on time",
    "No food or drinks",
    "Handle books carefully"
  ],

  weeklyAvailability: [
    { day: "Mon", status: "Closed" },
    { day: "Tue", status: "Closed" },
    { day: "Wed", status: "Closed" },
    { day: "Thu", status: "Closed" },
    { day: "Fri", status: "Closed" },
    { day: "Sat", status: "Closed" },
    { day: "Sun", status: "Closed" }
  ],
timeSlots: [
  { id: 1, time: "09:00 AM - 01:00 PM", status: "available", price: 2000 },
  { id: 2, time: "01:00 PM - 05:00 PM", status: "booked", price: 2000 },
  { id: 3, time: "05:00 PM - 09:00 PM", status: "available", price: 2000 },
],
availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},
additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},
  images: [
    "/images/library1.jpg",
   
  ]
},

{
  id: 10,
  name: "Amphitheatre",
  description: "Open-air amphitheatre for events",

  category: "Community",
  location: "Central Garden",

  status: "Active",
  availability: "Available",
  timings: "10:00 AM - 10:00 PM",

  icon: "bi-bank",
  iconBg: "bg-indigo-100",
  iconColor: "text-indigo-700",

  bookingType: "Bookable",

  createdAt: "12 Mar 2025",
  updatedAt: "22 Jun 2025",

  capacity: "300 People",

  advanceBookingAllowed: "Yes",
  advanceBookingDays: "15 Days",
  bookingDuration: "6 Hours",
  repeatedBooking: "Yes",

  cancellationPolicy: {
  allowCancellation: true,
  cancelBeforeHours: 2,
},

  operatingHours: "10:00 AM - 10:00 PM",
  weeklyOff: "None",

  maintenanceFrequency: "Monthly",
  lastMaintenance: "10 Jun 2025",
  nextMaintenance: "10 Jul 2025",
  maintenanceBy: "Facility Team",
  maintenanceNotes:
    "Stage lighting and seating inspection completed.",


    maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0010",
    type: "Stage Inspection",
    description: "Inspection of stage, seating and sound system.",
    performedOn: "25 May 2025",
    nextDue: "25 Jun 2025",
    cost: 4200,
    performedBy: "Event Support Team",
    status: "Completed",
    notes: "Stage equipment inspected successfully."
  }
],
  address: `Amphitheatre,
Central Garden,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.8",
  totalBookings: 178,
  totalUsers: 520,
  totalHoursBooked: 860,

  facilities: [
    "Open Air Seating",
    "Stage",
    "Lighting System",
    "Sound System",
    "Parking"
  ],

  rules: [
    "Prior approval required for events",
    "Keep premises clean",
    "No damage to equipment",
    "Follow society guidelines"
  ],

  weeklyAvailability: [
    { day: "Mon", status: "Open" },
    { day: "Tue", status: "Open" },
    { day: "Wed", status: "Open" },
    { day: "Thu", status: "Open" },
    { day: "Fri", status: "Open" },
    { day: "Sat", status: "Open" },
    { day: "Sun", status: "Open" }
  ],
  timeSlots: [{ id: 1, time: "09:00 AM - 12:00 PM", status: "available", price: 1500 }, 
    { id: 2, time: "12:00 PM - 03:00 PM", status: "booked", price: 1500 }, 
    { id: 3, time: "03:00 PM - 06:00 PM", status: "available", price: 1500 },
     { id: 4, time: "06:00 PM - 09:00 PM", status: "maintenance", price: 1500 }, 
    { id: 5, time: "09:00 PM - 10:00 PM", status: "available", price: 1500 }],

    availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},
additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},
  images: [
    "/images/amphitheatre1.jpg",
   
  ]
},
  {
  id: 11,
  name: "Indoor Games Room",
  description: "Table tennis, chess and indoor activities",

  category: "Recreation",
  location: "Club House",

  status: "Active",
  availability: "Available",
  timings: "09:00 AM - 09:00 PM",

  icon: "bi-controller",
  iconBg: "bg-teal-100",
  iconColor: "text-teal-700",

  bookingType: "Bookable",

  createdAt: "18 Mar 2025",
  updatedAt: "25 Jun 2025",

  capacity: "40 People",

  advanceBookingAllowed: "Yes",
  advanceBookingDays: "3 Days",
  bookingDuration: "2 Hours",
  repeatedBooking: "Yes",

cancellationPolicy: {
  allowCancellation: true,
  cancelBeforeHours: 2,
},

  operatingHours: "09:00 AM - 09:00 PM",
  weeklyOff: "None",

  maintenanceFrequency: "Monthly",
  lastMaintenance: "12 Jun 2025",
  nextMaintenance: "12 Jul 2025",
  maintenanceBy: "Recreation Team",
  maintenanceNotes:
    "Gaming tables and equipment inspected and serviced.",

    maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0011",
    type: "Equipment Check",
    description: "Inspection of indoor gaming equipment.",
    performedOn: "22 May 2025",
    nextDue: "22 Jun 2025",
    cost: 1900,
    performedBy: "Sports Maintenance Team",
    status: "Completed",
    notes: "Gaming equipment working properly."
  }
],
  address: `Indoor Games Room,
Club House,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.7",
  totalBookings: 164,
  totalUsers: 142,
  totalHoursBooked: 325,

  facilities: [
    "Table Tennis",
    "Chess",
    "Carrom",
    "Board Games",
    "Air Conditioning"
  ],

  rules: [
    "Handle equipment carefully",
    "Return items after use",
    "Maintain cleanliness",
    "Respect booking timings"
  ],

  weeklyAvailability: [
    { day: "Mon", status: "Open" },
    { day: "Tue", status: "Open" },
    { day: "Wed", status: "Open" },
    { day: "Thu", status: "Open" },
    { day: "Fri", status: "Open" },
    { day: "Sat", status: "Open" },
    { day: "Sun", status: "Open" }
  ],
timeSlots: [{ id: 1, time: "09:00 AM - 11:00 AM", status: "available", price: 250 }, { id: 2, time: "11:00 AM - 01:00 PM", status: "booked", price: 250 }, { id: 3, time: "01:00 PM - 03:00 PM", status: "available", price: 250 }, { id: 4, time: "03:00 PM - 05:00 PM", status: "maintenance", price: 250 },
     { id: 5, time: "05:00 PM - 07:00 PM", status: "available", price: 250 }],

     availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},
additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},
  images: [
    "/images/indoorgames1.jpg",
    
  ]
},

{
  id: 12,
  name: "Jogging Track",
  description: "Dedicated track for walking and jogging",

  category: "Fitness",
  location: "Society Perimeter",

  status: "Active",
  availability: "Available",
  timings: "24 Hours",

  icon: "bi-signpost-split",
  iconBg: "bg-emerald-100",
  iconColor: "text-emerald-700",

  bookingType: "Non Bookable",

  createdAt: "22 Mar 2025",
  updatedAt: "28 Jun 2025",

  capacity: "Unlimited",

  advanceBookingAllowed: "No",
  advanceBookingDays: "N/A",
  bookingDuration: "N/A",
  repeatedBooking: "N/A",

  cancellationPolicy: "Not Applicable",

  operatingHours: "24 Hours",
  weeklyOff: "None",

  maintenanceFrequency: "Weekly",
  lastMaintenance: "20 Jun 2025",
  nextMaintenance: "27 Jun 2025",
  maintenanceBy: "Ground Maintenance Team",
  maintenanceNotes:
    "Track surface cleaned and safety inspection completed.",


    maintenanceHistory: [
  {
    id: 1,
    maintenanceId: "MNT-2025-0012",
    type: "Track Inspection",
    description: "Routine inspection and cleaning of the jogging track.",
    performedOn: "20 May 2025",
    nextDue: "20 Jun 2025",
    cost: 2000,
    performedBy: "Ground Maintenance Team",
    status: "Completed",
    notes: "Track surface cleaned and found safe for use."
  }
],
  address: `Jogging Track,
Society Perimeter Road,
Green View Apartment,
Sector 45, Noida - 201301`,

  rating: "4.8",
  totalBookings: 0,
  totalUsers: 310,
  totalHoursBooked: 0,

  facilities: [
    "Walking Track",
    "Jogging Lane",
    "Lighting",
    "Benches",
    "Drinking Water"
  ],

  rules: [
    "Keep left while jogging",
    "Do not litter",
    "Pets must be supervised",
    "Respect other users"
  ],

  weeklyAvailability: [
    { day: "Mon", status: "Open" },
    { day: "Tue", status: "Open" },
    { day: "Wed", status: "Open" },
    { day: "Thu", status: "Open" },
    { day: "Fri", status: "Open" },
    { day: "Sat", status: "Open" },
    { day: "Sun", status: "Open" }
  ],
  timeSlots: [
  { id: 1, time: "05:00 AM - 07:00 AM", status: "available", price: 0 },
  { id: 2, time: "07:00 AM - 09:00 AM", status: "booked", price: 0 },
  { id: 3, time: "09:00 AM - 05:00 PM", status: "available", price: 0 },
  { id: 4, time: "05:00 PM - 07:00 PM", status: "maintenance", price: 0 },
  { id: 5, time: "07:00 PM - 10:00 PM", status: "available", price: 0 },
],
availabilitySettings: {
  weeklySlots: [
    {
      day: "Mon",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Tue",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Wed",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Thu",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Fri",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sat",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    },
    {
      day: "Sun",
      slots: [
        { from: "06:00 AM", to: "10:00 PM" }
      ]
    }
  ],

  specialTimings: [],

  blockedDates: []
},

additionalSettings: {
  requirePurpose: true,
  requirePeopleCount: true,
  showGuidelines: true,
  requireSecurityDeposit: false,
  securityDepositAmount: 0,
},

  images: [
    "/images/jogging1.jpg",
   
  ]
},
];

const  defaultBookings = [
//   {
//     id: 1,
//     amenityId: 1,

//     bookingId: "BK-2025-001",

//     residentName: "Rahul Mehta",
//     flatNumber: "A-101",
//     apartmentName: "Green View Apartment",

//     mobile: "9876543210",
//     email: "rahul.mehta@gmail.com",

//     bookingDate: "16 May 2025",
//     bookingFor: "18 May 2025",

//     timeSlot: "10:00 AM - 02:00 PM",

//     start: "10:00 AM",
//     end: "02:00 PM",

//     status: "Pending",

//     purpose: "Birthday Celebration",

//     numberOfPeople: 50,

//     advanceBooking: "Yes",
//     repeatBooking: "No",
//     duration: "4 Hours",

//     paymentStatus: "Paid",
//     amountPaid: 2500,

//     notes: "Need projector and sound system.",

//     createdAt: "16 May 2025 09:15 AM",

//     timeline: [
//       {
//         title: "Booking Created",
//         date: "16 May 2025 09:15 AM",
//       },
//       {
//         title: "Booking Approved",
//         date: "16 May 2025 09:30 AM",
//       },
//     ],
//   },

//   {
//     id: 2,
//     amenityId: 1,

//     bookingId: "BK-2025-002",

//     residentName: "Priya Sharma",
//     flatNumber: "B-204",
//     apartmentName: "Green View Apartment",

//     mobile: "9876501234",
//     email: "priya.sharma@gmail.com",

//     bookingDate: "17 May 2025",
//     bookingFor: "19 May 2025",

//     timeSlot: "04:00 PM - 06:00 PM",

//     start: "04:00 PM",
//     end: "06:00 PM",

//     status: "Confirmed",

//     purpose: "Yoga Session",

//     numberOfPeople: 15,

//     advanceBooking: "Yes",
//     repeatBooking: "Yes",
//     duration: "2 Hours",

//     paymentStatus: "Pending",
//     amountPaid: 2000,

//     notes: "",

//     createdAt: "17 May 2025 10:00 AM",

//     timeline: [
//       {
//         title: "Booking Created",
//         date: "17 May 2025 10:00 AM",
//       },
//     ],
//   },

  
 ];
const [bookings, setBookings] = useState(() => {
  const savedBookings = localStorage.getItem("amenityBookings");

  return savedBookings
    ? JSON.parse(savedBookings)
    : defaultBookings;
});



const [amenities, setAmenities] = useState(() => {
  const savedAmenities = localStorage.getItem("amenities");

  return savedAmenities
    ? JSON.parse(savedAmenities)
    : defaultAmenities;
});
useEffect(() => {
  localStorage.setItem(
    "amenityBookings",
    JSON.stringify(bookings)
  );
}, [bookings]);


useEffect(() => {
  localStorage.setItem(
    "amenities",
    JSON.stringify(amenities)
  );


  
}, 





[amenities]);
  return (
  <AmenityContext.Provider
    value={{
      amenities,
      setAmenities,

      bookings,
      setBookings,
    }}
  >
    {children}
  </AmenityContext.Provider>
);
};

export const useAmenity = () => useContext(AmenityContext);