"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ButtonComponent from "./button";
import { SectionHeading } from "./SetionHeader";
import { STEPSDATA } from "@/helpers/homepage.helpers";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorksComponent() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="py-20 bg-[#F2F2F2]">
      <div className="grid lg:grid-cols-2 gap-24 max-w-[90%] sm:max-w-[90%] lg:max-w-250 xl:max-w-7xl mx-auto">
        <div className="flex items-start">
          <div className="sticky top-20">
            <SectionHeading
              badge="How it works?"
              title=" 3 Easy Steps to Tax Compliance & Savings."
              className="text-[#001F3F] bg-white"
              description="No matter your tax needs, file with confidence and get the
                  most out of your return."
            />
            <div>
              <ButtonComponent
                title1="Speak with an Expert"
                title2="Access Your Tax Needs"
                className1="bg-[#2C59C3] text-white"
                className2="border-[#2C59C3] bg-white text-[#2C59C3]"
              />
            </div>
          </div>
        </div>
        <div>
          <VerticalScroll />
        </div>
      </div>
    </div>
  );
}

export function VerticalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  // More test
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = gsap.utils.toArray<HTMLElement>(".step-card");

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
      {STEPSDATA.map((step, index) => (
        <div
          key={index}
          className={`step-card bg-white rounded-[50px] p-10 mb-4 sm:w-110 ${index >= 2 ? "relative z-100" : "z-0"}`}
          style={{ zIndex: index + 1 }}
        >
          <div className="space-y-6">
            <Image src={step?.image} alt="card_image" priority quality={100} />
            <div>
              <h3 className="text-[20px] sm:text-2xl font-semibold sm:font-bold text-[#001F3F] mb-3">
                {step.title}
              </h3>
              <p className="text-[#4B4B4B] text-[14px] leading-8.5">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
