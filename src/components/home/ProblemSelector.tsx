import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { problemCategories } from "@/config/home-content";

export function ProblemSelector() {
  return (
    <Section id="find-solution" ariaLabel="Choose by problem">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900">
          What do you want the safety solution to solve?
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-neutral-600">
          Choosing by the problem is faster than comparing dozens of product names.
          Pick the closest need now — the exact mesh, cable, spacing, and fixing
          can be confirmed after measurement.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {problemCategories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card"
          >
            <h3 className="text-xl font-semibold text-neutral-900">{cat.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {cat.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cat.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
