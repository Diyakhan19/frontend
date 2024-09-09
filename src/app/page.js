"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { io } from "socket.io-client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const token = getCookie("token");

export const socket = io(BASE_URL, {
  transportOptions: {
    polling: {
      extraHeaders: {
        token,
      },
    },
  },
});

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
