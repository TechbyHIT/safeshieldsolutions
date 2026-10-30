import { Section } from "@/components/ui/Section";
import { whySafeShield } from "@/config/home-content";

export function WhySafeShield() {
  return (
    <Section ariaLabel="Why choose SafeShield Solutions">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">Why SafeShield</p>
      <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-brand-950 md:text-4xl">
        Practical safety for Raipur — without the marketing fog
      </h2>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Competitors often lead with “best”, “15+ years”, and SS316-as-default. We lead with a named
        grade, a measured opening, and locality pages that actually exist.
      </p>

      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {whySafeShield.map((item, index) => (
          <li key={item.title}>
            <span className="font-display text-3xl font-semibold text-brand-200" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-brand-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
