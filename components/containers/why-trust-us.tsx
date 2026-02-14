"use client";

import Image from "next/image";
import { SectionHeading } from "./SetionHeader";
import { WHYCARDDATA } from "@/helpers/homepage.helpers";

export default function WhyTrustUsComponent() {
  return (
    <div className="py-20">
      <div className="max-w-[90%] sm:max-w-[90%] lg:max-w-250 xl:max-w-7xl mx-auto">
        <SectionHeading
          badge="  Why Trust Us?"
          title="Work With Nigeria’s Top Tax Experts"
          className="bg-[#001F3F] text-white"
          description="Before the 2025 tax act, we filed 200 returns for 30 companies. We've added great software to help more businesses and individuals stay compliant and maximize their tax returns."
        />
      </div>
      <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 my-16">
        {WHYCARDDATA.map((items, index) => (
          <div
            className="min-w-[85%] lg:min-w-253.25 rounded-[56px] grid md:grid-cols-2 overflow-hidden mx-2 sm:mx-8"
            style={{ backgroundColor: items?.color }}
            key={index}
          >
            {/* Image - appears first on mobile, second on desktop */}
            <div className="relative min-h-67.5 sm:min-h-125 order-1 md:order-2">
              <Image
                src={items?.cardImage}
                alt="card-image"
                fill
                priority
                quality={100}
                className="object-cover"
              />
            </div>

            {/* Text content - appears second on mobile, first on desktop */}
            <div className="p-6 md:p-10 flex flex-col justify-between order-2 md:order-1">
              <div>
                <p className="text-[16px] sm:text-[18px] text-[#001F3F] font-medium mb-4 opacity-80">
                  {items?.cardheader}
                </p>
                <h2 className="text-[30px] sm:text-[36px] font-bold text-white mb-6 leading-tight">
                  {items?.heading}
                </h2>
                <p className="text-[16px] sm:text-[20px] italic text-[#F0F0F0] mb-6 opacity-90">
                  {items?.subdescrition}
                </p>
                <p className="text-[14px] sm:text-[16px] text-white opacity-90">
                  {items?.description}
                </p>
              </div>
              <div className="mt-2">
                <h3 className="text-[32px] sm:text-[40px] font-bold text-[#00134380]">
                  {items?.cardcta}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
