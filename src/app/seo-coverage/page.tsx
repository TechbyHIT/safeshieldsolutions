import type { Metadata } from "next";
import { CG_CORE_SERVICE_SLUGS, CG_PRIORITY_PLACES } from "@/data/cg-local-seo";
import { CG_DISTRICTS, CG_LOCALITIES, hierarchySummary } from "@/data/cg-hierarchy";
import { weakInternalLinks } from "@/lib/seo-graph";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Chhattisgarh SEO coverage",
  description: "Internal count of districts, cities, localities, and indexable pages.",
  path: "/seo-coverage",
  robots: { index: false, follow: false },
});

export default function SeoCoveragePage() {
  const summary = hierarchySummary();
  const indexableServices = summary.cities * CG_CORE_SERVICE_SLUGS.length;
  const indexableLocalityServices = CG_LOCALITIES.filter((area) => area.indexable).length * 3;

  return (
    <main className="container py-16">
      <h1 className="text-3xl font-bold">Chhattisgarh coverage</h1>
      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <Stat label="Districts" value={summary.districts} />
        <Stat label="Active cities" value={summary.cities} />
        <Stat label="Localities with copy" value={summary.localities} />
        <Stat label="Indexable localities" value={summary.indexableLocalities} />
        <Stat label="City × service pages" value={indexableServices} />
        <Stat label="Locality × primary service pages" value={indexableLocalityServices} />
        <Stat label="Catalogue services on city pages" value={CG_CORE_SERVICE_SLUGS.length} />
        <Stat label="Cities in the tree" value={CG_PRIORITY_PLACES.length} />
      </dl>
      <h2 className="mt-10 text-xl font-bold">Districts</h2>
      <ul className="mt-3 list-disc pl-5">
        {CG_DISTRICTS.map((district) => (
          <li key={district.slug}>{district.name}</li>
        ))}
      </ul>
      <h2 className="mt-10 text-xl font-bold">Thin internal links</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
        {weakInternalLinks().slice(0, 12).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-neutral-200 p-4">
      <dt className="text-sm text-neutral-500">{label}</dt>
      <dd className="text-2xl font-bold">{value}</dd>
    </div>
  );
}
