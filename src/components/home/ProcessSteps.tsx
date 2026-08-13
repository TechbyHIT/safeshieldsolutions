import { Section } from "@/components/ui/Section";
import { installSteps } from "@/config/home-content";

export function ProcessSteps() {
  return (
    <Section ariaLabel="Installation process">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Simple installation process
        </p>
        <h2 className="mt-2 text-3xl font-bold text-neutral-900">
          From one photo to a checked fitting
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          The exact steps can vary by opening and access, but the decision should
          always be clear before work starts.
        </p>
      </div>
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {installSteps.map((step) => (
          <li
            key={step.step}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card"
          >
            <span className="text-3xl font-bold text-brand-200">{step.step}</span>
            <h3 className="mt-3 text-lg font-semibold text-neutral-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
