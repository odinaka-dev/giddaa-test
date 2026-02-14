"use client";

import { Whatsapp } from "iconsax-reactjs";

export default function ButtonComponent() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full">
        <button className="bg-[#2C59C3] text-[14px] sm:text-[16px] text-white rounded-xl p-3 sm:p-3 px-6 sm:px-8 cursor-pointer flex gap-2 items-center justify-center whitespace-nowrap">
          <Whatsapp size="21" color="#ffffff" />
          <span>Speak with an Expert</span>
        </button>
        <button className="font-bold border border-[#2C59C3] bg-white text-[14px] sm:text-[16px] text-[#2C59C3] rounded-xl p-3 sm:p-3 px-6 sm:px-8 cursor-pointer whitespace-nowrap">
          Assess Your Tax Needs
        </button>
      </div>
    </div>
  );
}
