import Image from "next/image";
import { Check } from "lucide-react";

import ButtonComponent from "@/components/containers/button";
import { GiddaaImages } from "@/constant/image";
import { CARDATA } from "@/helpers/homepage.helpers";

export default function HeroComponent() {
  return (
    <div className="relative lg:mb-10 min-h-screen">
      {/* hero bg-image */}
      <Image
        src={GiddaaImages?.desktopheroBg}
        alt="Hero background"
        fill
        priority
        quality={100}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlZWUiLz48L3N2Zz4="
        className="object-cover"
      />

      {/* hero contents */}
      <div>
        <div className="relative text-white max-w-[90%] sm:max-w-[90%] lg:max-w-250 xl:max-w-7xl mx-auto pt-32 pb-48 md:pt-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-[48px] xl:text-[56px] font-bold leading-tight">
                Avoid <span className="text-[#4FC7FF]">Tax Wahala!</span> Stay
                Compliant While Paying the Lowest Possible Taxes.
              </h1>
              <p className="text-lg md:text-[20px] text-[#CCCCCC]">
                No matter your tax needs, our tax experts will help you file
                with confidence and get the most value when you file your taxes.
              </p>
              <div className="mt-8">
                <ButtonComponent
                  title1="Speak with an Expert"
                  title2="Access Your Tax Needs"
                  className1="bg-[#2C59C3] text-white"
                  className2="border-[#2C59C3] bg-white text-[#2C59C3]"
                />
              </div>
            </div>

            <div className="relative top-20 h-64 md:h-96 lg:h-125">
              <Image
                src={GiddaaImages?.desktopheroImage}
                alt="Tax filing illustration"
                fill
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlZWUiLz48L3N2Zz4="
                className="hidden md:block z-1 object-cover rounded-4xl"
              />
              <Image
                src={GiddaaImages?.mobileheroImage}
                alt="Tax filing illustration"
                fill
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlZWUiLz48L3N2Zz4="
                className="block md:hidden z-1 object-cover rounded-4xl"
              />
              <Image
                src={GiddaaImages?.desktopRibbon}
                alt="ribbon-illustrations"
                fill
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIi4="
                className="relative -bottom-100 right-20 mt-30"
              />
              <div className="absolute z-10 -top-20 sm:top-6 sm:-left-4  backdrop-blur-[20px] bg-white/20 border-t-[0.1px] border-t-white/60 border-r-[0.1px] border-r-white/60  text-center px-5 py-6 sm:py-12 rounded-[40px] shadow-2xl">
                <p className="text-white text-[16px] capitalize">
                  Tunde’s Estimated Refund
                </p>
                <h1 className="text-white h4 font-bold py-2 pb-4">N450,000</h1>
                <div className="text-black bg-white p-2 rounded-sm flex items-center justify-center">
                  <p className=" text-[16px] capitalize flex items-center gap-2 font-bold">
                    <span>Filed</span>
                    <Check strokeWidth={3.5} size={18} />
                  </p>
                </div>
              </div>
              <div className="absolute z-10 bottom-3 sm:bottom-6 right-2 sm:right-12 text-black bg-[#FFEED0] text-center p-6 rounded-3xl shadow-2xl">
                <h1 className="h4 font-bold">N5,000</h1>
                <p className="text-[#979797] text-[16px] capitalize">
                  Taxes Due Today
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" absolute bottom-2 sm:bottom-10 left-[60%] md:left-[80%] max-w-full text-white">
          <div className="flex items-center gap-3 backdrop-blur-[100px] bg-white/1 rounded-full p-2">
            <Image src={GiddaaImages?.tunde} alt="tunde_image" />
            <p className="text-[14px] font-bold">Chat with Tunde</p>
          </div>
        </div>
      </div>

      <HeroCardComponent />
    </div>
  );
}

export function HeroCardComponent() {
  return (
    <div className="hidden lg:block absolute bottom-0 sm:-bottom-10 right-[25%]">
      {CARDATA.map((cards, index) => (
        <div
          className={`bg-white p-4 w-170.25 rounded-3xl border border-[#2C59C3] shadow-[#2C59C34D] flex items-center gap-4 ${index === 0 ? "relative z-1 top-2 -right-5 shadow-md" : "shadow-md"}`}
          key={index}
        >
          <div className="bg-[#2C59C3] p-4 rounded-xl">
            <Image
              src={GiddaaImages?.heroCards}
              alt="Hero_cards"
              priority
              quality={100}
            />
          </div>
          <div>
            <h1 className="capitalize text-[18px] font-bold text-[#000000]">
              {cards?.q}
            </h1>
            <p className="text-[16px]">{cards?.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
