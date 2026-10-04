/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "standalone",
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Hero-grade variants up to 2K so balcony photos stay sharp.
    deviceSizes: [360, 640, 768, 1080, 1280, 1920, 2560],
    imageSizes: [32, 64, 96, 128, 256],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  outputFileTracingIncludes: {
    "*": [
      "./node_modules/next/dist/server/**/*",
      "./node_modules/next/dist/shared/**/*",
    ],
  },
  // Programmatic routes use empty generateStaticParams — do not pre-render 730k URLs.
  staticPageGenerationTimeout: 60,
  logging: {
    fetches: { fullUrl: false },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Site-Brand", value: "SafeShield-Solutions" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400",
          },
        ],
      },
      {
        source: "/sitemap-:id.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    const aliases = [
      ["/safety-nets", "/services/safety-nets"],
      ["/invisible-grills", "/services/invisible-grills"],
      ["/pigeon-nets", "/services/pigeon-safety-nets"],
      ["/pigeon-safety-nets", "/services/pigeon-safety-nets"],
      ["/balcony-safety-nets", "/services/balcony-safety-nets"],
      ["/child-safety-nets", "/services/child-safety-nets"],
      ["/pet-safety-nets", "/services/pet-safety-nets"],
      ["/terrace-safety-nets", "/services/terrace-safety-nets"],
      ["/balcony-invisible-grills", "/services/balcony-invisible-grills"],
      ["/window-invisible-grills", "/services/window-invisible-grills"],
      ["/sports-nets", "/services/sports-nets"],
      ["/industrial-safety-nets", "/services/industrial-safety-nets"],
    ];
    return [
      {
        source: "/sitemaps/sitemap-:id.xml",
        destination: "/sitemap-:id.xml",
        permanent: true,
      },
      {
        source: "/chhattisgarh/:city/area/:area/:service",
        destination: "/chhattisgarh/:city/areas/:area/:service",
        permanent: true,
      },
      ...aliases.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
