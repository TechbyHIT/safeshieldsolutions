export const publishing = {

  phases: [

    { phase: 1, name: "Core", targetUrls: 5000, description: "Homepage, services, cities, top areas" },

    { phase: 2, name: "City-Service", targetUrls: 15000, description: "Primary city + service combinations" },

    { phase: 3, name: "Area-Service", targetUrls: 25000, description: "High-priority area + service pages" },

    { phase: 4, name: "Authority", targetUrls: 5000, description: "Guides, blog, problem & property pages" },

  ],

  totalTargetUrls: 750_000,

  minWordCount: {

    SERVICE: 800,

    CITY: 600,

    AREA: 700,

    CITY_SERVICE: 900,

    AREA_SERVICE: 20000,

    GUIDE: 1200,

    BLOG: 1000,

  },

  minContentScore: 0.7,

  batchSize: 500,

} as const;



export type PublishingConfig = typeof publishing;

