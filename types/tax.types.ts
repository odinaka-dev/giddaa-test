export interface TaxBracket {
  band: string;
  rate: number;
  taxableAmount: number;
  taxPaid: number;
}

export interface ApiResponse {
  statusCode: number;
  message: string;
  value: TaxBracket[];
}

export interface TaxCalculationResponse {
  taxPayable: number;
  monthlyTax: number;
  effectiveRate: number;
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  netIncome: number;
  taxBreakdown: TaxBracket[];
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Industry {
  id: string;
  name: string;
  extraProperties: {
    RequiresIncomeTax: boolean;
    HasExemptionPeriod: boolean;
    ExemptionPeriodYears: number;
  };
}

export interface TaxConfig {
  TaxRate: number;
  TaxableAmountThreshold: number;
}

export interface TaxResult {
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

export interface IndustryApiResponse {
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

export interface IndustryData {
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

export interface IndustryExtraProperties {
  RequiresIncomeTax: boolean;
  HasExemptionPeriod: boolean;
  ExemptionPeriodYears: number;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  extraProperties: IndustryExtraProperties;
}
