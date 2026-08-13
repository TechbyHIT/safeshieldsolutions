import type { ExploreMoreIconId } from "@/lib/explore-more-types";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function paths(d: string) {
  return <path d={d} />;
}

export function ExploreMoreIcon({ id }: { id: ExploreMoreIconId }) {
  switch (id) {
    case "service":
      return (
        <svg {...iconProps}>
          {paths("M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4")}
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "related":
      return (
        <svg {...iconProps}>
          {paths("M8 12h8M12 8v8M4 6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2")}
        </svg>
      );
    case "area":
      return (
        <svg {...iconProps}>
          {paths("M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V10z")}
        </svg>
      );
    case "city":
      return (
        <svg {...iconProps}>
          {paths("M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6")}
        </svg>
      );
    case "state":
    case "district":
      return (
        <svg {...iconProps}>
          {paths("M4 6l8-4 8 4v12l-8 4-8-4V6zM12 2v20M4 6l8 4 8-4")}
        </svg>
      );
    case "search":
      return (
        <svg {...iconProps}>
          <circle cx="11" cy="11" r="7" />
          {paths("M20 20l-3-3")}
        </svg>
      );
    case "price":
      return (
        <svg {...iconProps}>
          {paths("M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6")}
        </svg>
      );
    case "buying":
    case "install":
      return (
        <svg {...iconProps}>
          {paths("M4 19h16M6 16l6-12 6 12M10 16h4")}
        </svg>
      );
    case "application":
      return (
        <svg {...iconProps}>
          {paths("M4 4h16v16H4zM8 8h8M8 12h8M8 16h5")}
        </svg>
      );
    case "building":
      return (
        <svg {...iconProps}>
          {paths("M6 22V4l6-2 6 2v18M10 22v-6h4v6")}
        </svg>
      );
    case "material":
      return (
        <svg {...iconProps}>
          {paths("M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5")}
        </svg>
      );
    case "maintenance":
    case "repair":
      return (
        <svg {...iconProps}>
          {paths("M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z")}
        </svg>
      );
    case "faq":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          {paths("M9.5 9a2.5 2.5 0 115 0c0 2-2.5 2-2.5 4M12 17h.01")}
        </svg>
      );
    case "project":
    case "gallery":
      return (
        <svg {...iconProps}>
          {paths("M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 11l3 3 5-6")}
        </svg>
      );
    case "blog":
      return (
        <svg {...iconProps}>
          {paths("M4 4h16v16H4zM8 8h8M8 12h8M8 16h6")}
        </svg>
      );
    case "landmark":
      return (
        <svg {...iconProps}>
          {paths("M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7l3-7z")}
        </svg>
      );
    case "apartment":
      return (
        <svg {...iconProps}>
          {paths("M4 21V9l8-5 8 5v12M9 21v-6h6v6")}
        </svg>
      );
    case "commercial":
    case "it-park":
      return (
        <svg {...iconProps}>
          {paths("M3 21h18M6 21V5h5v16M13 21V9h5v12")}
        </svg>
      );
    case "product":
      return (
        <svg {...iconProps}>
          {paths("M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8")}
        </svg>
      );
    case "review":
      return (
        <svg {...iconProps}>
          {paths("M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 21l2.3-7-6-4.6h7.6L12 2z")}
        </svg>
      );
    case "contact":
    case "inspection":
      return (
        <svg {...iconProps}>
          {paths("M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z")}
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
