import type { PageContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { business } from "@/config/business";
import { TableOfContents, sectionAnchorId } from "@/components/content/TableOfContents";

interface PageContentRendererProps {
  content: PageContent;
  h1: string;
  hideH1?: boolean;
}

function BulletList({ items, title }: { items: string[]; title: string }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-neutral-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PageContentRenderer({ content, h1, hideH1 = false }: PageContentRendererProps) {
  return (
    <article>
      {!hideH1 && (
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          {h1}
        </h1>
      )}
      <p className={`prose-content text-lg ${hideH1 ? "mt-0" : "mt-6"}`}>{content.intro}</p>

      <TableOfContents sections={content.sections} faqCount={content.faqs.length} />

      {content.priceGuide && (
        <div className="mt-6 rounded-xl border border-accent-200 bg-accent-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-700">
            Price guide
          </p>
          <p className="mt-2 text-sm text-neutral-700">{content.priceGuide}</p>
        </div>
      )}

      {content.localNotes && (
        <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
          {content.localNotes}
        </p>
      )}

      {content.issuesSolved && content.issuesSolved.length > 0 && (
        <BulletList items={content.issuesSolved} title="Common issues solved" />
      )}

      {content.whereWorksBest && content.whereWorksBest.length > 0 && (
        <BulletList items={content.whereWorksBest} title="Where this works best" />
      )}

      {content.materials && content.materials.length > 0 && (
        <BulletList
          items={content.materials}
          title="Material, strength, and finishing signals"
        />
      )}

      {content.priceFactors && content.priceFactors.length > 0 && (
        <BulletList items={content.priceFactors} title="Estimate and planning factors" />
      )}

      {content.sections.map((section) => {
        const Tag = section.level === 3 ? "h3" : "h2";
        const id = sectionAnchorId(section);
        return (
          <section key={section.id} id={id} className="mt-10 scroll-mt-24">
            <Tag className="text-2xl font-semibold text-neutral-900">
              {section.heading}
            </Tag>
            <div className="prose-content mt-4 whitespace-pre-line">{section.body}</div>
          </section>
        );
      })}

      {content.installSteps && content.installSteps.length > 0 && (
        <section className="mt-10" aria-labelledby="install-process">
          <h2 id="install-process" className="text-2xl font-semibold text-neutral-900">
            Installation process
          </h2>
          <ol className="mt-6 space-y-4">
            {content.installSteps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-xl border border-neutral-200 p-4"
              >
                <span className="text-lg font-bold text-brand-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-900">{step.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {content.maintenance && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Maintenance and long-term performance
          </h2>
          <p className="prose-content mt-4">{content.maintenance}</p>
        </section>
      )}

      {content.faqs.length > 0 && (
        <section className="mt-12 scroll-mt-24" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-semibold text-neutral-900">
            Common questions before booking
            {content.faqs.length > 12 && (
              <span className="ml-2 text-base font-normal text-neutral-500">
                ({content.faqs.length} answers)
              </span>
            )}
          </h2>
          <dl className="mt-6 space-y-4">
            {content.faqs.map((faq, index) => (
              <div
                key={faq.question}
                id={index === 0 ? undefined : `faq-${index}`}
                className="rounded-xl border border-neutral-200 p-5"
              >
                <dt className="font-semibold text-neutral-900">{faq.question}</dt>
                <dd className="prose-content mt-2">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mt-12 rounded-2xl bg-brand-950 px-6 py-10 text-[#FFF9F4] md:px-10">
        <h2 className="text-2xl font-bold">{content.cta.heading}</h2>
        <p className="mt-3 max-w-2xl text-[#D0C4BE]">{content.cta.text}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary" className="bg-accent-500 text-neutral-950 hover:bg-accent-400">
            Send Photo for Estimate
          </Button>
          <Button
            href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
            external
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            WhatsApp Us
          </Button>
          <Button
            href={`tel:${business.phone}`}
            external
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Call {business.phone}
          </Button>
        </div>
      </section>
    </article>
  );
}
