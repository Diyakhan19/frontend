"use client";
import { usePathname } from "next/navigation";
import { store } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }) {
  const path = usePathname();
  const noHeader = ["/singup", "/login"];

  return <Provider store={store}>{children}</Provider>;
}
