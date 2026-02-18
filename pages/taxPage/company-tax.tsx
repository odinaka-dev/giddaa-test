"use client";

import { Combobox } from "@headlessui/react";
import { useFormik } from "formik";
import { Check, ChevronDown } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Industry {
  id: string;
  name: string;
  extraProperties: {
    RequiresIncomeTax: boolean;
    HasExemptionPeriod: boolean;
    ExemptionPeriodYears: number;
  };
}

interface TaxConfig {
  TaxRate: number;
  TaxableAmountThreshold: number;
}

interface TaxResult {
  taxPayable: number;
  monthlyTax: number;
  effectiveRate: number;
  grossIncome: number;
  taxableIncome: number;
  netIncome: number;
  isTaxFree: boolean;
  taxFreeReason: string;
}

// ─── API Response Types ──────────────────────────────────────────────────────

interface IndustryApiResponse {
  statusCode: number;
  message: string;
  value: {
    value: {
      pageNumber: number;
      pageSize: number;
      totalPages: number;
      totalRecords: number;
      data: IndustryData[];
    };
  };
}

interface IndustryData {
  id: string;
  name: string;
  optionTypeId: string;
  extraProperty: string; // JSON string that needs to be parsed
  optionType: null | string;
  description: string;
  identifier: null | string;
  isRequired: boolean;
  createdBy: string; // JSON string
  dateCreated: string; // ISO date string
}

// ─── Parsed Types ────────────────────────────────────────────────────────────

interface IndustryExtraProperties {
  RequiresIncomeTax: boolean;
  HasExemptionPeriod: boolean;
  ExemptionPeriodYears: number;
}

interface Industry {
  id: string;
  name: string;
  description: string;
  extraProperties: IndustryExtraProperties;
}

// ─── Usage Example ───────────────────────────────────────────────────────────

// When parsing the API response:
// function parseIndustryResponse(response: IndustryApiResponse): Industry[] {
//   return response?.value?.value?.data.map((item) => ({
//     id: item.id,
//     name: item.name,
//     description: item.description,
//     extraProperties: JSON.parse(item.extraProperty) as IndustryExtraProperties,
//   }));
// }

function parseIndustryResponse(data: IndustryData[]): Industry[] {
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

function useTaxConfig() {
  const [config, setConfig] = useState<TaxConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch(
          "https://api.taxoga.com/public/system-configuration/COMPANY_INCOME_TAX_CONFIGURATION",
        );
        if (!res.ok) throw new Error("Failed to fetch configuration");
        const data = await res.json();

        // Parse the Value field (it may be a JSON string)
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
        // Fallback values for development
        setConfig({ TaxRate: 0.3, TaxableAmountThreshold: 25000000 });
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  return { config, loading, error };
}

function useIndustries() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIndustries() {
      try {
        const res = await fetch(
          `https://api.taxoga.com/public/option-type/TAX_INDUSTRIES/options?pageNumber=1&pageSize=500`,
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

function calculateTax(params: {
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

// ─── Formatters ───────────────────────────────────────────────────────────────

function formatNaira(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "₦0";
  }
  return `₦${value.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function parseAmount(value: string | undefined | null): number {
  if (!value || value === "") return 0;
  const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
  return isNaN(parsed) ? 0 : parsed;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CompanyTaxCalculator() {
  const { config, loading: configLoading } = useTaxConfig();
  const { industries, loading: industriesLoading } = useIndustries();
  const [result, setResult] = useState<TaxResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [industryQuery, setIndustryQuery] = useState("");

  const formik = useFormik({
    initialValues: {
      industryId: "",
      totalSales: "",
      madeProfit: "",
      yearOfIncorporation: "",
      totalNetProfit: "",
    },
    onSubmit: (values) => {
      if (!config) return;

      const selectedIndustry =
        industries.find((i) => i.id === values.industryId) ?? null;

      const revenueAboveThreshold = values.totalSales === "above";
      const madeProfit = values.madeProfit === "yes";
      const yearOfIncorporation = parseInt(values.yearOfIncorporation) || 2000;
      const totalNetProfit = parseAmount(values.totalNetProfit);
      // console.log(industries);

      const taxResult = calculateTax({
        industry: selectedIndustry,
        madeProfit,
        revenueAboveThreshold,
        yearOfIncorporation,
        totalNetProfit,
        config,
      });

      setResult(taxResult);
      setHasCalculated(true);
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setResult(null);
    setHasCalculated(false);
  };

  const isLoading = configLoading || industriesLoading;
  const taxRatePercent = config ? (config.TaxRate * 100).toFixed(0) : "30";
  const threshold = config?.TaxableAmountThreshold;

  // Calculate total income display
  const totalIncomeDisplay = useMemo(() => {
    return parseAmount(formik.values.totalNetProfit);
  }, [formik.values.totalNetProfit]);

  // Filter industries based on search
  const filteredIndustries = useMemo(() => {
    if (industryQuery === "") {
      return industries.slice(0, 5);
    }

    return industries.filter((industry) =>
      industry.name.toLowerCase().includes(industryQuery.toLowerCase()),
    );
  }, [industries, industryQuery]);

  // Get selected industry object
  const selectedIndustry = industries.find(
    (ind) => ind.id === formik.values.industryId,
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
        {/* Left Panel - Income Sources */}
        <div>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Income Sources</h2>
            <p className="text-gray-600 mb-6">
              Enter your annual income from all your income sources.
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Industry */}
              {/* <div>
                <label className="block text-sm font-medium mb-2">
                  Industry
                </label>
                {industriesLoading ? (
                  <LoadingSpinner />
                ) : (
                  <select
                    name="industryId"
                    value={formik.values.industryId}
                    onChange={formik.handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="">Select an industry</option>
                    {industries.map((ind) => (
                      <option key={ind.id} value={ind.id}>
                        {ind.name}
                      </option>
                    ))}
                  </select>
                )}
              </div> */}

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Industry
                </label>
                {industriesLoading ? (
                  <LoadingSpinner />
                ) : (
                  <Combobox
                    value={formik.values.industryId}
                    onChange={(value) => {
                      formik.setFieldValue("industryId", value);
                    }}
                  >
                    <div className="relative">
                      <div className="relative">
                        <Combobox.Input
                          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          displayValue={() => selectedIndustry?.name || ""}
                          onChange={(event) =>
                            setIndustryQuery(event.target.value)
                          }
                          placeholder="Search for an industry..."
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </Combobox.Button>
                      </div>

                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {filteredIndustries.length === 0 &&
                        industryQuery !== "" ? (
                          <div className="px-4 py-2 text-sm text-gray-500">
                            No industries found.
                          </div>
                        ) : (
                          filteredIndustries.map((industry) => (
                            <Combobox.Option
                              key={industry.id}
                              value={industry.id}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-blue-50 text-blue-900"
                                    : "text-gray-900"
                                }`
                              }
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-semibold" : "font-normal"
                                    }`}
                                  >
                                    {industry.name}
                                  </span>
                                  {selected && (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      <Check className="h-5 w-5" />
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}

                        {industryQuery === "" && industries.length > 5 && (
                          <div className="px-4 py-2 text-xs text-gray-500 border-t">
                            Type to search {industries.length} industries
                          </div>
                        )}
                      </Combobox.Options>
                    </div>
                  </Combobox>
                )}
              </div>

              {/* Total Sales/Revenue */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Total Sales/Revenue
                </label>
                {configLoading ? (
                  <LoadingSpinner />
                ) : (
                  <select
                    name="totalSales"
                    value={formik.values.totalSales}
                    onChange={formik.handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="">Select revenue range</option>
                    <option value="above">
                      More than {formatNaira(threshold)}
                    </option>
                    <option value="below">
                      Less than {formatNaira(threshold)}
                    </option>
                  </select>
                )}
              </div>

              {/* Did You Make a Profit */}
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Did your business make a profit for the last financial year?
                </p>
                <label className="block text-sm font-medium mb-2">
                  Did You Make a Profit?
                </label>
                <select
                  name="madeProfit"
                  value={formik.values.madeProfit}
                  onChange={formik.handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Year Of Incorporation */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Year Of Incorporation
                </label>
                <input
                  type="number"
                  name="yearOfIncorporation"
                  value={formik.values.yearOfIncorporation}
                  onChange={formik.handleChange}
                  placeholder="e.g. 2016"
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Total Net Profit */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Total Net Profit (₦)
                </label>
                <input
                  type="text"
                  name="totalNetProfit"
                  value={formik.values.totalNetProfit}
                  onChange={formik.handleChange}
                  placeholder="e.g. 75000000"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Total Income Display */}
              <div className="flex justify-between items-center pt-4 border-t border-t-black/10 mt-16">
                <span className="text-gray-600">Total Income</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatNaira(totalIncomeDisplay)}
                </span>
              </div>
            </form>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="submit"
                onClick={() => formik.handleSubmit()}
                disabled={isLoading}
                className="py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate Tax
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="space-y-6">
          {/* Annual Tax Liability Card */}
          <div className="bg-[#0A1F3D] text-white rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
              </svg>
              <span className="text-sm">Annual Tax Liability</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              {hasCalculated && result ? formatNaira(result.taxPayable) : "₦0"}
            </h3>
            <div className="border-t border-white/20 pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/70 mb-1">Monthly</p>
                <p className="text-xl font-bold">
                  {hasCalculated && result
                    ? formatNaira(result.monthlyTax)
                    : "₦0"}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/70 mb-1">Effective Rate</p>
                <p className="text-xl font-bold">
                  {hasCalculated && result
                    ? `${result.effectiveRate.toFixed(2)}%`
                    : "0%"}
                </p>
              </div>
            </div>
          </div>

          {/* Tax Breakdown by Bracket */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Tax Breakdown by Bracket</h3>

            {!hasCalculated ? (
              <p className="text-sm text-gray-400 text-center py-4">
                Fill the form and click Calculate Tax
              </p>
            ) : result?.isTaxFree ? (
              /* Tax-Free Band only */
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Tax-Free Band</span>
                  <span className="font-bold">₦0</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-300 w-0"></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {result.taxFreeReason}
                </p>
              </div>
            ) : (
              /* Show both bands when tax is calculated */
              <>
                {/* Tax-Free Band */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Tax-Free Band</span>
                    <span className="font-bold">₦0</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-300 w-0"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Not in a tax-free industry
                  </p>
                </div>

                {/* Tax Rate Band */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{taxRatePercent}% Band</span>
                    <span className="font-bold">
                      {formatNaira(result?.taxPayable)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[70%]"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatNaira(result?.taxableIncome)} taxed at{" "}
                    {taxRatePercent}% Band
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Income Summary */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Income Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gross Income</span>
                <span className="font-semibold">
                  {hasCalculated && result
                    ? formatNaira(result.grossIncome)
                    : formatNaira(totalIncomeDisplay)}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-b-black/10 pb-2">
                <span className="text-gray-600">Deductions</span>
                <span className="font-semibold text-green-600">₦0</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxable Income</span>
                <span className="font-semibold">
                  {hasCalculated && result
                    ? formatNaira(result.taxableIncome)
                    : "₦0"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax Payable</span>
                <span className="font-semibold text-red-600">
                  {hasCalculated && result
                    ? `-${formatNaira(result.taxPayable)}`
                    : "₦0"}
                </span>
              </div>

              <div className="border-t border-t-black/10 pt-4 flex justify-between items-center">
                <span className="text-gray-900 font-medium">Net Income</span>
                <span className="text-2xl font-bold text-blue-600">
                  {hasCalculated && result
                    ? formatNaira(result.netIncome)
                    : formatNaira(totalIncomeDisplay)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
