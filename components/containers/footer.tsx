"use client";

import Image from "next/image";
import { Whatsapp } from "iconsax-reactjs";
import { Facebook, Instagram, LinkedinIcon } from "lucide-react";

import { GiddaaImages } from "@/constant/image";
import { FOOTERLISTDATA } from "@/helpers/homepage.helpers";

export default function FooterComponent() {
  return (
    <div className="bg-[#012B56] text-white py-20 px-4 sm:px-14">
      <div className="max-w-[90%] sm:max-w-[98%] lg:max-w-[98%] xl:max-w-7xl mx-auto">
        <div className="py-4">
          <Image
            src={GiddaaImages?.TaxLogo}
            alt="footer_logo"
            width={120}
            height={40}
            priority
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
            sizes="(max-width: 768px) 100vw, 120px"
            className="object-contain"
          />{" "}
          <p className="text-[#D1D5DC] text-[14px]">
            Where everyday individuals and businesses get premium tax support.
          </p>
        </div>
        {/* footer menu lists */}
        <div className="flex flex-wrap gap-12 md:gap-12 lg:gap-24 items-start py-10 sm:pb-24 w-full">
          {FOOTERLISTDATA.map((links, index) => (
            <div key={index} className="w-full sm:w-auto">
              <h1 className="capitalize font-bold text-[16px]">
                {links?.title}
              </h1>
              {links?.list.map((items, index) => (
                <p
                  key={index}
                  className="text-[14px] text-[#D1D5DC] font-normal py-1.5 cursor-pointer"
                >
                  {items}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="mb-4 sm:mb-8 md:mb-18">
          <h1 className="capitalize font-bold text-[16px]">Connect With Us</h1>
          <div className="flex items-center gap-1 py-2 pb-4">
            <Whatsapp size="21" color="#ffffff" />
            <p className="text-[14px] font-normal">
              WhatsApp: +234 800 123 4567
            </p>
          </div>
          <div className="flex gap-3 pb-4">
            <div className="bg-white/10 p-2 rounded-full inline-block">
              <Facebook size={18} />
            </div>
            <div className="bg-white/10 p-2 rounded-full inline-block">
              <Instagram size={18} />
            </div>
            <div className="bg-white/10 p-2 rounded-full inline-block">
              <Facebook size={18} />
            </div>
            <div className="bg-white/10 p-2 rounded-full inline-block">
              <LinkedinIcon size={18} />
            </div>
          </div>
        </div>
        <div className="w-full">
          <p className="text-center text-[#D1D5DC] text-[14px] border-t border-t-white/10 sm:p-8">
            © 2025 TaxEase NG. All rights reserved. Built for compliance with
            Nigeria Tax Act 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
