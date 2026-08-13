import Link from "next/link";
import type { ExploreMoreCardData } from "@/lib/explore-more-types";
import { ExploreMoreIcon } from "./ExploreMoreIcon";
import styles from "./explore-more.module.css";

interface ExploreMoreCardProps {
  card: ExploreMoreCardData;
  defaultOpen?: boolean;
}

export function ExploreMoreCard({ card, defaultOpen = false }: ExploreMoreCardProps) {
  const cardClass = [
    styles.card,
    card.featured ? styles.cardFeatured : "",
    card.variant === "highlight" ? styles.cardHighlight : "",
    card.variant === "cta" ? styles.cardCta : "",
    card.id === "book-inspection" ? styles.cardCtaSticky : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClass} aria-labelledby={`explore-card-${card.id}`}>
      <details className={styles.cardInner} open={defaultOpen}>
        <summary className={styles.summary} aria-expanded={undefined}>
          <div className={styles.cardHead}>
            <span className={styles.iconWrap}>
              <ExploreMoreIcon id={card.icon} />
            </span>
            <div>
              <h3 className={styles.cardHeading} id={`explore-card-${card.id}`}>
                {card.heading}
              </h3>
              <p className={styles.cardDesc}>{card.description}</p>
            </div>
          </div>
          <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden>
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </summary>

        <div className={styles.cardBody}>
          <nav aria-label={card.heading}>
            <ul className={styles.linkList}>
              {card.links.map((link) => (
                <li key={link.href} className={styles.linkItem}>
                  {link.href.startsWith("http") || link.href.startsWith("tel:") ? (
                    <a
                      href={link.href}
                      className={`${styles.link} ${link.isCurrent ? styles.linkCurrent : ""}`}
                      {...(link.href.startsWith("http") ? { rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={`${styles.link} ${link.isCurrent ? styles.linkCurrent : ""}`}
                      aria-current={link.isCurrent ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {(card.viewAll || card.links.length > 0) && (
            <div className={styles.footerRow}>
              <span className={styles.linkCount}>{card.links.length} links</span>
              {card.viewAll ? (
                <Link href={card.viewAll.href} className={`${styles.viewAll} viewAllBtn`}>
                  {card.viewAll.label}
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </details>
    </article>
  );
}
