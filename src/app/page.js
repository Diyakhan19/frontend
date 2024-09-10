"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
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

  // Notify user of the new message
  socket.on("receiveMessage", () => {
    const path = window.location.pathname;

    if (path !== "/chat") {
      var audio = new Audio("/baz.mp3");
      audio.play();

      toast("New message received", {
        icon: "💬",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  });

  return (
    <div>
      {arr.includes(path) ? (
        <div>{children}</div>
      ) : (
        <div>
          <div className="min-h-[100vh]">
            <Header />
            {children}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
