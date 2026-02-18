"use client";

import { Whatsapp } from "iconsax-reactjs";

type buttonProps = {
  title1: string;
  title2: string;
  className1: string;
  className2: string;
};

export default function ButtonComponent({
  title1,
  title2,
  className1,
  className2,
}: buttonProps) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full">
        <button
          className={`${className1} text-[14px] sm:text-[16px] rounded-xl p-3 sm:p-3 px-6 sm:px-8 cursor-pointer flex gap-2 items-center justify-center whitespace-nowrap`}
        >
          <Whatsapp size="21" strokeWidth={21} />
          <span>{title1}</span>
        </button>
        <button
          className={`${className2} font-bold border  text-[14px] sm:text-[16px] rounded-xl p-3 sm:p-3 px-6 sm:px-8 cursor-pointer whitespace-nowrap`}
        >
          {title2}
        </button>
      </div>
    </div>
  );
}
