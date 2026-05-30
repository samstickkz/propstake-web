"use client";

import { useMemo, useState } from "react";

// #14 — interactive calculator on the detail page.
//   - Crowdfund: yearly + 5-year return on a chosen invest amount.
//   - Sale: mortgage estimate (monthly payment) on down + rate + years.
//   - Rent: monthly + annual cost.

type CrowdfundProps = {
  type: "crowdfund";
  yearlyPct: number;
  fiveYearPct: number;
  defaultAmount?: number;
};

type SaleProps = {
  type: "sale";
  price: number;
};

type RentProps = {
  type: "rent";
  amount: number;
  period: "month" | "year" | null;
};

type Props = CrowdfundProps | SaleProps | RentProps;

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

export default function YieldCalculator(props: Props) {
  if (props.type === "crowdfund") return <Crowdfund {...props} />;
  if (props.type === "sale") return <Mortgage {...props} />;
  return <Rent {...props} />;
}

function Crowdfund({ yearlyPct, fiveYearPct, defaultAmount = 5000 }: CrowdfundProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const yearly = useMemo(() => (amount * yearlyPct) / 100, [amount, yearlyPct]);
  const fiveYear = useMemo(
    () => (amount * fiveYearPct) / 100,
    [amount, fiveYearPct]
  );
  return (
    <Card title="What could I earn?">
      <Label>Your investment</Label>
      <NumberInput value={amount} onChange={setAmount} />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stat label="Year 1 returns" value={fmt(yearly)} />
        <Stat label="5-year returns" value={fmt(fiveYear)} />
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Based on the listing&apos;s published yields. Estimates — actuals depend on
        rental performance and capital appreciation.
      </p>
    </Card>
  );
}

function Mortgage({ price }: SaleProps) {
  const [down, setDown] = useState(Math.round(price * 0.2));
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(25);

  const monthly = useMemo(() => {
    const principal = Math.max(price - down, 0);
    const r = rate / 100 / 12;
    const n = years * 12;
    if (principal === 0) return 0;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  }, [price, down, rate, years]);

  return (
    <Card title="Mortgage estimate">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Down payment</Label>
          <NumberInput value={down} onChange={setDown} />
        </div>
        <div>
          <Label>Rate (% APR)</Label>
          <NumberInput value={rate} onChange={setRate} step={0.1} />
        </div>
        <div>
          <Label>Term (years)</Label>
          <NumberInput value={years} onChange={setYears} />
        </div>
        <div>
          <Label>Loan</Label>
          <p className="mt-1 text-base font-semibold">{fmt(price - down)}</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-emerald-50 p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Estimated monthly
        </p>
        <p className="mt-1 text-2xl font-bold text-emerald-700">{fmt(monthly)}</p>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Principal + interest only — excludes taxes, insurance, fees.
      </p>
    </Card>
  );
}

function Rent({ amount, period }: RentProps) {
  const monthly = period === "year" ? amount / 12 : amount;
  const yearly = period === "year" ? amount : amount * 12;
  return (
    <Card title="Cost at a glance">
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Per month" value={fmt(monthly)} />
        <Stat label="Per year" value={fmt(yearly)} />
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Excludes utilities, chiller, security deposits, and broker fees where applicable.
      </p>
    </Card>
  );
}

// ------ shared primitives ------
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-medium text-gray-500">{children}</label>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  step = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  step?: number;
}) {
  return (
    <input
      type="number"
      value={Number.isFinite(value) ? value : 0}
      step={step}
      min={0}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    />
  );
}
