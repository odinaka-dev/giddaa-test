"use client";

import { useFormik } from "formik";
import { Calculator } from "lucide-react";
import { useState, useMemo } from "react";
import { ApiResponse, TaxCalculationResponse } from "@/types/tax.types"; // types imports

function parseAmount(value: string): number {
  if (!value || value === "OPTIONAL") return 0;
  return parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
}

function formatNaira(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "₦0";
  }
  return `₦${value.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export default function PersonalTaxCalculator() {
  const [taxResult, setTaxResult] = useState<TaxCalculationResponse | null>(
    null,
  );
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      employmentIncome: "",
      businessIncome: "",
      rentalIncome: "",
      investmentIncome: "",
      otherIncome: "",
      rent: "",
      pensionContribution: "",
      nhfContribution: "",
      lifeInsurance: "",
      nhisContribution: "",
      gratuity: "",
    },

    onSubmit: async (values) => {
      setIsCalculating(true);
      setError(null);

      const payload = {
        income: {
          salaryIncome: parseAmount(values.employmentIncome),
          businessIncome: parseAmount(values.businessIncome),
          rentalIncome: parseAmount(values.rentalIncome),
          investmentIncome: parseAmount(values.investmentIncome),
          otherIncome: parseAmount(values.otherIncome),
        },
        deductions: {
          rent: parseAmount(values.rent),
          pensionContribution: parseAmount(values.pensionContribution),
          nhfContribution: parseAmount(values.nhfContribution),
          lifeInsurance: parseAmount(values.lifeInsurance),
          nhisPremium: parseAmount(values.nhisContribution),
          gratitude: parseAmount(values.gratuity),
        },
      };

      try {
        const response = await fetch(
          "https://api.taxoga.com/public/tax/paye/calculator",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to calculate tax");
        }

        const data: { value: ApiResponse } = await response.json();

        // Extract the actual data from nested structure
        const apiData = data.value.value;

        // Calculate totals from the bracket data
        const totalTaxPaid = apiData.reduce(
          (sum, bracket) => sum + bracket.taxPaid,
          0,
        );
        const totalTaxableAmount = apiData.reduce(
          (sum, bracket) => sum + bracket.taxableAmount,
          0,
        );
        const grossIncome = totalIncome;
        const totalDeductionsValue = totalDeductions;

        // Transform to our expected structure
        const transformedResult: TaxCalculationResponse = {
          taxPayable: totalTaxPaid,
          monthlyTax: totalTaxPaid / 12,
          effectiveRate:
            grossIncome > 0 ? (totalTaxPaid / grossIncome) * 100 : 0,
          grossIncome: grossIncome,
          totalDeductions: totalDeductionsValue,
          taxableIncome: totalTaxableAmount,
          netIncome: grossIncome - totalTaxPaid,
          taxBreakdown: apiData.map((bracket) => ({
            band: bracket.band,
            rate: bracket.rate,
            taxableAmount: bracket.taxableAmount,
            taxPaid: bracket.taxPaid,
          })),
        };

        setTaxResult(transformedResult);
        setHasCalculated(true);
      } catch (err) {
        setError("Unable to calculate tax. Please try again.");
        console.error("Tax calculation error:", err);
      } finally {
        setIsCalculating(false);
      }
    },
  });

  // Calculate totals in real-time for display
  const totalIncome = useMemo(() => {
    return (
      parseAmount(formik.values.employmentIncome) +
      parseAmount(formik.values.businessIncome) +
      parseAmount(formik.values.rentalIncome) +
      parseAmount(formik.values.investmentIncome) +
      parseAmount(formik.values.otherIncome)
    );
  }, [
    formik.values.employmentIncome,
    formik.values.businessIncome,
    formik.values.rentalIncome,
    formik.values.investmentIncome,
    formik.values.otherIncome,
  ]);

  const totalDeductions = useMemo(() => {
    return (
      parseAmount(formik.values.rent) +
      parseAmount(formik.values.pensionContribution) +
      parseAmount(formik.values.nhfContribution) +
      parseAmount(formik.values.lifeInsurance) +
      parseAmount(formik.values.nhisContribution) +
      parseAmount(formik.values.gratuity)
    );
  }, [
    formik.values.rent,
    formik.values.pensionContribution,
    formik.values.nhfContribution,
    formik.values.lifeInsurance,
    formik.values.nhisContribution,
    formik.values.gratuity,
  ]);

  const handleReset = () => {
    formik.resetForm();
    setTaxResult(null);
    setHasCalculated(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
        {/* Left Panel - Income Sources & Deductions */}
        <div className="space-y-6">
          {/* Income Sources Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-1">Income Sources</h2>
            <p className="text-sm text-gray-500 mb-6">
              Enter your annual income from all your income sources
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-4">
                {/* Employment Income */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Employment Income (₦)
                  </label>
                  <input
                    type="text"
                    name="employmentIncome"
                    value={formik.values.employmentIncome}
                    onChange={formik.handleChange}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Business Income */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Business Income (₦)
                  </label>
                  <input
                    type="text"
                    name="businessIncome"
                    value={formik.values.businessIncome}
                    onChange={formik.handleChange}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Rental Income */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Rental Income (₦)
                  </label>
                  <input
                    type="text"
                    name="rentalIncome"
                    value={formik.values.rentalIncome}
                    onChange={formik.handleChange}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Investment Income */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Investment Income (₦)
                  </label>
                  <input
                    type="text"
                    name="investmentIncome"
                    value={formik.values.investmentIncome}
                    onChange={formik.handleChange}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Other Income */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Other Income (₦)
                  </label>
                  <input
                    type="text"
                    name="otherIncome"
                    value={formik.values.otherIncome}
                    onChange={formik.handleChange}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Total Income Display */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t border-t-black/10">
                <span className="text-sm text-gray-600">Total Income</span>
                <span className="text-xl font-bold text-[#2C59C3]">
                  {formatNaira(totalIncome)}
                </span>
              </div>
            </form>
          </div>

          {/* Allowable Deductions Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-1">Allowable Deductions</h2>
            <p className="text-sm text-gray-500 mb-6">
              Enter the annual amount of any of the following allowable
              deductions
            </p>

            <div className="space-y-4">
              {/* Rent */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Rent (₦)
                </label>
                <input
                  type="text"
                  name="rent"
                  value={formik.values.rent}
                  onChange={formik.handleChange}
                  placeholder="OPTIONAL"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>

              {/* Pension Contribution */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Pension Contribution (₦)
                </label>
                <input
                  type="text"
                  name="pensionContribution"
                  value={formik.values.pensionContribution}
                  onChange={formik.handleChange}
                  placeholder="OPTIONAL"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>

              {/* NHF Contribution */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  NHF Contribution (₦)
                </label>
                <input
                  type="text"
                  name="nhfContribution"
                  value={formik.values.nhfContribution}
                  onChange={formik.handleChange}
                  placeholder="OPTIONAL"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>

              {/* Life Insurance */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Life Insurance (₦)
                </label>
                <input
                  type="text"
                  name="lifeInsurance"
                  value={formik.values.lifeInsurance}
                  onChange={formik.handleChange}
                  placeholder="OPTIONAL"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>

              {/* NHIS Premium */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  NHIS Premium (₦)
                </label>
                <input
                  type="text"
                  name="nhisContribution"
                  value={formik.values.nhisContribution}
                  onChange={formik.handleChange}
                  placeholder="OPTIONAL"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>

              {/* Gratuity */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Gratuity (₦)
                </label>
                <input
                  type="text"
                  name="gratuity"
                  value={formik.values.gratuity}
                  onChange={formik.handleChange}
                  placeholder="0"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Total Deductions Display */}
            <div className="flex justify-between items-center pt-6 mt-6 border-t border-t-black/10">
              <span className="text-sm text-gray-600">Total Deductions</span>
              <span className="text-xl font-bold text-[#2C59C3]">
                {formatNaira(totalDeductions)}
              </span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-[60%_40%] gap-3 mt-6">
              <button
                type="submit"
                onClick={() => formik.handleSubmit()}
                disabled={isCalculating || totalIncome === 0}
                className="py-3 bg-[#2C59C3] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCalculating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4" />
                    Calculate Tax
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="space-y-6">
          {/* Annual Tax Liability Card */}
          <div className="bg-[#0A1F3D] text-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
              </svg>
              <span className="text-xs">Annual Tax Liability</span>
            </div>
            <h3 className="text-3xl font-bold mb-4">
              {hasCalculated && taxResult
                ? formatNaira(taxResult.taxPayable)
                : "₦0"}
            </h3>
            <div className="border-t border-white/20 pt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/70 mb-0.5">Monthly</p>
                <p className="text-lg font-bold">
                  {hasCalculated && taxResult
                    ? formatNaira(taxResult.monthlyTax)
                    : "₦0"}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/70 mb-0.5">Effective Rate</p>
                <p className="text-lg font-bold">
                  {hasCalculated && taxResult
                    ? `${Number(taxResult.effectiveRate).toFixed(2)}%`
                    : "0%"}
                </p>
              </div>
            </div>
          </div>

          {/* Tax Breakdown by Bracket */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Tax Breakdown by Bracket</h3>

            {!hasCalculated ? (
              <p className="text-sm text-gray-400 text-center py-8">
                Fill the form and click Calculate Tax to see your tax breakdown
              </p>
            ) : (
              <div className="space-y-4">
                {taxResult?.taxBreakdown?.map((bracket, index) => {
                  const totalTax = taxResult.taxPayable;
                  const percentage =
                    totalTax > 0 ? (bracket.taxPaid / totalTax) * 100 : 0;

                  // if (bracket.taxPaid === 0) return null;

                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium">
                          {bracket.rate}% Band
                        </span>
                        <span className="text-sm font-bold">
                          {formatNaira(bracket.taxPaid)}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 bg-[#2C59C3]`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatNaira(bracket.taxableAmount)} taxed at{" "}
                        {bracket.rate}%
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Income Summary */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Income Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gross Income</span>
                <span className="font-semibold">
                  {hasCalculated && taxResult
                    ? formatNaira(taxResult.grossIncome)
                    : formatNaira(totalIncome)}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-b-black/10 pb-2">
                <span className="text-gray-600">Deductions</span>
                <span className="font-semibold text-green-600">
                  {hasCalculated && taxResult
                    ? `-${formatNaira(taxResult.totalDeductions)}`
                    : `-${formatNaira(totalDeductions)}`}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxable Income</span>
                <span className="font-semibold">
                  {hasCalculated && taxResult
                    ? formatNaira(taxResult.taxableIncome)
                    : formatNaira(Math.max(0, totalIncome - totalDeductions))}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax Payable</span>
                <span className="font-semibold text-red-600">
                  {hasCalculated && taxResult
                    ? `-${formatNaira(taxResult.taxPayable)}`
                    : "₦0"}
                </span>
              </div>

              <div className="border-t border-t-black/10 pt-4 flex justify-between items-center">
                <span className="text-gray-900 font-medium">Net Income</span>
                <span className="text-2xl font-bold text-[#2C59C3]">
                  {hasCalculated && taxResult
                    ? formatNaira(taxResult.netIncome)
                    : formatNaira(totalIncome)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Brackets Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm col-span-1 lg:col-span-2">
          <h3 className="text-lg font-bold mb-4">
            2025 Tax Brackets (Progressive Rates)
          </h3>

          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-b-black/10">
                  <th className="text-left py-3 font-semibold">Income Range</th>
                  <th className="text-center py-3 font-semibold">Tax Rate</th>
                  <th className="text-right py-3 font-semibold">
                    Max Tax in Bracket
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="border-b border-b-black/10">
                  <td className="py-3">₦0 - ₦800,000</td>
                  <td className="text-center">
                    <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      7%
                    </span>
                  </td>
                  <td className="text-right">₦56,000</td>
                </tr>
                <tr className="border-b border-b-black/10">
                  <td className="py-3">₦800,001 - ₦3,200,000</td>
                  <td className="text-center">
                    <span className="inline-block bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      11%
                    </span>
                  </td>
                  <td className="text-right">₦264,000</td>
                </tr>
                <tr className="border-b border-b-black/10">
                  <td className="py-3">₦3,200,001 - ₦6,400,000</td>
                  <td className="text-center">
                    <span className="inline-block bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      15%
                    </span>
                  </td>
                  <td className="text-right">₦480,000</td>
                </tr>
                <tr className="border-b border-b-black/10">
                  <td className="py-3">₦6,400,001 - ₦12,800,000</td>
                  <td className="text-center">
                    <span className="inline-block bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      19%
                    </span>
                  </td>
                  <td className="text-right">₦1,216,000</td>
                </tr>
                <tr className="border-b border-b-black/10">
                  <td className="py-3">₦12,800,001 - ₦25,600,000</td>
                  <td className="text-center">
                    <span className="inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      21%
                    </span>
                  </td>
                  <td className="text-right">₦2,688,000</td>
                </tr>
                <tr className="">
                  <td className="py-3">₦25,600,001 - Above</td>
                  <td className="text-center">
                    <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      24%
                    </span>
                  </td>
                  <td className="text-right">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
