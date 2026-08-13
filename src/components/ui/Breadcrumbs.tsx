import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-neutral-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {index > 0 && (
                <span aria-hidden="true" className="text-neutral-400">
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span aria-current={isLast ? "page" : undefined} className="font-medium text-neutral-900">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-brand-700 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
