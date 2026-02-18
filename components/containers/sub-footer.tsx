"use client";

import Image from "next/image";

import { GiddaaImages } from "@/constant/image";
import ButtonComponent from "./button";

export default function SubFooterComponent() {
  return (
    <div className="max-w-[90%] sm:max-w-[90%] lg:max-w-250 xl:max-w-300 mx-auto mb-25">
      <div className="bg-[#F1F5FF] rounded-[30px] p-6 sm:p-12 ">
        <div className="grid grid-cols-1 gap-8 sm:gap-0 lg:flex lg:flex-row justify-between items-center w-full">
          <div className="">
            <h1 className="text-[#001F3F] font-bold text-[32px] md:text-[40px] capitalize">
              Get Started
            </h1>
            <p className="text-[#4B4B4B] text-[16px] sm:text-[16x] md:text-[20px] leading-8 my-3">
              Begin your tax journey the right way and stay compliant.
            </p>
            <ButtonComponent
              title1="Speak with an Expert"
              title2="Access Your Tax Needs"
              className1="bg-[#2C59C3] text-white"
              className2="border-[#2C59C3] bg-white text-[#2C59C3] text-[#2C59C3]"
            />
          </div>
          <div className="mt-1">
            <Image
              src={GiddaaImages?.SubFooterImage}
              alt="subfooter_images"
              priority
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
