import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-600 text-white hover:bg-accent-700 shadow-cta focus-visible:ring-accent-500",
  secondary:
    "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500",
  outline:
    "border-2 border-brand-600 text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-500",
  ghost: "text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-500",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type LinkButtonProps = {
  href: string;
  external?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const className = props.className ?? "";
  const classes = `inline-flex items-center justify-center rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external, children } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { children, ...buttonProps } = props;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
