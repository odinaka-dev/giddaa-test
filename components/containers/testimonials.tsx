"use client";

import { SectionHeading } from "./SetionHeader";
import Image, { StaticImageData } from "next/image";
import { Play, Star } from "lucide-react";
import Marquee from "react-fast-marquee";
import { TESTIMONIALS } from "@/helpers/homepage.helpers";

// testimonial section
export default function TestimonialsSection() {
  return (
    <div className="bg-[#F2F2F2] py-20">
      <div className="max-w-[90%] sm:max-w-[90%] lg:max-w-250 xl:max-w-7xl mx-auto">
        <SectionHeading
          badge="  Why Trust Us?"
          title="Hear From Customer's We Serve."
          className="bg-[#001F3F] text-white"
          description="Use the experience of our past customers to know if we're the right fit for you."
        />
      </div>
      <div className="overflow-hidden">
        <Marquee
          pauseOnHover={true}
          speed={40}
          gradient={false}
          className="py-4"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="mx-3">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

function TestimonialCard({
  type,
  quote,
  name,
  category,
  image,
  rating,
}: {
  type: string;
  quote: string;
  name: string;
  role: string | null;
  category: string;
  image: StaticImageData;
  videoUrl: string | null;
  rating: number | null;
}) {
  const isVideoCard = type === "video";

  if (isVideoCard) {
    return (
      <div className="relative rounded-[40px] overflow-hidden h-125 w-96 group cursor-pointer flex-shrink-0">
        {/* Background image */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover brightness-75"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative h-full flex flex-col justify-between p-8 text-white">
          <div>
            <p className="text-lg italic mb-6">&ldquo;{quote}&rdquo;</p>
            <h3 className="text-xl font-bold">{name}</h3>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-[#001F3F] p-2 px-4 rounded-full text-white">
              {category}
            </span>
            <button className="flex items-center justify-between gap-2 bg-white text-black pl-6 pr-2 py-2.5 rounded-full hover:bg-gray-100 transition">
              Play Video
              <span className="bg-[#001F3F] p-1 rounded-full">
                <Play className="h-4 w-4 fill-current text-white" size={18} />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // testimonial card
  return (
    <div className="bg-white rounded-3xl p-8 flex flex-col items-start text-center shadow-lg h-125 w-96 flex-shrink-0">
      <div className="w-32 h-32 rounded-4xl overflow-hidden mb-4">
        <Image
          src={image}
          alt={name}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      {rating && (
        <div className="flex items-start gap-1 mb-6">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-6 w-6 fill-[#2C59C3] text-[#2C59C3]" />
          ))}
        </div>
      )}
      <p className="text-gray-700 mb-6 text-left italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-auto">
        <h3 className="text-xl text-left font-bold text-gray-900 mb-1 text-[24px]">
          {name}
        </h3>
      </div>
      <button className="mt-6 bg-blue-900 text-white px-6 py-2.5 rounded-full text-sm font-medium">
        {category}
      </button>
    </div>
  );
}
