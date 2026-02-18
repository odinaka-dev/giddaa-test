"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SectionHeading } from "./SetionHeader";
import { CARDSTEPSDATA } from "@/helpers/homepage.helpers";
import ButtonComponent from "./button";

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeServeComponent() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="py-20 sm:pb-72 lg:pb-20 bg-[#FFEED0]">
      <div className="max-w-[90%] sm:max-w-[90%] lg:max-w-250 xl:max-w-300 mx-auto">
        <SectionHeading
          badge="Who we Serve?"
          title="We are Experts for Every Tax Situation"
          className="text-[#001F3F] bg-white"
          description="No matter your tax needs, file with confidence and get the most out of your return ."
        />
        <VerticalScroll />
      </div>
    </div>
  );
}

export function VerticalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = gsap.utils.toArray<HTMLElement>(".card-container");

    cards.forEach((card, index) => {
      const isLast = index === cards.length - 1;

      ScrollTrigger.create({
        trigger: card,
        start: "top top+=100",
        end: isLast ? "bottom bottom" : "bottom top+=100",
        pin: true,
        pinSpacing: false,
        onUpdate: (self) => {
          if (!isLast) {
            const progress = self.progress;
            gsap.to(card, {
              scale: 1 - progress * 0.05,
              y: progress * -20,
              duration: 0.1,
              ease: "none",
            });
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {CARDSTEPSDATA.map((card, index) => (
        <div
          key={index}
          className={`card-container rounded-[50px] py-4 md:py-8 px-4 grid lg:grid-cols-2 gap-12 items-center w-full mb-4`}
          style={{
            color: card?.textColor,
            background: card?.color,
          }}
        >
          <div className=" order-1 lg:order-2">
            <Image
              src={card?.image}
              alt="card_image"
              priority
              quality={100}
              className="w-full"
            />
          </div>

          <div className="w-full p-4 sm:p-6 md:p-4 lg:p-3 xl:p-10 flex flex-col justify-between order-2 lg:order-1">
            <div>
              <p className="text-[30px] font-bold mb-4">{card?.title}</p>
              <h2 className="italic mb-6">{card?.subDescription}</h2>
              <p className="text-[16px] xl:text-[18px] leading-8 mb-4 hidden sm:block">
                {card?.description}
              </p>
              <div>
                <ButtonComponent
                  title1="Speak with an Expert"
                  title2="Assess Your Tax Needs"
                  className1="bg-white text-[#2C59C3] font-bold"
                  className2="border-white bg-none text-white font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
