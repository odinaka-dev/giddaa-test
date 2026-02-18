# Tax Calculator - Nigeria Tax System

A comprehensive tax calculation platform for Personal Income Tax (PAYE) and Company Income Tax built with Next.js, TypeScript, and modern UI components.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Components Overview](#components-overview)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Main Features

### Personal Income Tax Calculator

- Multi-source income calculation (Employment, Business, Rental, Investment, Other)
- Allowable deductions (Rent, Pension, NHF, Life Insurance, NHIS, Gratuity)
- Progressive tax bracket breakdown with visual indicators
- Real-time income and deduction totals
- Annual and monthly tax liability display
- Effective tax rate calculation
- Income summary with net income

### Company Income Tax Calculator

- Industry-specific tax rules and exemptions
- Revenue threshold-based taxation
- Profit-based tax calculation
- Exemption period tracking for eligible industries
- Tax-free industry identification
- Dynamic tax rate configuration from API
- Searchable industry dropdown with 58+ industries

---

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS
- **UI Components**:
  - Headless UI (Combobox)
  - GSAP
  - React Marque
  - Skeleton UI
- **Form Management**: Formik
- **HTTP Client**: Native Fetch API
- **Icons**: Lucide React, IconSax
- **State Management**: React Hooks (useState, useEffect, useMemo)

---

## Prerequisites

- **Node.js**: 22.0.0 or higher
- **npm**: 9.0.0 or higher (or **yarn**: 1.22.0+)
- **Git**: For version control

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/odinaka-dev/giddaa-test.git
cd giddaa-test
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Install required packages

If packages are not in `package.json`, install them manually:

```bash
# Core dependencies
npm install next react react-dom typescript

# UI & Styling
npm install tailwindcss postcss autoprefixer
npm install @headlessui/react lucide-react
npm install react-fast-marquee
npm i -D @skeletonlabs/skeleton @skeletonlabs/skeleton-react

# import in your global.css to run skeleton ui
@import '@skeletonlabs/skeleton';
@import '@skeletonlabs/skeleton-react';
@import '@skeletonlabs/skeleton/themes/cerberus';


# Form Management
npm install formik

# TypeScript types
npm install -D @types/node @types/react @types/react-dom
```

Or with yarn:

```bash
yarn add next react react-dom typescript
yarn add tailwindcss postcss autoprefixer
yarn add @headlessui/react lucide-react formik
yarn add -D @types/node @types/react @types/react-dom
yarn add react-fast-marquee
```

### 4. Initialize Tailwind CSS (if not already configured)

## tailwind v4 is already configured in the global.css

## Project Structure

## 📁 Project Structure

```
tax-calculator/
├── app/
│   ├── (website)/
│   │   ├── homepage/
│   │   │   └── page.tsx                 # Home page
│   │   ├── taxPage/
│   │   │   ├── personal-tax/
│   │   │   │   └── page.tsx             # Personal tax calculator page
│   │   │   └── company-tax/
│   │   │       └── page.tsx             # Company tax calculator page
│   │   ├── layout.tsx                   # Root layout
│   │   └── global.css                   # Global styles
├── assets/
│   ├── icons/                           # Icon files
│   └── images/                          # Image assets
├── components/
│   ├── tax-calculators/
│   │   ├── PersonalTaxCalculator.tsx    # Personal tax component
│   │   ├── CompanyTaxCalculator.tsx     # Company tax component
│   │   └── shared/
│   │       ├── LoadingSpinner.tsx       # Reusable spinner
│   │       ├── ProgressBar.tsx          # Tax bracket progress bar
│   │       └── SummaryRow.tsx           # Income summary row
│   └── ui/
│       ├── Button.tsx                   # Button component
│       ├── Input.tsx                    # Input component
│       └── Select.tsx                   # Select/Combobox component
├── containers/
│   ├── homepage/                        # Homepage section containers
│   └── layouts/
│       ├── Header.tsx                   # Site header
│       └── Footer.tsx                   # Site footer
├── _config/
│   └── index.tsx                        # Environment config & base URLs
├── _constants/
│   └── image.ts                         # Static image data imports
├── _exports/
│   └── exports.tsx                      # Client component exports for server
├── _helpers/
│   ├── homepage.helpers.ts              # Homepage utility functions
│   └── tax.helpers.ts                   # Tax calculation helpers
├── _hooks/
│   ├── useIndustries.tsx                # Industries data hook
│   ├── useTaxConfig.tsx                 # Tax configuration hook
│   └── usePersonalTax.tsx               # Personal tax calculation hook
├── _libs/
│   └── utils.ts                         # General utility functions
├── _provider/
│   └── root-provider.tsx                # Root context provider
├── types/
│   └── tax.types.ts                     # TypeScript types for API payloads
├── public/                              # Static assets
├── .env                                 # Environment variables
├── .env.local                           # Local environment variables
├── .gitignore
├── .eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

## API Documentation

### Base URL

```
https://api.taxoga.com/public
```

### Endpoints

#### 1. Personal Income Tax Calculator

```
POST /tax/paye/calculator
```

**Request Body:**

```json
{
  "income": {
    "salaryIncome": 50000000,
    "businessIncome": 0,
    "rentalIncome": 0,
    "investmentIncome": 0,
    "otherIncome": 0
  },
  "deductions": {
    "rent": 0,
    "pensionContribution": 0,
    "nhfContribution": 0,
    "lifeInsurance": 0,
    "nhisPremium": 0,
    "gratitude": 0
  }
}
```

**Response:**

```json
{
  "statusCode": 200,
  "message": "Operation succeeded.",
  "value": [
    {
      "band": "₦1 – ₦800,000",
      "rate": 7.0,
      "taxableAmount": 800000,
      "taxPaid": 56000.0
    }
  ]
}
```

#### 2. Company Tax Configuration

```
GET /system-configuration/COMPANY_INCOME_TAX_CONFIGURATION
```

**Response:**

```json
{
  "value": {
    "TaxRate": 0.3,
    "TaxableAmountThreshold": 25000000
  }
}
```

#### 3. Tax Industries

```
GET /option-type/TAX_INDUSTRIES/options?pageNumber=1&pageSize=500
```

**Response:**

```json
{
  "statusCode": 200,
  "value": {
    "data": [
      {
        "id": "AGRICULTURE",
        "name": "Agriculture (Farming & Primary Production)",
        "extraProperty": "{\"RequiresIncomeTax\":true,\"HasExemptionPeriod\":true,\"ExemptionPeriodYears\":5}",
        "description": "Agricultural business"
      }
    ]
  }
}
```

#### 3. Find .env secrets in the action tab on githun

- open chrometab and head over to:
  https://github.com/odinaka-dev/giddaa-test.git

- Head to settings
- Select Environment
- check the production for secret env key - Production
- To be used in codebase

---

## Components Overview

### PersonalTaxCalculator.tsx

**Location**: `components/tax-calculators/PersonalTaxCalculator.tsx`

**Features**:

- Income sources form (5 fields)
- Deductions form (6 fields)
- Real-time total calculation
- API integration with PAYE calculator
- Progressive tax bracket visualization
- Income summary display

**Key Props**: None (standalone component)

**State Management**:

```typescript
- taxResult: TaxCalculationResponse | null
- isCalculating: boolean
- hasCalculated: boolean
- error: string | null
```

---

### CompanyTaxCalculator.tsx

**Location**: `components/tax-calculators/CompanyTaxCalculator.tsx`

**Features**:

- Searchable industry dropdown (58 different options)
- Dynamic revenue threshold from API
- Profit status selection
- Year of incorporation tracking
- Exemption period calculation
- Tax-free vs taxable determination

**Key Logic**:

```typescript
// Tax is calculated only when ALL conditions are true:
1. RequiresIncomeTax = true
2. Company made a profit
3. Revenue > TaxableAmountThreshold
4. Exemption period has expired
```

**State Management**:

```typescript
- config: TaxConfig | null
- industries: Industry[]
- result: TaxResult | null
- hasCalculated: boolean
```

---

## Running the Application

### Development Mode

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

The application will start on `http://localhost:3000`

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Linting

```bash
npm run lint
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_URI=check github actions for env URI
# NEXT_PUBLIC_API_KEY=no api key for this project
```

**Usage in code:**

```typescript - in config/index.ts file
const baseURL = process.env.NEXT_PUBLIC_URI;
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Module not found errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. TypeScript errors

```bash
# Check TypeScript configuration
npx tsc --noEmit
```

#### 3. Formik validation issues

- check personal-tax component and company tax component

#### 4. Industry dropdown not loading

- Check API response structure matches types
- Verify `extraProperty` is being parsed correctly
- Check browser console for errors

#### 5. Tax calculation returning ₦0

- Verify all form fields are filled
- Check API response format
- Ensure `parseAmount()` function handles currency correctly

---

## 📚 Key Functions Reference

### Formatters (`lib/utils/formatters.ts`)

```typescript
// Format number to Nigerian Naira
formatNaira(50000); // "₦50,000"

// Parse amount from string
parseAmount("₦50,000"); // 50000
parseAmount("OPTIONAL"); // 0
```

### Calculations (`lib/utils/calculations.ts`)

```typescript
// Calculate company tax
calculateTax({
  industry: selectedIndustry,
  madeProfit: true,
  revenueAboveThreshold: true,
  yearOfIncorporation: 2016,
  totalNetProfit: 75000000,
  config: { TaxRate: 0.3, TaxableAmountThreshold: 25000000 },
});
```

**Last Updated**: February 2026
**Version**: 1.0.0
