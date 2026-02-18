import {
  Industry,
  IndustryData,
  TaxConfig,
  TaxResult,
} from "@/types/tax.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Parses the API response to extract industry data and convert it to our Industry type
export function parseIndustryResponse(data: IndustryData[]): Industry[] {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    extraProperties: item.extraProperty
      ? JSON.parse(item.extraProperty)
      : {
          RequiresIncomeTax: false,
          HasExemptionPeriod: false,
          ExemptionPeriodYears: 0,
        },
  }));
}

// format naira values wwth commas and ₦ symbol
export function formatNaira(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "₦0";
  }
  return `₦${value.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function parseAmount(value: string | undefined | null): number {
  if (!value || value === "") return 0;
  const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
  return isNaN(parsed) ? 0 : parsed;
}

export function calculateTax(params: {
  industry: Industry | null;
  madeProfit: boolean;
  revenueAboveThreshold: boolean;
  yearOfIncorporation: number;
  totalNetProfit: number;
  config: TaxConfig;
}): TaxResult {
  const {
    industry,
    madeProfit,
    revenueAboveThreshold,
    yearOfIncorporation,
    totalNetProfit,
    config,
  } = params;

  const currentYear = new Date().getFullYear();
  const yearsSinceIncorporation = currentYear - yearOfIncorporation;

  const requiresIncomeTax =
    industry?.extraProperties?.RequiresIncomeTax ?? false;
  const hasExemptionPeriod =
    industry?.extraProperties?.HasExemptionPeriod ?? false;
  const exemptionYears = industry?.extraProperties?.ExemptionPeriodYears ?? 0;

  // Exemption still applies if years since incorporation <= exemption period
  const exemptionStillApplies =
    hasExemptionPeriod && yearsSinceIncorporation <= exemptionYears;

  // Determine tax-free reason
  let isTaxFree = false;
  let taxFreeReason = "";

  if (!requiresIncomeTax) {
    isTaxFree = true;
    taxFreeReason = "You are in a tax-free industry";
  } else if (exemptionStillApplies) {
    isTaxFree = true;
    taxFreeReason = `Exemption period active (${exemptionYears - yearsSinceIncorporation} year(s) remaining)`;
  } else if (!madeProfit) {
    isTaxFree = true;
    taxFreeReason = "No profit made — no tax liability";
  } else if (!revenueAboveThreshold) {
    isTaxFree = true;
    taxFreeReason = "Revenue below taxable threshold";
  }

  const shouldCalculateTax =
    requiresIncomeTax &&
    madeProfit &&
    revenueAboveThreshold &&
    !exemptionStillApplies;

  const taxPayable = shouldCalculateTax ? config.TaxRate * totalNetProfit : 0;

  const grossIncome = totalNetProfit;
  const taxableIncome = shouldCalculateTax ? totalNetProfit : 0;
  const netIncome = grossIncome - taxPayable;
  const monthlyTax = taxPayable / 12;
  const effectiveRate = grossIncome > 0 ? (taxPayable / grossIncome) * 100 : 0;

  return {
    taxPayable,
    monthlyTax,
    effectiveRate,
    grossIncome,
    taxableIncome,
    netIncome,
    isTaxFree,
    taxFreeReason,
  };
}
