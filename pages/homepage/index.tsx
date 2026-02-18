"use client";

import Image from "next/image";

import HeroComponent from "@/components/containers/hero-component";
import FaqComponent from "@/components/containers/faq";
import HowItWorksComponent from "@/components/containers/how-it-works";
import SubFooterComponent from "@/components/containers/sub-footer";
import TestimonialComponent from "@/components/containers/testimonials";
import TaxCommunityComponent from "@/components/containers/tax-community";
import WhoWeServeComponent from "@/components/containers/who-we-serve";
import WhyTrustUsComponent from "@/components/containers/why-trust-us";
import { GiddaaImages } from "@/constant/image";
import { SUBHERODATA } from "@/helpers/homepage.helpers";

export default function Homepage() {
  return (
    <div className="">
      <HeroComponent />
      <SubHeroComponent />
      <HowItWorksComponent />
      <WhoWeServeComponent />
      <WhyTrustUsComponent />
      <TestimonialComponent />
      <TaxCommunityComponent />
      <FaqComponent />
      <SubFooterComponent />
    </div>
  );
}

// sub hero component
export function SubHeroComponent() {
  return (
    <div className="">
      <div className="flex items-center justify-center">
        <div className="bg-[#2C59C3] p-4 rounded-xl hidden lg:block">
          <Image
            src={GiddaaImages?.heroCards}
            alt="Hero_cards"
            priority
            quality={100}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-[35%_35%_30%] gap-0">
        {SUBHERODATA.map((cards, index) => (
          <div
            style={{ backgroundColor: cards?.color }}
            className="py-4 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center border-r last:border-r-0 border-white/20"
            key={index}
          >
            <h1 className="text-[24px] sm:text-[32px] md:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-3">
              {cards?.amount}
            </h1>
            <p className="text-[14px] sm:text-[16px] text-[#F0F0F0]">
              {cards?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
