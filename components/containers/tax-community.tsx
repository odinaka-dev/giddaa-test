"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

import { GiddaaImages } from "@/constant/image";
import { SectionHeading } from "./SetionHeader";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { TAXCOMMUNITYDATA } from "@/helpers/homepage.helpers";

export default function TaxCommunityComponent() {
  return (
    <div className="bg-[#FFEED0] py-24">
      <div className="">
        <div className="max-w-[90%] sm:max-w-[90%] lg:max-w-250 xl:max-w-300 mx-auto">
          <SectionHeading
            badge="  Tax Community"
            title="A Vibrant Community You Can Count On."
            className="bg-[#001F3F] text-white"
            description="Find answers to your tax questions. Learn from real world scenarios and contribute to tax knowledge. "
          />
        </div>
        <Marquee pauseOnHover speed={40} className="py-12 cursor-pointer">
          {TAXCOMMUNITYDATA.map((items, index) => (
            <div
              className="bg-white w-50 py-8 px-4 rounded-[40px] mx-2 flex items-start gap-0 min-w-100 cursor-pointer"
              key={index}
            >
              <div className="flex flex-col items-center text-[#6A7282] min-w-10">
                <ThumbsUp
                  color="#6A7282"
                  strokeWidth={1.2}
                  className="h-5 w-5"
                />
                <p className="text-sm font-medium mt-1">12</p>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[20px] mb-1">
                  {items?.taxTitle}
                </h3>
                <p className="text-sm text-[#4A5565] leading-relaxed">
                  {items?.taxDescription}
                </p>
                <div className="mt-4 flex items-center gap-3 text-[14px] text-[#6A7282]">
                  <p>{items?.taxId}</p>
                  <p>{items?.duration}</p>
                </div>
                <div className="items-center gap-1 border border-[#0000001A] inline-flex rounded-md py-1 px-2 mt-3 text-[14px] text-[#0A0A0A]">
                  <MessageCircle size={14} strokeWidth={1.4} />
                  <p>
                    {items?.answers}{" "}
                    {items?.answers === 1 ? "Answer" : "Answers"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
        <div className="flex items-center justify-center">
          <Image
            src={GiddaaImages?.wordCount}
            alt="word-count"
            priority
            quality={100}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHNN2Zz4="
          />
        </div>
      </div>
    </div>
  );
}
