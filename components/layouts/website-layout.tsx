"use client";

import React from "react";
import { Footer, Header } from "@/exports/exports";

type MainLayoutProps = { children: React.ReactNode };

export default function WebsiteLayout({ children }: MainLayoutProps) {
  return (
    <div className="">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
