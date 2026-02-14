"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  badge: string;
  title: string;
  className: string;
  description?: string;
};

export function SectionHeading({
  badge,
  title,
  className,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
    >
      <div>
        <div className="mb-12">
          <p
            className={`${className} text-[14px] sm:text-[16px] font-bold inline py-3 px-5 rounded-full`}
          >
            {badge}
          </p>
        </div>
        <h1 className="text-[#001F3F] font-bold text-[32px] md:text-[40px] capitalize">
          {title}
        </h1>
        <p className="text-[#4B4B4B] text-[16px] sm:text-[16x] md:text-[20px] leading-8 my-3">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
