"use client";

import { Accordion } from "@skeletonlabs/skeleton-react";
import { SectionHeading } from "./SetionHeader";
import { ChevronDownIcon } from "lucide-react";
import { FAQDATA } from "@/helpers/homepage.helpers";

export default function FaqComponent() {
  return (
    <div className="max-w-[90%] sm:max-w-[90%] lg:max-w-250 xl:max-w-300 mx-auto py-20">
      <SectionHeading
        badge="  FAQs"
        title="Your Questions, Answered."
        className="bg-[#001F3F] text-white"
        description="Find answers to the most common questions people ask."
      />
      <div className="mt-8">
        <Accordion className="rounded-xl">
          {FAQDATA.map((item) => (
            <Accordion.Item
              key={item.id}
              value={item.id}
              className="border border-[#0000001A] rounded-xl py-2 mb-3"
            >
              <h3 className="">
                <Accordion.ItemTrigger className="text-[#0A0A0A] font-bold flex items-center justify-between gap-2 bg-transparent hover:bg-transparent hover:text-black py-4 px-6">
                  {item.title}
                  <Accordion.ItemIndicator className="">
                    <ChevronDownIcon className="h-5 w-5 transition group-data-[state=open]:rotate-180" />
                  </Accordion.ItemIndicator>
                </Accordion.ItemTrigger>
              </h3>
              <Accordion.ItemContent className="text-[#4B4B4B] text-[14px] px-6 pb-4 leading-7">
                {item.description}
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
