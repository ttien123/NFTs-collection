"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useScrollTop = () => {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default useScrollTop;
