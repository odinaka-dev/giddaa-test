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
