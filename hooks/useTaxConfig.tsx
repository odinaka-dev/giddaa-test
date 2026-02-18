"use client";

import { useState, useEffect } from "react";
import { TaxConfig } from "@/types/tax.types";
import { baseURL } from "@/config";

export function useTaxConfig() {
  const [config, setConfig] = useState<TaxConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch(
          `${baseURL}/system-configuration/COMPANY_INCOME_TAX_CONFIGURATION`,
        );
        if (!res.ok) throw new Error("Failed to fetch configuration");
        const data = await res.json();

        const parsed =
          typeof data.value === "string" ? JSON.parse(data.value) : data.value;

        setConfig({
          TaxRate: parsed.TaxRate || parsed.taxRate || 0.3,
          TaxableAmountThreshold:
            parsed.TaxableAmountThreshold ||
            parsed.taxableAmountThreshold ||
            25000000,
        });
      } catch (err) {
        setError("Could not load tax configuration.");
        setConfig({ TaxRate: 0.3, TaxableAmountThreshold: 25000000 });
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  return { config, loading, error };
}
