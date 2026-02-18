import { TaxCalculator } from "@/exports/exports";
import { Metadata } from "next";

// add metadata
export const metadata: Metadata = {
  title: "Calculate your Nigerian Taxes Instantly | Tax Oga",
  description: "giddaa-test.vercel.app/calculator",
};

export default function page() {
  return <TaxCalculator />;
}
