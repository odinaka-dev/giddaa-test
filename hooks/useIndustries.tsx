"use client";

import { useState, useEffect } from "react";
import { IndustryApiResponse } from "@/types/tax.types";
import { baseURL } from "@/config";
import { parseIndustryResponse } from "@/libs/utils";
import { Industry } from "@/types/tax.types";

export function useIndustries() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIndustries() {
      try {
        const res = await fetch(
          `${baseURL}/option-type/TAX_INDUSTRIES/options?pageNumber=1&pageSize=500`,
        );
        if (!res.ok) throw new Error("Failed to fetch industries");

        const response: IndustryApiResponse = await res.json();
        console.log(response?.value?.value?.data);

        setIndustries(parseIndustryResponse(response?.value?.value?.data));
      } catch (err) {
        setError("Could not load industries.");
        console.error("Industries fetch error:", err);
        // Fallback data...
        setIndustries([]);
      } finally {
        setLoading(false);
      }
    }
    fetchIndustries();
  }, []);

  return { industries, loading, error };
}
