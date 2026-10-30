import { Section } from "@/components/ui/Section";
import { priceFactors } from "@/config/home-content";

export function EstimateFactors() {
  return (
    <Section id="estimate-factors" ariaLabel="What shapes your estimate">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">Pricing</p>
      <h2 id="estimate-factors-heading" className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-brand-950 md:text-4xl">
        What shapes your estimate?
      </h2>
      <p className="mt-3 max-w-2xl text-neutral-600">
        A photo starts the conversation. The written figure follows a measurement of the opening you
        actually have — not a single rate for every Raipur balcony.
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {priceFactors.map((factor) => (
          <li key={factor.title} className="border-l-2 border-accent-500 pl-5">
            <p className="font-display text-lg font-semibold text-brand-950">{factor.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">{factor.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
