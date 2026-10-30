const entries = [
  { href: "#compare-systems", label: "Compare systems" },
  { href: "#estimate-factors", label: "What sets the price" },
  { href: "#materials", label: "SS304 vs SS316" },
  { href: "#how-to-install", label: "Installation steps" },
  { href: "#faq", label: "FAQs" },
];

export function HomeContents() {
  return (
    <nav aria-label="On this page" className="border-b border-neutral-200 bg-white">
      <div className="container flex flex-wrap items-center gap-x-5 gap-y-2 py-4 text-sm">
        <span className="font-semibold text-brand-950">On this page:</span>
        {entries.map((entry) => (
          <a key={entry.href} href={entry.href} className="text-brand-700 hover:underline">
            {entry.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
