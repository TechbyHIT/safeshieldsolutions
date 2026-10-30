import { Section } from "@/components/ui/Section";
import { openingSteps } from "@/config/home-content";

export function OpeningDecides() {
  return (
    <Section className="bg-brand-950 text-white" ariaLabel="How the opening decides the system">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-shield-300">How we work</p>
      <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
        The opening decides the system
      </h2>
      <p className="mt-3 max-w-2xl text-neutral-300">
        A straight balcony, a duct with a pipe, and a practice bay are not the same job. We measure
        the edges that can take a hook or an anchor, then choose mesh, cable, or both.
      </p>

      <ol className="mt-12 grid gap-10 md:grid-cols-3">
        {openingSteps.map((step) => (
          <li key={step.step} className="relative">
            <span className="font-display text-5xl font-semibold text-white/15" aria-hidden>
              {step.step}
            </span>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
