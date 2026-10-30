import { Section } from "@/components/ui/Section";
import { materialGrades } from "@/config/home-content";

export function MaterialsHonest() {
  return (
    <Section id="materials" className="bg-neutral-50" ariaLabel="Materials we are willing to name">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">Materials</p>
      <h2 id="materials-heading" className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-brand-950 md:text-4xl">
        What we are willing to name
      </h2>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Warranty length is stated on the quote for that job. We do not print fake year-counts or
        “99% happy” claims. Grades are written down.
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {materialGrades.map((item) => (
          <li key={item.grade} className="bg-white p-6 ring-1 ring-neutral-200">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-600">{item.grade}</p>
            <p className="mt-2 font-display text-xl font-semibold text-brand-950">{item.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">{item.note}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
