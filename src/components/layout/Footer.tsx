import Link from "next/link";
import { navigation } from "@/config/navigation";
import { business } from "@/config/business";
import { raipurLocalityLinks } from "@/config/raipur-seo";

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
          <p className="font-semibold text-white">Services</p>
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
          <p className="font-semibold text-white">Raipur</p>
          <ul className="mt-4 space-y-2 text-sm">
            {navigation.cities.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-shield-400">
                  {item.label}
                </Link>
              </li>
            ))}
            {raipurLocalityLinks()
              .filter((area) => area.slug !== "raipur")
              .slice(0, 8)
              .map((area) => (
                <li key={area.href}>
                  <Link href={area.href} className="hover:text-shield-400">
                    {area.name}
                  </Link>
                </li>
              ))}
            <li>
              <Link href="/chhattisgarh/raipur" className="hover:text-shield-400">
                All Raipur areas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Company</p>
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
