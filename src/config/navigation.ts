import { routes } from "./routes";

export const navigation = {
  main: [
    { label: "Home", href: routes.home },
    { label: "Services", href: routes.services },
    { label: "Locations", href: routes.locations },
    { label: "Gallery", href: routes.gallery },
    { label: "Guides", href: routes.guides },
    { label: "Blog", href: routes.blog },
    { label: "About", href: routes.about },
    { label: "FAQ", href: routes.faq },
    { label: "Contact", href: routes.contact },
  ],
  services: [
    { label: "Invisible Grills", href: routes.service("invisible-grills") },
    { label: "Balcony Invisible Grills", href: routes.service("balcony-invisible-grills") },
    { label: "Window Invisible Grills", href: routes.service("window-invisible-grills") },
    { label: "Safety Nets", href: routes.service("safety-nets") },
    { label: "Mosquito Nets", href: routes.service("mosquito-nets") },
    { label: "Cloth Hangers", href: routes.service("cloth-hangers") },
    { label: "Sports Nets", href: routes.service("sports-nets") },
    { label: "Cricket Box Grass", href: routes.service("cricket-box-grass") },
    { label: "Zip Screens", href: routes.service("zip-screens") },
    { label: "Motorized Zip Screens", href: routes.service("motorized-zip-screens") },
    { label: "Mesh Doors", href: routes.service("mesh-doors") },
    { label: "Sliding Mesh Doors", href: routes.service("sliding-mesh-doors") },
    { label: "Bird Spikes", href: routes.service("bird-spikes") },
  ],
  cities: [
    { label: "Chhattisgarh", href: "/chhattisgarh" },
    { label: "Raipur", href: "/chhattisgarh/raipur" },
    { label: "Invisible Grills in Raipur", href: "/chhattisgarh/raipur/invisible-grills" },
    { label: "Safety Nets in Raipur", href: "/chhattisgarh/raipur/safety-nets" },
    { label: "Pigeon Nets in Raipur", href: "/chhattisgarh/raipur/pigeon-safety-nets" },
    { label: "Bird Spikes in Raipur", href: "/chhattisgarh/raipur/bird-spikes" },
  ],
  footer: [
    { label: "FAQ", href: routes.faq },
    { label: "Glossary", href: routes.glossary },
    { label: "HTML Sitemap", href: routes.htmlSitemap },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
} as const;

export type NavigationConfig = typeof navigation;
