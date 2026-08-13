import Link from "next/link";
import { navigation } from "@/config/navigation";
import { business } from "@/config/business";

export function Footer() {
  return (
    <footer className="border-t border-[#432B30] bg-neutral-950 text-[#D0C4BE]">
      <div className="container grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-[#FFF9F4]">{business.name}</p>
          <p className="mt-3 text-sm leading-relaxed">{business.tagline}</p>
          <p className="mt-4 text-sm">
            <a href={`tel:${business.phone}`} className="hover:text-accent-400">
              {business.phone}
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-[#FFF9F4]">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navigation.services.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-[#FFF9F4]">Locations</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navigation.cities.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-[#FFF9F4]">Company</h2>
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

      <div className="border-t border-[#432B30] py-6">
        <div className="container text-center text-sm">
          © {new Date().getFullYear()} {business.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
