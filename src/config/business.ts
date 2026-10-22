export const business = {
  name: "SafeShield Solutions",
  legalName: "SafeShield Solutions",
  tagline: "Premium invisible grills, safety nets & home protection across Chhattisgarh",
  description:
    "Professional installation of invisible grills, safety nets, mosquito nets, cloth hangers, sports nets, zip screens, mesh doors, cricket box grass, and bird protection solutions for apartments, villas, and commercial properties.",
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
