import { Section } from "@/components/ui/Section";
import { installSteps } from "@/config/home-content";

export function ProcessSteps() {
  return (
    <Section id="how-to-install" className="bg-neutral-50" ariaLabel="Installation process">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">From message to handover</p>
      <h2
        id="how-to-install-heading"
        className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-brand-950 md:text-4xl"
      >
        How to get invisible grills or safety nets installed
      </h2>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Five steps from the first message to handover, whether it is a busy flat in Raipur or a
        terrace in Bhilai.
      </p>

      <ol className="mt-10 space-y-0 divide-y divide-neutral-200 border-y border-neutral-200">
        {installSteps.map((step) => (
          <li key={step.step} className="grid gap-2 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6">
            <span className="font-display text-2xl font-semibold text-accent-600" aria-hidden>
              {step.step}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-brand-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
