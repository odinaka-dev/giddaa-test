"use client";

import SubFooterComponent from "@/components/containers/sub-footer";
import CompanyTaxComponent from "@/pages/taxPage/company-tax";
import PersonalTaxComponent from "@/pages/taxPage/personal-tax";
import { Tabs } from "@skeletonlabs/skeleton-react";
import { CircleAlert } from "lucide-react";

export default function TaxComponent() {
  return (
    <div className="py-32 bg-[#FAFAFA]">
      <TaxCalculatorHeading />
      <SubFooterComponent />
    </div>
  );
}

export function TaxCalculatorHeading() {
  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[90%] lg:max-w-[1000px] xl:max-w-[1200px] mx-auto">
      <div className="text-center">
        <h1 className="text-[#001F3F] font-bold text-[32px] md:text-[40px] capitalize">
          Tax Calculator
        </h1>
        <p className="text-[#4B4B4B] text-[16px] sm:text-[16x] md:text-[20px] leading-8 my-3">
          Calculate your tax liability under Nigeria&apos;s Tax Act 2025
        </p>
      </div>
      <Tabs defaultValue="company-tax">
        <div className="max-w-100 mx-auto">
          <Tabs.List className="bg-[#ECECF0] p-1 rounded-full border-none grid grid-cols-2 w-full">
            <Tabs.Trigger
              value="personal-tax"
              className="hover:bg-white data-[state=active]:bg-white data-[state=active]:shadow-sm text-[#0a0a0a] rounded-full p-2 cursor-pointer transition-all duration-200"
            >
              Personal Income Tax
            </Tabs.Trigger>
            <Tabs.Trigger
              value="company-tax"
              className="hover:bg-white data-[state=active]:bg-white data-[state=active]:shadow-sm text-[#0a0a0a] rounded-full p-2 cursor-pointer transition-all duration-200"
            >
              Company Income Tax
            </Tabs.Trigger>
          </Tabs.List>
        </div>
        <Tabs.Content value="personal-tax">
          <PersonalTaxComponent />
        </Tabs.Content>
        <Tabs.Content value="company-tax">
          <CompanyTaxComponent />
        </Tabs.Content>
      </Tabs>
      <div className="border border-[#2C59C3] rounded-xl flex gap-4 items-start p-4 my-12 mt-24">
        <CircleAlert />
        <p>
          This calculator uses the latest tax brackets and rates from
          Nigeria&apos;s Tax Act 2025. The first ₦800,000 of annual income is
          tax-free. Results are estimates and should be verified with one of our
          tax professionals.
        </p>
      </div>
    </div>
  );
}
