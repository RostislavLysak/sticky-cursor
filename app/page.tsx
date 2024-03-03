"use client";

import Header from "@/app/components/Header";

import StickyCursor from "@/app/components/StickyCursor/index";
import { useRef } from "react";

export default function Home() {
  const stickyElement = useRef(null);
  return (
    <main className="h-[200vh] bg-white">
      <Header ref={stickyElement} />
      <StickyCursor stickyElement={stickyElement} />
    </main>
  );
}
