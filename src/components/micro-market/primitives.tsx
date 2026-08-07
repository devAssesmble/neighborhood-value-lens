import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  action,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel p-5 sm:p-7", className)}>
      <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          {eyebrow ? (
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-1 text-lg font-semibold sm:text-xl">{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "primary" | "gold" | "muted";
}) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "num mt-1.5 text-lg font-semibold",
          tone === "primary" && "text-primary",
          tone === "gold" && "text-gold",
          tone === "muted" && "text-muted-foreground",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function Meter({
  label,
  value,
  suffix = "",
  tone = "primary",
}: {
  label: string;
  value: number;
  suffix?: string;
  tone?: "primary" | "gold";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="num font-semibold">
          {value}
          {suffix}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className={cn("h-full rounded-full", tone === "gold" ? "bg-gold" : "bg-primary")}
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
    </div>
  );
}

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "primary" | "gold";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        tone === "default" && "border-border bg-surface text-muted-foreground",
        tone === "primary" && "border-primary/30 bg-primary/10 text-primary",
        tone === "gold" && "border-gold/30 bg-gold/10 text-gold",
      )}
    >
      {children}
    </span>
  );
}

export function Stars({ score }: { score: number }) {
  const filled = Math.round((score / 100) * 5);
  return (
    <span className="text-gold" aria-label={`${filled} out of 5 stars`}>
      {"★".repeat(filled)}
      <span className="text-muted-foreground">{"☆".repeat(5 - filled)}</span>
    </span>
  );
}
