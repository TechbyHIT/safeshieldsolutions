import type { ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

export function Section({ children, className = "", id, ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-12 md:py-16 lg:py-20 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
