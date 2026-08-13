import type { ExploreMoreSectionData } from "@/lib/explore-more-types";
import { ExploreMoreCard } from "./ExploreMoreCard";
import styles from "./explore-more.module.css";

interface ExploreMoreSectionProps {
  data: ExploreMoreSectionData;
}

export function ExploreMoreSection({ data }: ExploreMoreSectionProps) {
  if (data.cards.length === 0) return null;

  return (
    <section
      className={styles.exploreMore}
      aria-labelledby="explore-more-title"
      data-page-key={data.pageKey}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="explore-more-title" className={styles.title}>
            {data.title}
          </h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </header>

        <div className={styles.grid} role="list">
          {data.cards.map((card, index) => (
            <div key={card.id} role="listitem">
              <ExploreMoreCard card={card} defaultOpen={index < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
