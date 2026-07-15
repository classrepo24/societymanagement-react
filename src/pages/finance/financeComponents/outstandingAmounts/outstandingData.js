export const outstandingData = [
  {
    id: 1,
    type: "Resident",
    name: "Rajesh Kumar",
    flat: "A-101",
    apartment: "Green View Apartment",
    category: "Maintenance Charges",
    billingPeriod: "Apr 2025",
    invoice: "INV-2025-041",
    invoiceDate: "01 Apr 2025",
    dueDate: "15 Apr 2025",
    days: 39,
    amount: 12450,
    paidAmount: 0,
    outstandingAmount: 12450,
    status: "Overdue",

    description: "Maintenance Charges - Apr 2025",
    invoiceType: "Maintenance Charges",
    createdBy: "Rahul Mehta",
    createdOn: "01 Apr 2025 10:30 AM",

    mobile: "9876543210",
    email: "rajesh.kumar@gmail.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [
      {
        type: "Email Reminder",
        by: "Rahul Mehta",
        date: "10 Apr 2025",
        time: "11:30 AM",
      },
    ],

    timeline: [
      {
        title: "Invoice Overdue",
        description: "The invoice is overdue by 39 days.",
        date: "16 Apr 2025",
        time: "09:00 AM",
        type: "danger",
      },
      {
        title: "Payment Reminder Sent",
        description: "Payment reminder sent to resident.",
        date: "10 Apr 2025",
        time: "11:30 AM",
        type: "warning",
      },
      {
        title: "Invoice Created",
        description: "Invoice has been created.",
        date: "01 Apr 2025",
        time: "10:30 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 2,
    type: "Resident",
    name: "Suresh Patil",
    flat: "B-202",
    apartment: "Green View Apartment",
    category: "Maintenance Charges",
    billingPeriod: "Apr 2025",
    invoice: "INV-2025-042",
    invoiceDate: "01 Apr 2025",
    dueDate: "18 Apr 2025",
    days: 30,
    amount: 9500,
    paidAmount: 0,
    outstandingAmount: 9500,
    status: "Due Soon",

    description: "Maintenance Charges - Apr 2025",
    invoiceType: "Maintenance Charges",
    createdBy: "Rahul Mehta",
    createdOn: "01 Apr 2025 10:45 AM",

    mobile: "9876543211",
    email: "suresh.patil@gmail.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [],
    timeline: [
      {
        title: "Payment Reminder Scheduled",
        description: "Reminder will be sent before due date.",
        date: "12 Apr 2025",
        time: "10:00 AM",
        type: "warning",
      },
      {
        title: "Invoice Created",
        description: "Invoice has been created.",
        date: "01 Apr 2025",
        time: "10:45 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 3,
    type: "Supplier",
    name: "ABC Security Pvt. Ltd.",
    flat: "-",
    apartment: "Green View Apartment",
    category: "Security Services",
    billingPeriod: "May 2025",
    invoice: "INV-2025-050",
    invoiceDate: "10 May 2025",
    dueDate: "30 Jul 2025",
    days: 0,
    amount: 50000,
    paidAmount: 10000,
    outstandingAmount: 40000,
    status: "Not Yet Due",

    description: "Monthly Security Services",
    invoiceType: "Supplier Invoice",
    createdBy: "Admin",
    createdOn: "10 May 2025 09:15 AM",

    mobile: "9823001111",
    email: "accounts@abcsecurity.com",

    paymentStatus: "Partially Paid",

    paymentHistory: [
      {
        date: "15 May 2025",
        amount: 10000,
        mode: "Bank Transfer",
        reference: "TXN45021",
      },
    ],

    notes: [
      {
        message: "Advance payment released.",
        date: "15 May 2025",
      },
    ],

    attachments: [
      {
        name: "SecurityInvoice.pdf",
        size: "220 KB",
      },
    ],

    reminders: [],

    timeline: [
      {
        title: "Advance Payment Recorded",
        description: "₹10,000 paid.",
        date: "15 May 2025",
        time: "04:15 PM",
        type: "primary",
      },
      {
        title: "Invoice Created",
        description: "Supplier invoice generated.",
        date: "10 May 2025",
        time: "09:15 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 4,
    type: "Resident",
    name: "Priya Sharma",
    flat: "C-303",
    apartment: "Green View Apartment",
    category: "Maintenance Charges",
    billingPeriod: "May 2025",
    invoice: "INV-2025-043",
    invoiceDate: "02 May 2025",
    dueDate: "16 May 2025",
    days: 25,
    amount: 11800,
    paidAmount: 0,
    outstandingAmount: 11800,
    status: "Overdue",

    description: "Maintenance Charges - May 2025",
    invoiceType: "Maintenance Charges",
    createdBy: "Rahul Mehta",
    createdOn: "02 May 2025 11:00 AM",

    mobile: "9876543212",
    email: "priya.sharma@gmail.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [
      {
        type: "SMS Reminder",
        by: "Admin",
        date: "15 May 2025",
        time: "05:00 PM",
      },
    ],

    timeline: [
      {
        title: "Invoice Overdue",
        description: "Invoice overdue by 25 days.",
        date: "17 May 2025",
        time: "09:00 AM",
        type: "danger",
      },
      {
        title: "Reminder Sent",
        description: "SMS reminder sent.",
        date: "15 May 2025",
        time: "05:00 PM",
        type: "warning",
      },
      {
        title: "Invoice Created",
        description: "Invoice created successfully.",
        date: "02 May 2025",
        time: "11:00 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 5,
    type: "Supplier",
    name: "Bright Cleaning Services",
    flat: "-",
    apartment: "Green View Apartment",
    category: "Housekeeping",
    billingPeriod: "May 2025",
    invoice: "INV-2025-051",
    invoiceDate: "08 May 2025",
    dueDate: "05 Aug 2025",
    days: 0,
    amount: 22500,
    paidAmount: 5000,
    outstandingAmount: 17500,
    status: "Not Yet Due",

    description: "Housekeeping Services",
    invoiceType: "Supplier Invoice",
    createdBy: "Admin",
    createdOn: "08 May 2025 09:30 AM",

    mobile: "9898989898",
    email: "support@brightcleaning.com",

    paymentStatus: "Partially Paid",

    paymentHistory: [
      {
        date: "12 May 2025",
        amount: 5000,
        mode: "NEFT",
        reference: "TXN55211",
      },
    ],

    notes: [],
    attachments: [],
    reminders: [],

    timeline: [
      {
        title: "Partial Payment",
        description: "₹5,000 payment recorded.",
        date: "12 May 2025",
        time: "03:30 PM",
        type: "primary",
      },
      {
        title: "Invoice Created",
        description: "Supplier invoice generated.",
        date: "08 May 2025",
        time: "09:30 AM",
        type: "primary",
      },
    ],
  },
  {
    id: 6,
    type: "Resident",
    name: "Amit Verma",
    flat: "D-104",
    apartment: "Green View Apartment",
    category: "Maintenance Charges",
    billingPeriod: "Jun 2025",
    invoice: "INV-2025-044",
    invoiceDate: "01 Jun 2025",
    dueDate: "20 Jun 2025",
    days: 12,
    amount: 13200,
    paidAmount: 3000,
    outstandingAmount: 10200,
    status: "Due Soon",

    description: "Maintenance Charges - Jun 2025",
    invoiceType: "Maintenance Charges",
    createdBy: "Rahul Mehta",
    createdOn: "01 Jun 2025 10:00 AM",

    mobile: "9876543213",
    email: "amit.verma@gmail.com",

    paymentStatus: "Partially Paid",

    paymentHistory: [
      {
        date: "05 Jun 2025",
        amount: 3000,
        mode: "UPI",
        reference: "TXN60001",
      },
    ],

    notes: [],
    attachments: [],
    reminders: [],
    timeline: [
      {
        title: "Partial Payment Received",
        description: "₹3,000 payment received.",
        date: "05 Jun 2025",
        time: "02:00 PM",
        type: "primary",
      },
      {
        title: "Invoice Created",
        description: "Invoice generated.",
        date: "01 Jun 2025",
        time: "10:00 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 7,
    type: "Vendor",
    name: "Sunrise Electricals",
    flat: "-",
    apartment: "Green View Apartment",
    category: "Electrical Maintenance",
    billingPeriod: "Apr 2025",
    invoice: "INV-2025-052",
    invoiceDate: "15 Apr 2025",
    dueDate: "05 May 2025",
    days: 48,
    amount: 34800,
    paidAmount: 0,
    outstandingAmount: 34800,
    status: "Overdue",

    description: "Electrical Maintenance Charges",
    invoiceType: "Vendor Invoice",
    createdBy: "Admin",
    createdOn: "15 Apr 2025 09:30 AM",

    mobile: "9988776655",
    email: "accounts@sunriseelectricals.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [
      {
        type: "Email Reminder",
        by: "Admin",
        date: "01 May 2025",
        time: "11:00 AM",
      },
    ],
    timeline: [
      {
        title: "Invoice Overdue",
        description: "Invoice overdue by 48 days.",
        date: "06 May 2025",
        time: "09:00 AM",
        type: "danger",
      },
      {
        title: "Reminder Sent",
        description: "Reminder email sent.",
        date: "01 May 2025",
        time: "11:00 AM",
        type: "warning",
      },
      {
        title: "Invoice Created",
        description: "Vendor invoice created.",
        date: "15 Apr 2025",
        time: "09:30 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 8,
    type: "Resident",
    name: "Neha Joshi",
    flat: "E-205",
    apartment: "Green View Apartment",
    category: "Maintenance Charges",
    billingPeriod: "May 2025",
    invoice: "INV-2025-045",
    invoiceDate: "03 May 2025",
    dueDate: "28 Jul 2025",
    days: 0,
    amount: 12900,
    paidAmount: 0,
    outstandingAmount: 12900,
    status: "Not Yet Due",

    description: "Maintenance Charges - May 2025",
    invoiceType: "Maintenance Charges",
    createdBy: "Rahul Mehta",
    createdOn: "03 May 2025 09:15 AM",

    mobile: "9876543214",
    email: "neha.joshi@gmail.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [],
    timeline: [
      {
        title: "Invoice Created",
        description: "Invoice generated successfully.",
        date: "03 May 2025",
        time: "09:15 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 9,
    type: "Resident",
    name: "Rohit Kulkarni",
    flat: "F-306",
    apartment: "Green View Apartment",
    category: "Maintenance Charges",
    billingPeriod: "Apr 2025",
    invoice: "INV-2025-046",
    invoiceDate: "01 Apr 2025",
    dueDate: "10 Apr 2025",
    days: 44,
    amount: 10700,
    paidAmount: 0,
    outstandingAmount: 10700,
    status: "Overdue",

    description: "Maintenance Charges - Apr 2025",
    invoiceType: "Maintenance Charges",
    createdBy: "Rahul Mehta",
    createdOn: "01 Apr 2025 09:00 AM",

    mobile: "9876543215",
    email: "rohit.kulkarni@gmail.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [
      {
        type: "SMS Reminder",
        by: "Admin",
        date: "08 Apr 2025",
        time: "04:00 PM",
      },
    ],
    timeline: [
      {
        title: "Invoice Overdue",
        description: "Invoice overdue by 44 days.",
        date: "11 Apr 2025",
        time: "09:00 AM",
        type: "danger",
      },
      {
        title: "Reminder Sent",
        description: "SMS reminder sent.",
        date: "08 Apr 2025",
        time: "04:00 PM",
        type: "warning",
      },
      {
        title: "Invoice Created",
        description: "Invoice generated.",
        date: "01 Apr 2025",
        time: "09:00 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 10,
    type: "Supplier",
    name: "Aqua Water Solutions",
    flat: "-",
    apartment: "Green View Apartment",
    category: "Water Supply",
    billingPeriod: "Jun 2025",
    invoice: "INV-2025-053",
    invoiceDate: "12 Jun 2025",
    dueDate: "15 Jul 2025",
    days: 7,
    amount: 28400,
    paidAmount: 5000,
    outstandingAmount: 23400,
    status: "Due Soon",

    description: "Monthly Water Supply Charges",
    invoiceType: "Supplier Invoice",
    createdBy: "Admin",
    createdOn: "12 Jun 2025 11:30 AM",

    mobile: "9123456780",
    email: "billing@aquawater.com",

    paymentStatus: "Partially Paid",

    paymentHistory: [
      {
        date: "18 Jun 2025",
        amount: 5000,
        mode: "NEFT",
        reference: "TXN70125",
      },
    ],

    notes: [
      {
        message: "Advance payment received.",
        date: "18 Jun 2025",
      },
    ],

    attachments: [],
    reminders: [],
    timeline: [
      {
        title: "Advance Payment Received",
        description: "₹5,000 payment recorded.",
        date: "18 Jun 2025",
        time: "01:30 PM",
        type: "primary",
      },
      {
        title: "Invoice Created",
        description: "Supplier invoice generated.",
        date: "12 Jun 2025",
        time: "11:30 AM",
        type: "primary",
      },
    ],
  },
  {
    id: 11,
    type: "Resident",
    name: "Karan Mehta",
    flat: "G-401",
    apartment: "Green View Apartment",
    category: "Maintenance Charges",
    billingPeriod: "Jun 2025",
    invoice: "INV-2025-047",
    invoiceDate: "05 Jun 2025",
    dueDate: "31 Jul 2025",
    days: 0,
    amount: 14000,
    paidAmount: 0,
    outstandingAmount: 14000,
    status: "Not Yet Due",

    description: "Maintenance Charges - Jun 2025",
    invoiceType: "Maintenance Charges",
    createdBy: "Rahul Mehta",
    createdOn: "05 Jun 2025 09:30 AM",

    mobile: "9876543216",
    email: "karan.mehta@gmail.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [],

    timeline: [
      {
        title: "Invoice Created",
        description: "Invoice generated successfully.",
        date: "05 Jun 2025",
        time: "09:30 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 12,
    type: "Vendor",
    name: "Elite Pest Control",
    flat: "-",
    apartment: "Green View Apartment",
    category: "Pest Control",
    billingPeriod: "Apr 2025",
    invoice: "INV-2025-054",
    invoiceDate: "20 Apr 2025",
    dueDate: "10 May 2025",
    days: 43,
    amount: 9600,
    paidAmount: 0,
    outstandingAmount: 9600,
    status: "Overdue",

    description: "Monthly Pest Control Service",
    invoiceType: "Vendor Invoice",
    createdBy: "Admin",
    createdOn: "20 Apr 2025 10:45 AM",

    mobile: "9898123456",
    email: "support@elitepest.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [
      {
        type: "Email Reminder",
        by: "Admin",
        date: "08 May 2025",
        time: "10:15 AM",
      },
    ],

    timeline: [
      {
        title: "Invoice Overdue",
        description: "Invoice overdue by 43 days.",
        date: "11 May 2025",
        time: "09:00 AM",
        type: "danger",
      },
      {
        title: "Reminder Sent",
        description: "Reminder email sent.",
        date: "08 May 2025",
        time: "10:15 AM",
        type: "warning",
      },
      {
        title: "Invoice Created",
        description: "Vendor invoice generated.",
        date: "20 Apr 2025",
        time: "10:45 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 13,
    type: "Resident",
    name: "Sneha Patil",
    flat: "H-102",
    apartment: "Green View Apartment",
    category: "Maintenance Charges",
    billingPeriod: "May 2025",
    invoice: "INV-2025-048",
    invoiceDate: "02 May 2025",
    dueDate: "18 Jun 2025",
    days: 14,
    amount: 12100,
    paidAmount: 5000,
    outstandingAmount: 7100,
    status: "Due Soon",

    description: "Maintenance Charges - May 2025",
    invoiceType: "Maintenance Charges",
    createdBy: "Rahul Mehta",
    createdOn: "02 May 2025 11:15 AM",

    mobile: "9876543217",
    email: "sneha.patil@gmail.com",

    paymentStatus: "Partially Paid",

    paymentHistory: [
      {
        date: "15 May 2025",
        amount: 5000,
        mode: "UPI",
        reference: "TXN81045",
      },
    ],

    notes: [],
    attachments: [],
    reminders: [],

    timeline: [
      {
        title: "Partial Payment Received",
        description: "₹5,000 payment received.",
        date: "15 May 2025",
        time: "03:45 PM",
        type: "primary",
      },
      {
        title: "Invoice Created",
        description: "Invoice generated.",
        date: "02 May 2025",
        time: "11:15 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 14,
    type: "Supplier",
    name: "Green Garden Services",
    flat: "-",
    apartment: "Green View Apartment",
    category: "Gardening",
    billingPeriod: "Jun 2025",
    invoice: "INV-2025-055",
    invoiceDate: "18 Jun 2025",
    dueDate: "18 Aug 2025",
    days: 0,
    amount: 17500,
    paidAmount: 0,
    outstandingAmount: 17500,
    status: "Not Yet Due",

    description: "Garden Maintenance Charges",
    invoiceType: "Supplier Invoice",
    createdBy: "Admin",
    createdOn: "18 Jun 2025 09:45 AM",

    mobile: "9988112233",
    email: "info@greengarden.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [],

    timeline: [
      {
        title: "Invoice Created",
        description: "Supplier invoice generated.",
        date: "18 Jun 2025",
        time: "09:45 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 15,
    type: "Resident",
    name: "Vikas Deshmukh",
    flat: "I-503",
    apartment: "Green View Apartment",
    category: "Maintenance Charges",
    billingPeriod: "Apr 2025",
    invoice: "INV-2025-049",
    invoiceDate: "01 Apr 2025",
    dueDate: "14 Apr 2025",
    days: 40,
    amount: 11950,
    paidAmount: 0,
    outstandingAmount: 11950,
    status: "Overdue",

    description: "Maintenance Charges - Apr 2025",
    invoiceType: "Maintenance Charges",
    createdBy: "Rahul Mehta",
    createdOn: "01 Apr 2025 09:20 AM",

    mobile: "9876543218",
    email: "vikas.deshmukh@gmail.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [
      {
        type: "SMS Reminder",
        by: "Admin",
        date: "12 Apr 2025",
        time: "04:30 PM",
      },
    ],

    timeline: [
      {
        title: "Invoice Overdue",
        description: "Invoice overdue by 40 days.",
        date: "15 Apr 2025",
        time: "09:00 AM",
        type: "danger",
      },
      {
        title: "Reminder Sent",
        description: "SMS reminder sent to resident.",
        date: "12 Apr 2025",
        time: "04:30 PM",
        type: "warning",
      },
      {
        title: "Invoice Created",
        description: "Invoice generated successfully.",
        date: "01 Apr 2025",
        time: "09:20 AM",
        type: "primary",
      },
    ],
  },
  {
    id: 16,
    type: "Vendor",
    name: "Metro Fire Safety",
    flat: "-",
    apartment: "Green View Apartment",
    category: "Fire Safety",
    billingPeriod: "Jun 2025",
    invoice: "INV-2025-056",
    invoiceDate: "25 Jun 2025",
    dueDate: "30 Jul 2025",
    days: 5,
    amount: 42000,
    paidAmount: 15000,
    outstandingAmount: 27000,
    status: "Due Soon",

    description: "Fire Safety Equipment Maintenance",
    invoiceType: "Vendor Invoice",
    createdBy: "Admin",
    createdOn: "25 Jun 2025 10:20 AM",

    mobile: "9811122233",
    email: "billing@metrofire.com",

    paymentStatus: "Partially Paid",

    paymentHistory: [
      {
        date: "28 Jun 2025",
        amount: 15000,
        mode: "Bank Transfer",
        reference: "TXN92001",
      },
    ],

    notes: [],
    attachments: [],
    reminders: [],

    timeline: [
      {
        title: "Partial Payment Received",
        description: "₹15,000 payment received.",
        date: "28 Jun 2025",
        time: "03:15 PM",
        type: "primary",
      },
      {
        title: "Invoice Created",
        description: "Vendor invoice generated.",
        date: "25 Jun 2025",
        time: "10:20 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 17,
    type: "Resident",
    name: "Anjali Singh",
    flat: "J-204",
    apartment: "Green View Apartment",
    category: "Maintenance Charges",
    billingPeriod: "Jul 2025",
    invoice: "INV-2025-057",
    invoiceDate: "01 Jul 2025",
    dueDate: "30 Aug 2025",
    days: 0,
    amount: 13000,
    paidAmount: 0,
    outstandingAmount: 13000,
    status: "Not Yet Due",

    description: "Maintenance Charges - Jul 2025",
    invoiceType: "Maintenance Charges",
    createdBy: "Rahul Mehta",
    createdOn: "01 Jul 2025 09:30 AM",

    mobile: "9876543219",
    email: "anjali.singh@gmail.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [],

    timeline: [
      {
        title: "Invoice Created",
        description: "Invoice generated successfully.",
        date: "01 Jul 2025",
        time: "09:30 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 18,
    type: "Supplier",
    name: "City Lift Services",
    flat: "-",
    apartment: "Green View Apartment",
    category: "Lift Maintenance",
    billingPeriod: "Apr 2025",
    invoice: "INV-2025-058",
    invoiceDate: "08 Apr 2025",
    dueDate: "28 Apr 2025",
    days: 55,
    amount: 38000,
    paidAmount: 0,
    outstandingAmount: 38000,
    status: "Overdue",

    description: "Lift Maintenance Services",
    invoiceType: "Supplier Invoice",
    createdBy: "Admin",
    createdOn: "08 Apr 2025 11:00 AM",

    mobile: "9899001122",
    email: "accounts@citylift.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [
      {
        type: "Email Reminder",
        by: "Admin",
        date: "25 Apr 2025",
        time: "11:30 AM",
      },
    ],

    timeline: [
      {
        title: "Invoice Overdue",
        description: "Invoice overdue by 55 days.",
        date: "29 Apr 2025",
        time: "09:00 AM",
        type: "danger",
      },
      {
        title: "Reminder Sent",
        description: "Payment reminder sent.",
        date: "25 Apr 2025",
        time: "11:30 AM",
        type: "warning",
      },
      {
        title: "Invoice Created",
        description: "Supplier invoice generated.",
        date: "08 Apr 2025",
        time: "11:00 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 19,
    type: "Resident",
    name: "Pooja More",
    flat: "K-305",
    apartment: "Green View Apartment",
    category: "Maintenance Charges",
    billingPeriod: "Jun 2025",
    invoice: "INV-2025-059",
    invoiceDate: "05 Jun 2025",
    dueDate: "25 Jul 2025",
    days: 9,
    amount: 12650,
    paidAmount: 2000,
    outstandingAmount: 10650,
    status: "Due Soon",

    description: "Maintenance Charges - Jun 2025",
    invoiceType: "Maintenance Charges",
    createdBy: "Rahul Mehta",
    createdOn: "05 Jun 2025 10:10 AM",

    mobile: "9876543220",
    email: "pooja.more@gmail.com",

    paymentStatus: "Partially Paid",

    paymentHistory: [
      {
        date: "10 Jun 2025",
        amount: 2000,
        mode: "UPI",
        reference: "TXN94021",
      },
    ],

    notes: [],
    attachments: [],
    reminders: [],

    timeline: [
      {
        title: "Partial Payment Received",
        description: "₹2,000 payment received.",
        date: "10 Jun 2025",
        time: "02:30 PM",
        type: "primary",
      },
      {
        title: "Invoice Created",
        description: "Invoice generated successfully.",
        date: "05 Jun 2025",
        time: "10:10 AM",
        type: "primary",
      },
    ],
  },

  {
    id: 20,
    type: "Vendor",
    name: "Tech CCTV Solutions",
    flat: "-",
    apartment: "Green View Apartment",
    category: "CCTV Maintenance",
    billingPeriod: "Jun 2025",
    invoice: "INV-2025-060",
    invoiceDate: "20 Jun 2025",
    dueDate: "25 Aug 2025",
    days: 0,
    amount: 26750,
    paidAmount: 0,
    outstandingAmount: 26750,
    status: "Not Yet Due",

    description: "CCTV Annual Maintenance Contract",
    invoiceType: "Vendor Invoice",
    createdBy: "Admin",
    createdOn: "20 Jun 2025 09:40 AM",

    mobile: "9822334455",
    email: "support@techcctv.com",

    paymentStatus: "Pending",

    paymentHistory: [],
    notes: [],
    attachments: [],
    reminders: [],

    timeline: [
      {
        title: "Invoice Created",
        description: "Vendor invoice generated.",
        date: "20 Jun 2025",
        time: "09:40 AM",
        type: "primary",
      },
    ],
  },
];
