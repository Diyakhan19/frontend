"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const path = usePathname();
  const arr = ["/login", "/signup"];

  return (
    <div>
      {arr.includes(path) ? (
        <div>{children}</div>
      ) : (
        <div>
          <Header />
          {children}
          <Footer />
        </div>
      )}
    </div>
  );
}
