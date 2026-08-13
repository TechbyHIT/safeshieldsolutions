import { Section } from "@/components/ui/Section";
import { priceFactors, designComparisons } from "@/config/home-content";

export function PriceGuide() {
  return (
    <Section id="price-guide" className="bg-neutral-100" ariaLabel="Price guide">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Safety net price guide
          </p>
          <h2 className="mt-2 text-3xl font-bold text-neutral-900">
            How safety net prices are worked out
          </h2>
          <p className="mt-4 text-neutral-600">
            Netting is often measured by fitted area, while some grills, spikes,
            frames, and utility products use a different price unit. A reliable
            quote should identify the unit and the exact scope — not only show
            the lowest number.
          </p>
          <dl className="mt-8 space-y-5">
            {priceFactors.map((factor) => (
              <div key={factor.title}>
                <dt className="font-semibold text-neutral-900">{factor.title}</dt>
                <dd className="mt-1 text-sm text-neutral-600">{factor.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="text-xl font-bold text-neutral-900">
            Compare the look and the job it needs to do
          </h3>
          <div className="mt-6 space-y-4">
            {designComparisons.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-neutral-200 bg-white p-5"
              >
                <h4 className="font-semibold text-neutral-900">{item.title}</h4>
                <p className="mt-1 text-sm text-neutral-600">
                  <span className="font-medium text-neutral-800">Best for:</span>{" "}
                  {item.use}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  <span className="font-medium text-neutral-800">Look:</span>{" "}
                  {item.look}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-600">
            Ask for the material, mesh or cable size, anchor method, included
            installation, minimum job charge, warranty terms, and total before
            confirming a price.
          </p>
        </div>
      </div>
    </Section>
  );
}
