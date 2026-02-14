import { ReactNode } from "react";
import WebsiteLayout from "@/components/layouts/website-layout";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <div>
      <WebsiteLayout>{children}</WebsiteLayout>
    </div>
  );
}
