import { Section } from "@/components/ui/Section";
import { designComparisons } from "@/config/home-content";

export function CompareSystems() {
  return (
    <Section id="compare-systems" className="bg-white" ariaLabel="Compare safety systems">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">Side by side</p>
      <h2
        id="compare-systems-heading"
        className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-brand-950 md:text-4xl"
      >
        Invisible grill vs safety net vs pigeon net
      </h2>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Each system solves a different problem. Use this table to shortlist one before the site
        visit, then we confirm it against the actual opening.
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <caption className="sr-only">Comparison of balcony and window safety systems</caption>
          <thead className="bg-brand-950 text-white">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">System</th>
              <th scope="col" className="px-4 py-3 font-semibold">Best for</th>
              <th scope="col" className="px-4 py-3 font-semibold">How it looks</th>
              <th scope="col" className="px-4 py-3 font-semibold">Material</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {designComparisons.map((row) => (
              <tr key={row.title} className="align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-brand-950">{row.title}</th>
                <td className="px-4 py-3 text-neutral-700">{row.use}</td>
                <td className="px-4 py-3 text-neutral-700">{row.look}</td>
                <td className="px-4 py-3 text-neutral-700">{row.material}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
