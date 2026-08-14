import Link from "next/link";
import { navigation } from "@/config/navigation";
import { business } from "@/config/business";

export function Footer() {
  return (
    <footer className="border-t border-brand-800 bg-brand-950 text-neutral-300">
      <div className="container grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{business.name}</p>
          <p className="mt-3 text-sm leading-relaxed">{business.tagline}</p>
          <p className="mt-4 text-sm">
            <a href={`tel:${business.phone}`} className="hover:text-accent-400">
              {business.phone}
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-white">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navigation.services.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-shield-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-white">Locations</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navigation.cities.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-shield-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-white">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navigation.footer.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800 py-6">
        <div className="container text-center text-sm">
          © {new Date().getFullYear()} {business.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
