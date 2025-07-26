import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateAddress = (address: string, length: number = 8) => {
  if (!address) return "";
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};
