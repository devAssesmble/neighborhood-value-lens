import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  microMarkets,
  microMarketScore,
  formulaWeights,
  type MicroMarket,
} from "@/lib/micro-market-data";
import { Section, Stat, Meter, Pill, Stars } from "@/components/micro-market/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CMNHousing Micro Market Intelligence Engine" },
      {
        name: "description",
        content:
          "Neighborhood-level property valuation: verified registrations, AI comparables, demand, infrastructure and a Smart Bargain Range.",
      },
      { property: "og:title", content: "CMNHousing Micro Market Intelligence Engine" },
      {
        property: "og:description",
        content:
          "Street-level True Value, confidence score and Smart Bargain Range for every micro market.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MicroMarketEngine,
});

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function MicroMarketEngine() {
  const [slug, setSlug] = useState(microMarkets[0]!.slug);
  const market = useMemo(
    () => microMarkets.find((m) => m.slug === slug) ?? microMarkets[0]!,
    [slug],
  );
  const score = useMemo(() => microMarketScore(market), [market]);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
      <Hero market={market} slug={slug} onSelect={setSlug} total={score.total} />

      <div className="mt-6 grid gap-6">
        <MicroMarketCard market={market} infra={score.infra} />
        <HealthCard market={market} />
        <PriceIntelligence market={market} />

        <div className="grid gap-6 lg:grid-cols-2">
          <TransactionIntelligence market={market} />
          <BuyerDemand market={market} />
          <PropertyMix market={market} />
          <Infrastructure market={market} infra={score.infra} />
        </div>

        <FutureGrowth market={market} />
        <Comparables market={market} />

        <div className="grid gap-6 lg:grid-cols-2">
          <ConfidenceEngine market={market} />
          <MarketTrend market={market} />
        </div>

        <SmartBargain market={market} />
        <Formula market={market} parts={score.parts} total={score.total} />
        <Advantage />
      </div>
    </main>
  );
}

function Hero({
  market,
  slug,
  onSelect,
  total,
}: {
  market: MicroMarket;
  slug: string;
  onSelect: (s: string) => void;
  total: number;
}) {
  return (
    <header className="panel gradient-hero relative overflow-hidden p-6 sm:p-9">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="primary">CMNHousing</Pill>
          <Pill>Micro Market Intelligence Engine</Pill>
        </div>
        <h1 className="mt-4 max-w-3xl text-2xl font-semibold leading-tight sm:text-4xl">
          Valuation at the <span className="text-value">neighborhood level</span>, not the city
          average.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          A micro market is a cluster of nearby localities that share prices, demand and buyer
          behaviour. We compare your property only inside its own micro market — {market.nearby.length + 1}{" "}
          localities within {market.radiusKm} km.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {microMarkets.map((m) => (
            <button
              key={m.slug}
              onClick={() => onSelect(m.slug)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                m.slug === slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground hover:bg-surface-2"
              }`}
            >
              {m.primaryLocality}
              <span className="ml-2 opacity-60">{m.city}</span>
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-4">
          <Stat label="Micro Market Score" value={`${total}/100`} tone="primary" />
          <Stat label="Average Price" value={`${inr(market.price.average)} / sqft`} />
          <Stat label="Verified Registrations (12M)" value={market.transactions.m12} />
          <Stat label="AI Confidence" value={`${market.confidence.score}%`} tone="gold" />
        </div>
      </div>
    </header>
  );
}

function MicroMarketCard({ market, infra }: { market: MicroMarket; infra: number }) {
  return (
    <Section
      eyebrow="📍 CMNHousing Micro Market"
      title={market.name}
      action={<Pill tone="gold">Last Updated · Today</Pill>}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Primary Locality
          </p>
          <p className="mt-1 text-xl font-semibold">{market.primaryLocality}</p>
          <p className="mt-5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Nearby Comparable Areas
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {market.nearby.map((n) => (
              <Pill key={n}>{n}</Pill>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Stat label="Market Radius" value={`${market.radiusKm} km`} />
            <Stat label="Population" value={`${market.populationLakhs} Lakhs`} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Stat label="Properties Analysed" value={market.propertiesAnalysed.toLocaleString("en-IN")} />
          <Stat label="Recent Transactions" value={market.recentTransactions} />
          <Stat label="Projects" value={market.projects} />
          <Stat label="Builders" value={market.builders} />
          <div className="rounded-xl border border-border bg-surface px-4 py-3 sm:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
              <Meter label="Demand Score" value={market.demandScore} suffix="/100" />
              <Meter label="Supply Score" value={market.supplyScore} suffix="/100" tone="gold" />
              <Meter label="Market Stability" value={market.stability} suffix="%" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Weighted infrastructure index for this micro market: {infra}/100
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function HealthCard({ market }: { market: MicroMarket }) {
  const h = market.health;
  return (
    <Section
      eyebrow="AI Micro Market Score"
      title="Micro Market Health"
      action={
        <div className="flex items-center gap-3">
          <Stars score={h.score} />
          <span className="num text-lg font-semibold">{h.score}/100</span>
        </div>
      }
    >
      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Demand" value={h.demand} tone="primary" />
        <Stat label="Supply" value={h.supply} />
        <Stat label="Growth Potential" value={h.growth} tone="primary" />
        <Stat label="Investment Grade" value={h.grade} tone="gold" />
        <Stat label="Rental Yield" value={h.rentalYield} />
        <Stat label="Capital Appreciation" value={h.appreciation} tone="primary" />
        <Stat label="Liquidity" value={h.liquidity} />
        <Stat label="Risk Level" value={h.risk} tone="gold" />
      </div>
    </Section>
  );
}

function PriceIntelligence({ market }: { market: MicroMarket }) {
  const p = market.price;
  const bands = [
    { label: "Low Range", value: p.low },
    { label: "Fair Value", value: p.fair },
    { label: "Premium", value: p.premium },
    { label: "Luxury", value: p.luxury },
  ];
  const span = p.luxury - p.low;
  return (
    <Section eyebrow="Price Intelligence" title="Micro Market Price Bands">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="rounded-xl border border-primary/25 bg-primary/8 p-5">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Average Price
          </p>
          <p className="num mt-2 text-3xl font-semibold text-value">{inr(p.average)}</p>
          <p className="mt-1 text-sm text-muted-foreground">per sqft · {market.primaryLocality}</p>
        </div>
        <div>
          <div className="grid gap-3 sm:grid-cols-4">
            {bands.map((b) => (
              <Stat key={b.label} label={b.label} value={inr(b.value)} />
            ))}
          </div>
          <div className="relative mt-6 h-2 rounded-full bg-surface-2">
            <div
              className="absolute h-2 rounded-full bg-primary/60"
              style={{
                left: `${((p.fair - p.low) / span) * 100}%`,
                width: `${((p.premium - p.fair) / span) * 100}%`,
              }}
            />
            <div
              className="absolute -top-1 h-4 w-1 rounded-full bg-gold"
              style={{ left: `${((p.average - p.low) / span) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span className="num">{inr(p.low)}</span>
            <span className="num">{inr(p.luxury)}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function TransactionIntelligence({ market }: { market: MicroMarket }) {
  const t = market.transactions;
  return (
    <Section eyebrow="Transaction Intelligence" title="Verified Sale Registrations">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Last 30 Days" value={t.d30} tone="primary" />
        <Stat label="Last 90 Days" value={t.d90} />
        <Stat label="Last 12 Months" value={t.m12} />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Stat label="Average Deal Size" value={t.avgDeal} />
        <Stat label="Highest Sale" value={t.highest} tone="gold" />
        <Stat label="Lowest Sale" value={t.lowest} tone="muted" />
      </div>
    </Section>
  );
}

function BuyerDemand({ market }: { market: MicroMarket }) {
  const d = market.demand;
  return (
    <Section eyebrow="Buyer Demand" title="Live Enquiry Signals">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Enquiries Today" value={d.today} tone="primary" />
        <Stat label="This Week" value={d.week} />
        <Stat label="This Month" value={d.month.toLocaleString("en-IN")} />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Stat label="Saved Searches" value={d.savedSearches.toLocaleString("en-IN")} />
        <Stat label="Average Days on Market" value={`${d.daysOnMarket} Days`} tone="gold" />
      </div>
    </Section>
  );
}

function PropertyMix({ market }: { market: MicroMarket }) {
  return (
    <Section eyebrow="Supply Composition" title="Property Mix">
      <div className="grid gap-4">
        {market.mix.map((m, i) => (
          <Meter key={m.label} label={m.label} value={m.value} suffix="%" tone={i % 2 ? "gold" : "primary"} />
        ))}
      </div>
    </Section>
  );
}

function Infrastructure({ market, infra }: { market: MicroMarket; infra: number }) {
  return (
    <Section
      eyebrow="Infrastructure Score"
      title="Liveability Factors"
      action={<Pill tone="primary">Overall {infra}/100</Pill>}
    >
      <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {market.infrastructure.map((f) => (
          <Meter key={f.label} label={f.label} value={f.score} />
        ))}
      </div>
    </Section>
  );
}

function FutureGrowth({ market }: { market: MicroMarket }) {
  return (
    <Section eyebrow="Future Growth" title="Upcoming Infrastructure & Projects">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-wrap gap-2">
          {market.growth.upcoming.map((u) => (
            <Pill key={u} tone="primary">
              {u}
            </Pill>
          ))}
        </div>
        <div className="rounded-xl border border-gold/25 bg-gold/8 p-5">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Expected Appreciation
          </p>
          <p className="mt-2 text-xl font-semibold text-gold">{market.growth.expected}</p>
        </div>
      </div>
    </Section>
  );
}

function Comparables({ market }: { market: MicroMarket }) {
  return (
    <Section eyebrow="AI Comparable Properties" title="Matched Sales Inside This Micro Market">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] text-sm">
          <thead>
            <tr className="text-left text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
              <th className="pb-3 font-medium">Property</th>
              <th className="pb-3 font-medium">Distance</th>
              <th className="pb-3 font-medium">Size</th>
              <th className="pb-3 text-right font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {market.comparables.map((c) => (
              <tr key={c.name} className="border-t border-border">
                <td className="py-3 font-medium">{c.name}</td>
                <td className="num py-3 text-muted-foreground">{c.distance}</td>
                <td className="num py-3 text-muted-foreground">{c.size}</td>
                <td className="num py-3 text-right font-semibold text-primary">{c.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function ConfidenceEngine({ market }: { market: MicroMarket }) {
  const c = market.confidence;
  return (
    <Section
      eyebrow="AI Confidence Engine"
      title="Valuation Confidence"
      action={<Pill tone="primary">{c.label}</Pill>}
    >
      <p className="num text-4xl font-semibold text-value">{c.score}%</p>
      <div className="mt-5 grid gap-4">
        {c.factors.map((f) => (
          <Meter key={f.label} label={f.label} value={f.value} suffix="%" />
        ))}
      </div>
    </Section>
  );
}

function MarketTrend({ market }: { market: MicroMarket }) {
  return (
    <Section eyebrow="Market Trend" title="Price Movement">
      <div className="grid gap-3 sm:grid-cols-2">
        {market.trend.map((t) => (
          <Stat key={t.label} label={t.label} value={t.value} tone="primary" />
        ))}
      </div>
    </Section>
  );
}

function SmartBargain({ market }: { market: MicroMarket }) {
  const b = market.bargain;
  return (
    <Section eyebrow="Smart Bargain Recommendation" title="Negotiation Playbook">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="Seller Asking Price" value={b.asking} tone="muted" />
          <Stat label="CMNHousing True Value" value={b.trueValue} tone="primary" />
          <Stat label="Smart Bargain Range" value={b.range} />
          <Stat label="Recommended First Offer" value={b.firstOffer} tone="gold" />
          <Stat label="Expected Closing Price" value={b.closing} />
          <Stat label="Negotiation Strength" value={b.strength} tone="primary" />
        </div>
        <div className="rounded-xl border border-primary/25 bg-primary/8 p-5">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            How we got here
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            True Value is derived from {market.comparables.length} AI-matched comparables within{" "}
            {market.radiusKm} km, {market.transactions.m12} verified registrations and a{" "}
            {market.stability}% price-stability index — then bracketed by the confidence score.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Formula({
  market,
  parts,
  total,
}: {
  market: MicroMarket;
  parts: { label: string; weight: number; value: number }[];
  total: number;
}) {
  return (
    <Section
      eyebrow="CMNHousing Micro Market AI Formula"
      title="How the Micro Market Score is Computed"
      action={<Pill tone="gold">{market.primaryLocality} · {total}/100</Pill>}
    >
      <div className="rounded-xl border border-border bg-surface p-5">
        <code className="num block text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Micro Market Score = (
          {formulaWeights.map((f, i) => (
            <span key={f.label} className="block pl-4">
              {i > 0 ? "+ " : "  "}
              <span className="text-foreground">{f.label}</span> × {f.weight}%
            </span>
          ))}
          )
        </code>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {parts.map((p) => (
          <Meter
            key={p.label}
            label={`${p.label} (${p.weight}%)`}
            value={Math.round(p.value)}
            suffix="/100"
          />
        ))}
      </div>
    </Section>
  );
}

function Advantage() {
  return (
    <Section eyebrow="Why this wins" title="Street-level intelligence beats city averages">
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        By combining verified registration data, AI-based comparable sales, infrastructure quality,
        demand trends and future growth indicators, CMNHousing delivers a more accurate True Value, a
        transparent confidence score, and a Smart Bargain Range buyers and sellers can trust —
        supporting AI-powered valuation and negotiation instead of generic city-wide guesses.
      </p>
    </Section>
  );
}
