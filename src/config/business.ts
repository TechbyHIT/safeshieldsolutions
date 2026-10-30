export const business = {
  name: "SafeShield Solutions",
  legalName: "SafeShield Solutions",
  tagline: "Measurement-led invisible grills and safety nets for Raipur and Chhattisgarh",
  description:
    "SafeShield Solutions surveys and fits invisible grills, balcony safety nets, pigeon nets, bird spikes, cloth hangers, and related home protection across Raipur first, then other served Chhattisgarh towns. Grades are named; quotes follow a site measurement.",
  phone: "+91-8977235565",
  whatsapp: "+918977235565",
  email: "info@safeshieldsolutions.in",
  address: {
    street: "Main Road, A.S. Rao Nagar",
    area: "A.S. Rao Nagar",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500062",
    country: "IN",
  },
  geo: {
    latitude: 17.4849,
    longitude: 78.5418,
  },
  serviceAreas: ["Chhattisgarh"],
  workingHours: {
    weekdays: "9:00 AM – 7:00 PM",
    saturday: "9:00 AM – 6:00 PM",
    sunday: "By appointment",
  },
  social: {
    facebook: "https://facebook.com/safeshieldsolutions",
    instagram: "https://instagram.com/safeshieldsolutions",
    youtube: "https://youtube.com/@safeshieldsolutions",
  },
  trustSignals: {
    warrantyYears: 5,
    freeSurvey: true,
    sameDayQuote: true,
  },
} as const;

export type BusinessConfig = typeof business;
